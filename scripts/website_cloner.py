#!/usr/bin/env python3
"""
Comprehensive Website Cloner
Combines functionality from enhanced_cloner.py and extract_website.py

Features:
- Full HTML/DOM structure extraction
- All CSS (inline, embedded, external, cross-origin)
- JavaScript files
- Fonts (files + @font-face rules)
- Images and videos (including blob URLs)
- Network request capture
- Animations and keyframes
- Color palette and CSS variables
- Typography system
- Layout information
- Component tree extraction
- Tailwind config generation
- Responsive screenshots
"""

import asyncio
import base64
import json
import os
import re
import hashlib
from pathlib import Path
from urllib.parse import urljoin, urlparse
from datetime import datetime

from playwright.async_api import async_playwright, Page, BrowserContext


class WebsiteCloner:
    def __init__(self, url: str, output_dir: str = "cloned_site"):
        self.url = url
        self.output_dir = Path(output_dir)
        self.data_dir = self.output_dir / "data"
        self.assets_dir = self.output_dir / "assets"
        self.fonts_dir = self.assets_dir / "fonts"
        self.images_dir = self.assets_dir / "images"
        self.videos_dir = self.assets_dir / "videos"
        self.css_dir = self.assets_dir / "css"
        self.js_dir = self.assets_dir / "js"
        self.rive_dir = self.assets_dir / "rive"

        # Collected data
        self.network_requests = []
        self.fonts = {}
        self.stylesheets = []
        self.scripts = []
        self.images = []
        self.videos = []
        self.video_sources = []
        self.rive_animations = []
        self.animations = []
        self.colors = set()
        self.typography = {}
        self.html = ""
        self.computed_styles = {}

        # Theme data
        self.themes = {
            'light': {'design_system': None, 'screenshots': []},
            'dark': {'design_system': None, 'screenshots': []}
        }
        self.detected_theme_toggle = None

    def setup_directories(self):
        """Create output directory structure"""
        dirs = [
            self.output_dir,
            self.data_dir,
            self.assets_dir,
            self.fonts_dir,
            self.images_dir,
            self.videos_dir,
            self.css_dir,
            self.js_dir,
            self.rive_dir
        ]
        for dir_path in dirs:
            dir_path.mkdir(parents=True, exist_ok=True)

    async def capture_network(self, response):
        """Capture all network responses and save assets"""
        try:
            url = response.url
            content_type = response.headers.get('content-type', '')
            status = response.status

            request_info = {
                'url': url,
                'status': status,
                'content_type': content_type,
                'headers': dict(response.headers),
            }

            if status == 200:
                try:
                    body = await response.body()

                    # Font files
                    if any(ext in url.lower() for ext in ['.woff2', '.woff', '.ttf', '.otf', '.eot']) or \
                       'font' in content_type.lower():
                        filename = self.get_safe_filename(url, 'fonts')
                        filepath = self.fonts_dir / filename
                        filepath.write_bytes(body)
                        self.fonts[url] = {
                            'local_path': str(filepath),
                            'filename': filename,
                            'size': len(body),
                            'content_type': content_type
                        }
                        request_info['saved_to'] = str(filepath)
                        print(f"  [FONT] {filename}")

                    # CSS files
                    elif url.endswith('.css') or 'text/css' in content_type:
                        filename = self.get_safe_filename(url, 'css')
                        filepath = self.css_dir / filename
                        filepath.write_bytes(body)
                        self.stylesheets.append({
                            'url': url,
                            'local_path': str(filepath),
                            'content': body.decode('utf-8', errors='ignore')
                        })
                        request_info['saved_to'] = str(filepath)
                        print(f"  [CSS] {filename}")

                    # JavaScript files
                    elif url.endswith('.js') or 'javascript' in content_type:
                        filename = self.get_safe_filename(url, 'js')
                        filepath = self.js_dir / filename
                        filepath.write_bytes(body)
                        self.scripts.append({
                            'url': url,
                            'local_path': str(filepath),
                        })
                        request_info['saved_to'] = str(filepath)

                    # Images
                    elif any(ext in url.lower() for ext in ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico']) or \
                         'image' in content_type:
                        filename = self.get_safe_filename(url, 'images')
                        filepath = self.images_dir / filename
                        filepath.write_bytes(body)
                        self.images.append({
                            'url': url,
                            'local_path': str(filepath),
                            'size': len(body),
                            'content_type': content_type
                        })
                        request_info['saved_to'] = str(filepath)
                        print(f"  [IMG] {filename}")

                    # Videos
                    elif any(ext in url.lower() for ext in ['.mp4', '.webm', '.mov', '.avi', '.m3u8', '.mpd']) or \
                         any(vtype in content_type for vtype in ['video', 'audio']):
                        filename = self.get_safe_filename(url, 'videos')
                        filepath = self.videos_dir / filename
                        filepath.write_bytes(body)
                        self.videos.append({
                            'url': url,
                            'local_path': str(filepath),
                            'size': len(body),
                            'content_type': content_type
                        })
                        self.video_sources.append({
                            'url': url,
                            'saved_as': filename,
                            'content_type': content_type
                        })
                        request_info['saved_to'] = str(filepath)
                        print(f"  [VIDEO] {filename}")

                    # Rive animation files
                    elif '.riv' in url.lower() or 'application/octet-stream' in content_type and len(body) > 1000:
                        # Check if it looks like a Rive file (starts with RIVE magic bytes or has .riv extension)
                        is_rive = '.riv' in url.lower()
                        if not is_rive and len(body) >= 4:
                            # Rive files often start with "RIVE" magic bytes
                            is_rive = body[:4] == b'RIVE'

                        if is_rive:
                            filename = self.get_safe_filename(url, 'rive')
                            if not filename.endswith('.riv'):
                                filename = filename + '.riv'
                            filepath = self.rive_dir / filename
                            filepath.write_bytes(body)
                            self.rive_animations.append({
                                'url': url,
                                'local_path': str(filepath),
                                'filename': filename,
                                'size': len(body),
                                'content_type': content_type
                            })
                            request_info['saved_to'] = str(filepath)
                            print(f"  [RIVE] {filename} ({len(body)} bytes)")

                except Exception as e:
                    request_info['body_error'] = str(e)

            self.network_requests.append(request_info)

        except Exception as e:
            pass

    def get_safe_filename(self, url: str, category: str) -> str:
        """Generate a safe filename from URL"""
        parsed = urlparse(url)
        path = parsed.path

        original_name = os.path.basename(path) or 'index'
        original_name = re.sub(r'[^\w\-_\.]', '_', original_name)

        url_hash = hashlib.md5(url.encode()).hexdigest()[:8]

        if '.' not in original_name:
            ext_map = {
                'fonts': '.woff2',
                'css': '.css',
                'js': '.js',
                'images': '.png',
                'videos': '.mp4'
            }
            original_name += ext_map.get(category, '')

        name, ext = os.path.splitext(original_name)
        return f"{name}_{url_hash}{ext}"

    async def deep_scroll(self, page: Page):
        """Scroll through page multiple times to ensure all lazy content loads"""
        print("[*] Triggering lazy-loaded content...")
        for i in range(3):
            await page.evaluate("""
                async () => {
                    const delay = ms => new Promise(r => setTimeout(r, ms));
                    for (let i = 0; i < document.body.scrollHeight; i += 300) {
                        window.scrollTo(0, i);
                        await delay(150);
                    }
                    window.scrollTo(0, 0);
                }
            """)
            await page.wait_for_timeout(1000)

    async def capture_blob_videos(self, page: Page):
        """Capture blob URL video information"""
        print("[*] Capturing video element data...")
        blob_info = await page.evaluate("""
            () => {
                const videos = [];
                document.querySelectorAll('video').forEach((video, i) => {
                    const info = {
                        index: i,
                        src: video.src,
                        currentSrc: video.currentSrc,
                        poster: video.poster,
                        autoplay: video.autoplay,
                        loop: video.loop,
                        muted: video.muted,
                        playsInline: video.playsInline,
                        preload: video.preload,
                        width: video.videoWidth || video.clientWidth,
                        height: video.videoHeight || video.clientHeight,
                        duration: video.duration,
                        sources: [],
                        isBlob: video.src?.startsWith('blob:'),
                        parentClasses: video.parentElement?.className,
                        styles: {
                            position: getComputedStyle(video).position,
                            objectFit: getComputedStyle(video).objectFit,
                            zIndex: getComputedStyle(video).zIndex,
                            opacity: getComputedStyle(video).opacity,
                        }
                    };

                    video.querySelectorAll('source').forEach(s => {
                        info.sources.push({ src: s.src, type: s.type });
                    });

                    videos.push(info);
                });
                return videos;
            }
        """)

        with open(self.data_dir / "video_elements.json", 'w') as f:
            json.dump(blob_info, f, indent=2)

        for video in blob_info:
            if video.get('isBlob'):
                print(f"  [!] Video {video['index']} uses blob URL - see video_elements.json")

        return blob_info

    async def extract_page_data(self, page: Page):
        """Extract comprehensive page data using JavaScript"""

        data = await page.evaluate("""
            () => {
                const result = {
                    html: document.documentElement.outerHTML,
                    title: document.title,
                    meta: {},
                    colors: [],
                    fonts: [],
                    typography: [],
                    animations: [],
                    elements: [],
                    cssVariables: {},
                    mediaQueries: [],
                    keyframes: [],
                    inlineStyles: [],
                    computedStyles: {}
                };

                // Extract meta tags
                document.querySelectorAll('meta').forEach(meta => {
                    const name = meta.getAttribute('name') || meta.getAttribute('property');
                    if (name) {
                        result.meta[name] = meta.getAttribute('content');
                    }
                });

                // Extract CSS variables from :root
                const rootStyles = getComputedStyle(document.documentElement);
                const cssVars = {};
                for (let i = 0; i < rootStyles.length; i++) {
                    const prop = rootStyles[i];
                    if (prop.startsWith('--')) {
                        cssVars[prop] = rootStyles.getPropertyValue(prop).trim();
                    }
                }
                result.cssVariables = cssVars;

                // Collect all unique colors and fonts
                const colors = new Set();
                const fonts = new Set();
                const typography = [];

                document.querySelectorAll('*').forEach(el => {
                    const style = getComputedStyle(el);

                    // Colors
                    colors.add(style.color);
                    colors.add(style.backgroundColor);
                    colors.add(style.borderColor);
                    colors.add(style.outlineColor);

                    // Fonts
                    fonts.add(style.fontFamily);

                    // Typography details for text elements
                    if (['H1','H2','H3','H4','H5','H6','P','SPAN','A','LI','BUTTON'].includes(el.tagName)) {
                        typography.push({
                            tag: el.tagName,
                            className: el.className,
                            fontFamily: style.fontFamily,
                            fontSize: style.fontSize,
                            fontWeight: style.fontWeight,
                            lineHeight: style.lineHeight,
                            letterSpacing: style.letterSpacing,
                            textTransform: style.textTransform,
                            color: style.color,
                            text: el.innerText?.substring(0, 50)
                        });
                    }
                });

                result.colors = [...colors].filter(c => c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent');
                result.fonts = [...fonts].filter(f => f);
                result.typography = typography.slice(0, 100);

                // Extract keyframes and animations from stylesheets
                const keyframes = [];
                const mediaQueries = [];

                try {
                    for (const sheet of document.styleSheets) {
                        try {
                            const rules = sheet.cssRules || sheet.rules;
                            for (const rule of rules) {
                                if (rule instanceof CSSKeyframesRule) {
                                    let keyframeCSS = `@keyframes ${rule.name} {\\n`;
                                    for (const keyframe of rule.cssRules) {
                                        keyframeCSS += `  ${keyframe.keyText} { ${keyframe.style.cssText} }\\n`;
                                    }
                                    keyframeCSS += '}';
                                    keyframes.push({
                                        name: rule.name,
                                        css: keyframeCSS
                                    });
                                }
                                if (rule instanceof CSSMediaRule) {
                                    mediaQueries.push({
                                        condition: rule.conditionText,
                                        css: rule.cssText
                                    });
                                }
                            }
                        } catch (e) {}
                    }
                } catch (e) {}

                result.keyframes = keyframes;
                result.mediaQueries = mediaQueries.slice(0, 50);

                // Extract elements with animations
                const animatedElements = [];
                document.querySelectorAll('*').forEach(el => {
                    const style = getComputedStyle(el);
                    if (style.animation && style.animation !== 'none') {
                        animatedElements.push({
                            tag: el.tagName,
                            className: el.className,
                            id: el.id,
                            animation: style.animation,
                            animationName: style.animationName,
                            animationDuration: style.animationDuration,
                            animationTimingFunction: style.animationTimingFunction,
                            animationDelay: style.animationDelay,
                            animationIterationCount: style.animationIterationCount,
                            animationDirection: style.animationDirection,
                            animationFillMode: style.animationFillMode
                        });
                    }
                    if (style.transition && style.transition !== 'none' && style.transition !== 'all 0s ease 0s') {
                        animatedElements.push({
                            tag: el.tagName,
                            className: el.className,
                            id: el.id,
                            transition: style.transition,
                            transitionProperty: style.transitionProperty,
                            transitionDuration: style.transitionDuration,
                            transitionTimingFunction: style.transitionTimingFunction
                        });
                    }
                });
                result.animations = animatedElements;

                // Extract inline styles
                document.querySelectorAll('[style]').forEach(el => {
                    result.inlineStyles.push({
                        tag: el.tagName,
                        className: el.className,
                        id: el.id,
                        style: el.getAttribute('style')
                    });
                });

                // Extract key element computed styles for layout reconstruction
                const keySelectors = [
                    'body', 'header', 'nav', 'main', 'footer', 'section', 'article',
                    '.hero', '.container', '.wrapper', '[class*="grid"]', '[class*="flex"]'
                ];

                keySelectors.forEach(selector => {
                    try {
                        const els = document.querySelectorAll(selector);
                        els.forEach((el, i) => {
                            const style = getComputedStyle(el);
                            const key = `${selector}_${i}`;
                            result.computedStyles[key] = {
                                selector: selector,
                                tag: el.tagName,
                                className: el.className,
                                display: style.display,
                                position: style.position,
                                width: style.width,
                                maxWidth: style.maxWidth,
                                height: style.height,
                                padding: style.padding,
                                margin: style.margin,
                                gap: style.gap,
                                gridTemplateColumns: style.gridTemplateColumns,
                                gridTemplateRows: style.gridTemplateRows,
                                flexDirection: style.flexDirection,
                                justifyContent: style.justifyContent,
                                alignItems: style.alignItems,
                                backgroundColor: style.backgroundColor,
                                backgroundImage: style.backgroundImage,
                                borderRadius: style.borderRadius,
                                boxShadow: style.boxShadow,
                                overflow: style.overflow,
                                zIndex: style.zIndex
                            };
                        });
                    } catch (e) {}
                });

                // Extract all video sources
                const videoSources = [];
                document.querySelectorAll('video').forEach(video => {
                    videoSources.push({
                        src: video.src,
                        poster: video.poster,
                        autoplay: video.autoplay,
                        loop: video.loop,
                        muted: video.muted,
                        sources: [...video.querySelectorAll('source')].map(s => ({
                            src: s.src,
                            type: s.type
                        }))
                    });
                });
                result.videos = videoSources;

                // Extract background images
                const backgroundImages = [];
                document.querySelectorAll('*').forEach(el => {
                    const style = getComputedStyle(el);
                    if (style.backgroundImage && style.backgroundImage !== 'none') {
                        backgroundImages.push({
                            tag: el.tagName,
                            className: el.className,
                            backgroundImage: style.backgroundImage,
                            backgroundSize: style.backgroundSize,
                            backgroundPosition: style.backgroundPosition,
                            backgroundRepeat: style.backgroundRepeat
                        });
                    }
                });
                result.backgroundImages = backgroundImages;

                // Extract all linked resources
                const links = [];
                document.querySelectorAll('link').forEach(link => {
                    links.push({
                        rel: link.rel,
                        href: link.href,
                        type: link.type,
                        as: link.as
                    });
                });
                result.links = links;

                // Extract @font-face rules
                const fontFaces = [];
                try {
                    for (const sheet of document.styleSheets) {
                        try {
                            const rules = sheet.cssRules || sheet.rules;
                            for (const rule of rules) {
                                if (rule instanceof CSSFontFaceRule) {
                                    fontFaces.push({
                                        css: rule.cssText,
                                        fontFamily: rule.style.fontFamily,
                                        src: rule.style.src,
                                        fontWeight: rule.style.fontWeight,
                                        fontStyle: rule.style.fontStyle,
                                        fontDisplay: rule.style.fontDisplay
                                    });
                                }
                            }
                        } catch (e) {}
                    }
                } catch (e) {}
                result.fontFaces = fontFaces;

                return result;
            }
        """)

        return data

    async def extract_all_stylesheets(self, page: Page):
        """Extract all CSS including cross-origin sheets"""

        css_content = await page.evaluate("""
            async () => {
                const sheets = [];

                for (const sheet of document.styleSheets) {
                    const sheetInfo = {
                        href: sheet.href,
                        rules: []
                    };

                    try {
                        const rules = sheet.cssRules || sheet.rules;
                        for (const rule of rules) {
                            sheetInfo.rules.push(rule.cssText);
                        }
                    } catch (e) {
                        if (sheet.href) {
                            try {
                                const response = await fetch(sheet.href);
                                const text = await response.text();
                                sheetInfo.rules.push(text);
                                sheetInfo.fetched = true;
                            } catch (fetchError) {
                                sheetInfo.error = fetchError.message;
                            }
                        }
                    }

                    sheets.push(sheetInfo);
                }

                document.querySelectorAll('style').forEach((style, i) => {
                    sheets.push({
                        href: null,
                        isInline: true,
                        index: i,
                        rules: [style.textContent]
                    });
                });

                return sheets;
            }
        """)

        return css_content

    async def extract_component_structure(self, page: Page):
        """Extract semantic component structure"""
        return await page.evaluate("""
            () => {
                const extractComponent = (el, depth = 0) => {
                    if (depth > 5) return null;

                    const style = getComputedStyle(el);
                    const rect = el.getBoundingClientRect();

                    const component = {
                        tag: el.tagName.toLowerCase(),
                        id: el.id || null,
                        classes: el.className.toString().split(' ').filter(Boolean),
                        role: el.getAttribute('role'),
                        text: el.childNodes[0]?.nodeType === 3
                            ? el.childNodes[0].textContent.trim().slice(0, 50)
                            : null,
                        dimensions: {
                            width: Math.round(rect.width),
                            height: Math.round(rect.height),
                        },
                        layout: {
                            display: style.display,
                            position: style.position,
                            flexDirection: style.flexDirection,
                            justifyContent: style.justifyContent,
                            alignItems: style.alignItems,
                            gap: style.gap,
                        },
                        children: []
                    };

                    const importantTags = ['header', 'nav', 'main', 'section', 'article', 'aside', 'footer', 'div', 'button', 'a', 'video', 'img'];

                    Array.from(el.children).forEach(child => {
                        if (importantTags.includes(child.tagName.toLowerCase()) ||
                            child.className.toString().length > 0) {
                            const childComponent = extractComponent(child, depth + 1);
                            if (childComponent) {
                                component.children.push(childComponent);
                            }
                        }
                    });

                    return component;
                };

                return extractComponent(document.body);
            }
        """)

    async def take_screenshots(self, page: Page):
        """Take screenshots at multiple breakpoints"""
        breakpoints = [
            {'name': 'full', 'width': 1920, 'height': 1080},
            {'name': 'desktop', 'width': 1440, 'height': 900},
            {'name': 'tablet', 'width': 768, 'height': 1024},
            {'name': 'mobile', 'width': 390, 'height': 844},
        ]

        print("[*] Taking screenshots...")
        for bp in breakpoints:
            await page.set_viewport_size({'width': bp['width'], 'height': bp['height']})
            await page.wait_for_timeout(500)
            await page.screenshot(
                path=str(self.output_dir / f"screenshot_{bp['name']}.png"),
                full_page=True
            )
            print(f"  [SCREENSHOT] {bp['name']}: {bp['width']}x{bp['height']}")

        # Reset to desktop
        await page.set_viewport_size({'width': 1920, 'height': 1080})

    def extract_color_palette(self, colors: list) -> dict:
        """Organize colors into a structured palette"""

        palette = {
            "all": [],
            "hex": [],
            "rgb": [],
            "rgba": [],
            "hsl": []
        }

        for color in colors:
            if not color:
                continue

            palette["all"].append(color)

            if color.startswith('#'):
                palette["hex"].append(color)
            elif color.startswith('rgb('):
                palette["rgb"].append(color)
            elif color.startswith('rgba('):
                palette["rgba"].append(color)
            elif color.startswith('hsl'):
                palette["hsl"].append(color)

        for key in palette:
            palette[key] = list(set(palette[key]))

        return palette

    def dedupe_typography(self, typography: list) -> list:
        """Remove duplicate typography entries"""

        seen = set()
        unique = []

        for t in typography:
            key = (t['tag'], t['fontFamily'], t['fontSize'], t['fontWeight'])
            if key not in seen:
                seen.add(key)
                unique.append(t)

        return unique

    def combine_css(self, css_data: list) -> str:
        """Combine all CSS into a single file"""

        combined = "/* Combined CSS extracted from website */\n\n"

        for i, sheet in enumerate(css_data):
            if sheet.get('href'):
                combined += f"\n/* === External: {sheet['href']} === */\n"
            else:
                combined += f"\n/* === Inline Style #{sheet.get('index', i)} === */\n"

            for rule in sheet.get('rules', []):
                combined += rule + "\n"

        return combined

    async def detect_current_theme(self, page: Page) -> str:
        """Detect if the page is currently in light or dark mode"""
        theme_info = await page.evaluate("""
            () => {
                // Check various theme indicators
                const html = document.documentElement;
                const body = document.body;

                // Check data attributes
                const dataTheme = html.getAttribute('data-theme') ||
                                  body.getAttribute('data-theme') ||
                                  html.getAttribute('data-mode') ||
                                  body.getAttribute('data-mode');
                if (dataTheme) {
                    return dataTheme.toLowerCase().includes('dark') ? 'dark' : 'light';
                }

                // Check class names
                const classes = (html.className + ' ' + body.className).toLowerCase();
                if (classes.includes('dark')) return 'dark';
                if (classes.includes('light')) return 'light';

                // Check color-scheme
                const colorScheme = getComputedStyle(html).colorScheme;
                if (colorScheme === 'dark') return 'dark';
                if (colorScheme === 'light') return 'light';

                // Check background color brightness
                const bgColor = getComputedStyle(body).backgroundColor;
                const match = bgColor.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
                if (match) {
                    const brightness = (parseInt(match[1]) * 299 + parseInt(match[2]) * 587 + parseInt(match[3]) * 114) / 1000;
                    return brightness < 128 ? 'dark' : 'light';
                }

                return 'light'; // Default assumption
            }
        """)
        return theme_info

    async def find_theme_toggle(self, page: Page) -> dict:
        """Find theme toggle button on the page"""
        toggle_info = await page.evaluate("""
            () => {
                const selectors = [
                    // Common theme toggle selectors
                    '[aria-label*="theme" i]',
                    '[aria-label*="dark" i]',
                    '[aria-label*="light" i]',
                    '[aria-label*="mode" i]',
                    '[data-testid*="theme" i]',
                    '[data-testid*="dark" i]',
                    '[class*="theme-toggle" i]',
                    '[class*="dark-mode" i]',
                    '[class*="light-mode" i]',
                    '[class*="color-scheme" i]',
                    '[id*="theme" i]',
                    '[id*="dark-mode" i]',
                    // Icon-based toggles
                    'button:has(svg[class*="sun" i])',
                    'button:has(svg[class*="moon" i])',
                    'button:has([class*="sun" i])',
                    'button:has([class*="moon" i])',
                    // Text-based toggles
                    'button:has-text("Dark")',
                    'button:has-text("Light")',
                    'button:has-text("Theme")',
                    // Generic icon buttons that might be theme toggles
                    '[class*="IconButton"][class*="theme" i]',
                ];

                for (const selector of selectors) {
                    try {
                        const el = document.querySelector(selector);
                        if (el && el.offsetParent !== null) { // Check if visible
                            const rect = el.getBoundingClientRect();
                            return {
                                found: true,
                                selector: selector,
                                tag: el.tagName,
                                text: el.innerText?.substring(0, 50),
                                ariaLabel: el.getAttribute('aria-label'),
                                className: el.className,
                                rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
                            };
                        }
                    } catch (e) {}
                }

                // Try finding by SVG icons (sun/moon patterns)
                const svgs = document.querySelectorAll('svg');
                for (const svg of svgs) {
                    const parent = svg.closest('button, a, [role="button"], [onclick]');
                    if (parent && parent.offsetParent !== null) {
                        const svgContent = svg.outerHTML.toLowerCase();
                        if (svgContent.includes('moon') || svgContent.includes('sun') ||
                            svgContent.includes('m12') || // Common path for sun/moon icons
                            (svgContent.includes('circle') && svgContent.includes('path'))) {
                            const rect = parent.getBoundingClientRect();
                            // Check if it's a small button (likely icon button)
                            if (rect.width < 100 && rect.height < 100) {
                                return {
                                    found: true,
                                    selector: 'svg-icon-button',
                                    tag: parent.tagName,
                                    text: parent.innerText?.substring(0, 50),
                                    ariaLabel: parent.getAttribute('aria-label'),
                                    className: parent.className,
                                    rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
                                };
                            }
                        }
                    }
                }

                return { found: false };
            }
        """)
        return toggle_info

    async def click_theme_toggle(self, page: Page, toggle_info: dict) -> bool:
        """Click the theme toggle button by scrolling to it first"""
        if not toggle_info.get('found'):
            return False

        try:
            selector = toggle_info.get('selector', '')

            # Try to find and click the element using Playwright's built-in methods
            # which handle scrolling automatically
            element = None

            # Try the detected selector first
            if selector and selector != 'svg-icon-button':
                try:
                    element = await page.query_selector(selector)
                except:
                    pass

            # If not found, try common theme toggle selectors
            if not element:
                fallback_selectors = [
                    '[aria-label*="theme" i]',
                    '[aria-label*="dark" i]',
                    '[aria-label*="light" i]',
                    'button[class*="theme"]',
                    '[data-testid*="theme"]',
                ]
                for sel in fallback_selectors:
                    try:
                        element = await page.query_selector(sel)
                        if element:
                            break
                    except:
                        continue

            if element:
                # Scroll element into view
                await element.scroll_into_view_if_needed()
                await page.wait_for_timeout(300)

                # Click the element
                await element.click()
                await page.wait_for_timeout(1000)  # Wait for theme transition
                print(f"  [TOGGLE] Clicked theme toggle successfully")
                return True
            else:
                # Fallback to coordinate-based click with scroll
                rect = toggle_info.get('rect', {})
                y_pos = rect.get('y', 0)

                # Scroll to the element's position
                await page.evaluate(f"window.scrollTo(0, {y_pos - 100})")
                await page.wait_for_timeout(300)

                # Recalculate position after scroll
                x = rect.get('x', 0) + rect.get('width', 0) / 2
                # After scrolling, the element should be near the top
                y = 100 + rect.get('height', 0) / 2

                await page.mouse.click(x, y)
                await page.wait_for_timeout(1000)
                return True

        except Exception as e:
            print(f"  [!] Failed to click theme toggle: {e}")
            return False

    async def toggle_theme_via_js(self, page: Page) -> bool:
        """Try to toggle theme via JavaScript manipulation"""
        toggled = await page.evaluate("""
            () => {
                const html = document.documentElement;
                const body = document.body;

                // Try toggling data-theme
                const currentTheme = html.getAttribute('data-theme') || body.getAttribute('data-theme');
                if (currentTheme) {
                    const newTheme = currentTheme.toLowerCase().includes('dark') ? 'light' : 'dark';
                    if (html.hasAttribute('data-theme')) html.setAttribute('data-theme', newTheme);
                    if (body.hasAttribute('data-theme')) body.setAttribute('data-theme', newTheme);
                    return true;
                }

                // Try toggling class
                if (html.classList.contains('dark')) {
                    html.classList.remove('dark');
                    html.classList.add('light');
                    return true;
                } else if (html.classList.contains('light')) {
                    html.classList.remove('light');
                    html.classList.add('dark');
                    return true;
                }

                // Try adding dark class (common Tailwind pattern)
                if (!html.classList.contains('dark')) {
                    html.classList.add('dark');
                    return true;
                }

                return false;
            }
        """)
        if toggled:
            await page.wait_for_timeout(500)
        return toggled

    async def capture_theme(self, page: Page, theme_name: str):
        """Capture screenshots and design system for current theme"""
        print(f"[*] Capturing {theme_name} theme...")

        # Create theme directory
        theme_dir = self.output_dir / f"themes/{theme_name}"
        theme_dir.mkdir(parents=True, exist_ok=True)

        # Take screenshots at multiple breakpoints
        breakpoints = [
            {'name': 'full', 'width': 1920, 'height': 1080},
            {'name': 'desktop', 'width': 1440, 'height': 900},
            {'name': 'tablet', 'width': 768, 'height': 1024},
            {'name': 'mobile', 'width': 390, 'height': 844},
        ]

        for bp in breakpoints:
            await page.set_viewport_size({'width': bp['width'], 'height': bp['height']})
            await page.wait_for_timeout(300)
            screenshot_path = theme_dir / f"screenshot_{bp['name']}.png"
            await page.screenshot(path=str(screenshot_path), full_page=True)
            self.themes[theme_name]['screenshots'].append(str(screenshot_path))
            print(f"  [SCREENSHOT] {theme_name}/{bp['name']}: {bp['width']}x{bp['height']}")

        # Reset viewport
        await page.set_viewport_size({'width': 1920, 'height': 1080})

        # Extract design system for this theme
        design_data = await self.extract_theme_design_system(page)
        self.themes[theme_name]['design_system'] = design_data

        # Save theme-specific design tokens
        with open(theme_dir / "design_tokens.json", 'w') as f:
            json.dump(design_data, f, indent=2)

        return design_data

    async def capture_animations(self, page: Page, duration_seconds: int = 25):
        """Capture long-running animations with video and interval screenshots"""
        print(f"[*] Capturing animations over {duration_seconds} seconds...")

        animations_dir = self.output_dir / "animations"
        animations_dir.mkdir(parents=True, exist_ok=True)

        # Detect animation durations on the page
        animation_info = await page.evaluate("""
            () => {
                const animations = [];
                let maxDuration = 0;

                document.querySelectorAll('*').forEach(el => {
                    const style = getComputedStyle(el);

                    // Check CSS animations
                    if (style.animationName && style.animationName !== 'none') {
                        const duration = parseFloat(style.animationDuration) || 0;
                        const delay = parseFloat(style.animationDelay) || 0;
                        const iterations = style.animationIterationCount === 'infinite' ? 1 : parseFloat(style.animationIterationCount) || 1;
                        const totalDuration = (duration + delay) * iterations;

                        if (duration > 0) {
                            animations.push({
                                element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
                                name: style.animationName,
                                duration: duration,
                                delay: delay,
                                iterations: style.animationIterationCount,
                                totalDuration: totalDuration
                            });
                            maxDuration = Math.max(maxDuration, totalDuration);
                        }
                    }

                    // Check CSS transitions
                    if (style.transitionDuration && style.transitionDuration !== '0s') {
                        const duration = parseFloat(style.transitionDuration) || 0;
                        if (duration > 0.5) { // Only track significant transitions
                            animations.push({
                                element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
                                type: 'transition',
                                duration: duration,
                                property: style.transitionProperty
                            });
                        }
                    }
                });

                return {
                    animations: animations,
                    maxDuration: maxDuration,
                    suggestedCaptureDuration: Math.min(Math.max(maxDuration, 5), 30) // Between 5-30 seconds
                };
            }
        """)

        # Use detected duration or provided duration
        capture_duration = max(animation_info.get('suggestedCaptureDuration', 10), duration_seconds)
        print(f"  [ANIM] Detected max animation duration: {animation_info.get('maxDuration', 0):.1f}s")
        print(f"  [ANIM] Capturing for: {capture_duration}s")

        # Take screenshots at regular intervals (every 2 seconds)
        interval = 2
        screenshot_count = int(capture_duration / interval) + 1

        print(f"  [ANIM] Taking {screenshot_count} interval screenshots...")
        for i in range(screenshot_count):
            timestamp = i * interval
            screenshot_path = animations_dir / f"frame_{timestamp:03d}s.png"
            await page.screenshot(path=str(screenshot_path), full_page=False)  # Viewport only for speed
            print(f"    [FRAME] {timestamp}s")
            if i < screenshot_count - 1:
                await page.wait_for_timeout(interval * 1000)

        # Save animation metadata
        animation_info['screenshots'] = [f"frame_{i*interval:03d}s.png" for i in range(screenshot_count)]
        animation_info['capture_duration'] = capture_duration
        animation_info['interval'] = interval

        with open(animations_dir / "animation_capture.json", 'w') as f:
            json.dump(animation_info, f, indent=2)

        print(f"  [ANIM] Captured {screenshot_count} frames over {capture_duration}s")
        return animation_info

    async def record_hero_video(self, page: Page, duration_seconds: int = 25):
        """Record a video of the hero section animation"""
        print(f"[*] Recording hero section for {duration_seconds}s...")

        videos_dir = self.output_dir / "animations"
        videos_dir.mkdir(parents=True, exist_ok=True)

        # Scroll to top to ensure hero is visible
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(500)

        # Try to find hero section
        hero_element = await page.query_selector('section:first-of-type, .hero, [class*="hero"], header + section, main > section:first-child, main > div:first-child')

        if hero_element:
            # Get hero bounding box
            box = await hero_element.bounding_box()
            if box:
                print(f"  [HERO] Found hero section: {box['width']}x{box['height']}")

        # Record using CDP (Chrome DevTools Protocol) for better control
        try:
            client = await page.context.new_cdp_session(page)
            await client.send('Page.startScreencast', {
                'format': 'png',
                'quality': 80,
                'maxWidth': 1920,
                'maxHeight': 1080,
                'everyNthFrame': 2  # Capture every 2nd frame
            })

            frames = []
            start_time = asyncio.get_event_loop().time()

            def handle_frame(params):
                frames.append(params)

            client.on('Page.screencastFrame', handle_frame)

            # Wait for the animation duration
            await page.wait_for_timeout(duration_seconds * 1000)

            await client.send('Page.stopScreencast')

            # Save frames
            print(f"  [VIDEO] Captured {len(frames)} frames")
            for i, frame in enumerate(frames[:50]):  # Limit to 50 frames
                frame_data = base64.b64decode(frame['data'])
                frame_path = videos_dir / f"hero_frame_{i:04d}.png"
                with open(frame_path, 'wb') as f:
                    f.write(frame_data)

            return len(frames)

        except Exception as e:
            print(f"  [!] CDP recording failed: {e}")
            # Fallback to interval screenshots
            return await self.capture_animations(page, duration_seconds)

    async def extract_theme_design_system(self, page: Page) -> dict:
        """Extract design system colors and styles for current theme"""
        return await page.evaluate("""
            () => {
                const rgbToHex = (rgb) => {
                    if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return null;
                    const match = rgb.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
                    if (!match) return rgb;
                    return '#' + [match[1], match[2], match[3]]
                        .map(x => parseInt(x).toString(16).padStart(2, '0'))
                        .join('');
                };

                const result = {
                    colors: { backgrounds: [], texts: [], borders: [], all: [] },
                    cssVariables: {},
                    gradients: [],
                    shadows: []
                };

                // Get CSS variables from :root
                const rootStyles = getComputedStyle(document.documentElement);
                for (let i = 0; i < rootStyles.length; i++) {
                    const prop = rootStyles[i];
                    if (prop.startsWith('--')) {
                        result.cssVariables[prop] = rootStyles.getPropertyValue(prop).trim();
                    }
                }

                const seenColors = new Set();

                document.querySelectorAll('*').forEach(el => {
                    const style = getComputedStyle(el);

                    // Background colors
                    const bg = rgbToHex(style.backgroundColor);
                    if (bg && !seenColors.has(bg)) {
                        seenColors.add(bg);
                        result.colors.backgrounds.push(bg);
                        result.colors.all.push(bg);
                    }

                    // Text colors
                    const text = rgbToHex(style.color);
                    if (text && !seenColors.has(text)) {
                        seenColors.add(text);
                        result.colors.texts.push(text);
                        result.colors.all.push(text);
                    }

                    // Border colors
                    const border = rgbToHex(style.borderColor);
                    if (border && !seenColors.has(border)) {
                        seenColors.add(border);
                        result.colors.borders.push(border);
                        result.colors.all.push(border);
                    }

                    // Gradients
                    if (style.backgroundImage.includes('gradient')) {
                        result.gradients.push(style.backgroundImage);
                    }

                    // Shadows
                    if (style.boxShadow !== 'none') {
                        result.shadows.push(style.boxShadow);
                    }
                });

                // Dedupe
                result.gradients = [...new Set(result.gradients)].slice(0, 10);
                result.shadows = [...new Set(result.shadows)].slice(0, 10);

                return result;
            }
        """)

    def generate_tailwind_config(self, design_system: dict):
        """Generate Tailwind config from design tokens"""
        colors = design_system.get('colors', {})
        colors_bg = colors.get('backgrounds', []) or colors.get('rgb', [])[:10]
        colors_text = colors.get('texts', []) or colors.get('hex', [])[:10]
        fonts = design_system.get('fonts', [])[:5]
        # Extract font sizes from typography list
        typography = design_system.get('typography', [])
        sizes = list(set(t.get('fontSize', '') for t in typography if isinstance(t, dict)))[:15]
        radii = list(set(design_system.get('borderRadius', [])[:8]))
        shadows = design_system.get('shadows', [])[:5]

        config = f"""// tailwind.config.js - Generated from {self.url}
module.exports = {{
  theme: {{
    extend: {{
      colors: {{
        // Background colors
{chr(10).join(f"        'bg-{i}': '{c}'," for i, c in enumerate(colors_bg))}
        // Text colors
{chr(10).join(f"        'text-{i}': '{c}'," for i, c in enumerate(colors_text))}
      }},
      fontFamily: {{
{chr(10).join(f"        'font-{i}': ['{f}', 'sans-serif']," for i, f in enumerate(fonts))}
      }},
      fontSize: {{
{chr(10).join(f"        'size-{i}': '{s}'," for i, s in enumerate(sizes))}
      }},
      borderRadius: {{
{chr(10).join(f"        'radius-{i}': '{r}'," for i, r in enumerate(radii))}
      }},
      boxShadow: {{
{chr(10).join(f"        'shadow-{i}': '{s}'," for i, s in enumerate(shadows))}
      }},
    }},
  }},
}};
"""
        with open(self.output_dir / "tailwind.config.js", 'w') as f:
            f.write(config)

    def generate_analysis_report(self, report: dict) -> str:
        """Generate comprehensive analysis report (ANALYSIS_REPORT.md)"""

        design = report.get('design_system', {})
        colors = design.get('colors', {})
        assets = report.get('assets', {})
        animations = report.get('animations', {})

        hex_colors = colors.get('hex', [])[:20]
        css_vars = design.get('css_variables', {})
        fonts = design.get('fonts', [])[:10]
        font_files = assets.get('fonts', {})
        typography = design.get('typography', [])[:15]
        keyframes = animations.get('keyframes', [])
        animated_els = animations.get('animated_elements', [])

        report_md = f"""# Website Clone Analysis Report

## Source
- **URL**: {report.get('url', 'N/A')}
- **Title**: {report.get('title', 'N/A')}
- **Extracted**: {report.get('extracted_at', 'N/A')}

---

## Files Generated

| File | Purpose |
|------|---------|
| `index.html` | Full rendered HTML (after JS execution) |
| `screenshot_full.png` | Full-page screenshot (1920x1080) |
| `screenshot_desktop.png` | Desktop screenshot (1440x900) |
| `screenshot_tablet.png` | Tablet screenshot (768x1024) |
| `screenshot_mobile.png` | Mobile screenshot (390x844) |
| `combined_styles.css` | All CSS combined into one file |
| `tailwind.config.js` | Extracted design tokens as Tailwind config |
| `data/design_tokens.json` | Color palette, typography, spacing |
| `data/asset_manifest.json` | List of all downloaded assets |
| `data/animations.json` | CSS keyframes and transitions |
| `data/component_tree.json` | Semantic component hierarchy |
| `data/video_sources.json` | Video file information |
| `assets/fonts/` | Downloaded font files |
| `assets/images/` | Downloaded images |
| `assets/videos/` | Downloaded videos |
| `assets/css/` | Original CSS files |
| `assets/js/` | JavaScript files |

---

## Design System

### Color Palette
Total unique colors: {len(colors.get('all', []))}

**Hex Colors:**
{chr(10).join(f'- `{c}`' for c in hex_colors) if hex_colors else '- None found'}

### CSS Variables
```css
{chr(10).join(f'{k}: {v};' for k, v in list(css_vars.items())[:30]) if css_vars else '/* None found */'}
```

### Fonts Used
{chr(10).join(f'- {f}' for f in fonts) if fonts else '- None found'}

### Font Files Downloaded
{chr(10).join(f'- {info.get("filename", "unknown")}' for info in font_files.values()) if font_files else '- None downloaded'}

### Typography Samples
| Tag | Font | Size | Weight |
|-----|------|------|--------|
{chr(10).join(f'| {t.get("tag", "?")} | {str(t.get("fontFamily", ""))[:30]}... | {t.get("fontSize", "?")} | {t.get("fontWeight", "?")} |' for t in typography) if typography else '| - | - | - | - |'}

---

## Animations

### Keyframes Defined
{chr(10).join(f'- `{kf.get("name", "unknown")}`' for kf in keyframes) if keyframes else '- None found'}

### Animated Elements
{len(animated_els)} elements with animations/transitions

---

## Assets Downloaded

| Category | Count |
|----------|-------|
| Fonts | {len(font_files)} |
| Images | {len(assets.get('images', []))} |
| Videos | {len(assets.get('videos', []))} |
| Stylesheets | {len(assets.get('stylesheets', []))} |
| Scripts | {len(assets.get('scripts', []))} |

---

## How to Clone This Site

### Step 1: Set Up Project
```bash
npm create vite@latest clone-project -- --template react-ts
cd clone-project
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 2: Copy Design Tokens
1. Copy `tailwind.config.js` to your project
2. Reference `data/design_tokens.json` for exact values

### Step 3: Use Screenshots for Reference
The screenshots at multiple breakpoints show exact layouts:
- `screenshot_full.png` - Full desktop view
- `screenshot_mobile.png` - Mobile layout
- `screenshot_tablet.png` - Tablet layout

### Step 4: Reference Component Tree
Use `data/component_tree.json` to understand the DOM structure and rebuild components systematically.

### Step 5: Handle Videos
If videos use blob URLs:
1. Check `data/video_sources.json` for captured sources
2. Check `data/video_elements.json` for video configurations
3. Replace with similar stock footage if originals unavailable

---

## Common Issues

| Issue | Solution |
|-------|----------|
| Blob video URLs | Check video_elements.json or use placeholders |
| Missing fonts | Download from Google Fonts or use design_tokens.json |
| Broken animations | Reference animations.json for keyframes |
| Wrong colors | Use eyedropper on screenshot PNGs |
| Layout issues | Check component_tree.json for flexbox/grid settings |

---

*Generated by Website Cloner on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*
"""
        return report_md

    async def clone(self):
        """Main cloning method"""

        self.setup_directories()

        print("=" * 50)
        print("  Comprehensive Website Cloner")
        print("=" * 50)
        print(f"\nTarget URL: {self.url}")
        print(f"Output Dir: {self.output_dir}\n")

        async with async_playwright() as p:
            # Launch browser in headed mode for better video capture
            browser = await p.chromium.launch(
                headless=False,
                args=[
                    '--autoplay-policy=no-user-gesture-required',
                    '--disable-features=PreloadMediaEngagementData,MediaEngagementBypassAutoplayPolicies',
                    '--disable-web-security',
                    '--disable-features=IsolateOrigins,site-per-process'
                ]
            )

            context = await browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                record_video_dir=str(self.videos_dir),
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            )

            page = await context.new_page()

            # Set up network interception
            page.on("response", self.capture_network)

            print(f"[*] Navigating to {self.url}")
            await page.goto(self.url, wait_until="networkidle", timeout=60000)

            # Wait for dynamic content
            await page.wait_for_timeout(3000)

            # Deep scroll to trigger lazy loading
            await self.deep_scroll(page)
            await page.wait_for_timeout(2000)

            # Capture blob video information
            await self.capture_blob_videos(page)

            # Capture hero animations (before scrolling away)
            await page.evaluate("window.scrollTo(0, 0)")
            await page.wait_for_timeout(500)
            animation_capture = await self.capture_animations(page, duration_seconds=25)

            # === THEME CAPTURE ===
            print("[*] Detecting theme...")
            initial_theme = await self.detect_current_theme(page)
            print(f"  [THEME] Initial theme detected: {initial_theme}")

            # Find theme toggle
            print("[*] Looking for theme toggle...")
            toggle_info = await self.find_theme_toggle(page)
            if toggle_info.get('found'):
                self.detected_theme_toggle = toggle_info
                print(f"  [TOGGLE] Found: {toggle_info.get('selector')} - {toggle_info.get('ariaLabel') or toggle_info.get('className', '')[:50]}")
            else:
                print("  [TOGGLE] No theme toggle found - will try JS fallback")

            # Capture initial theme
            await self.capture_theme(page, initial_theme)

            # Try to switch to alternate theme
            alternate_theme = 'dark' if initial_theme == 'light' else 'light'
            theme_switched = False

            if toggle_info.get('found'):
                print(f"[*] Clicking theme toggle to switch to {alternate_theme}...")
                theme_switched = await self.click_theme_toggle(page, toggle_info)
                if theme_switched:
                    # Scroll back to top for consistent screenshots
                    await page.evaluate("window.scrollTo(0, 0)")
                    await page.wait_for_timeout(500)

                    # Verify the theme actually changed
                    new_theme = await self.detect_current_theme(page)
                    if new_theme == initial_theme:
                        print(f"  [!] Theme didn't change after click, trying JS fallback...")
                        theme_switched = False
                    else:
                        print(f"  [THEME] Theme changed to: {new_theme}")

            if not theme_switched:
                print(f"[*] Trying JS-based theme toggle...")
                theme_switched = await self.toggle_theme_via_js(page)
                if theme_switched:
                    await page.evaluate("window.scrollTo(0, 0)")
                    await page.wait_for_timeout(500)

            if theme_switched:
                # Verify and capture alternate theme
                new_theme = await self.detect_current_theme(page)
                print(f"  [THEME] Capturing {new_theme} theme...")
                await self.capture_theme(page, new_theme)

                # Switch back to original for remaining extraction
                print(f"[*] Switching back to {initial_theme} theme...")
                if toggle_info.get('found'):
                    await self.click_theme_toggle(page, toggle_info)
                else:
                    await self.toggle_theme_via_js(page)

                # Scroll back to top
                await page.evaluate("window.scrollTo(0, 0)")
                await page.wait_for_timeout(500)
            else:
                print(f"  [!] Could not switch themes - only {initial_theme} theme captured")

            # Save theme summary
            theme_summary = {
                'initial_theme': initial_theme,
                'themes_captured': list(k for k, v in self.themes.items() if v['design_system']),
                'toggle_found': toggle_info.get('found', False),
                'toggle_info': toggle_info if toggle_info.get('found') else None
            }
            with open(self.data_dir / "theme_info.json", 'w') as f:
                json.dump(theme_summary, f, indent=2)

            # === END THEME CAPTURE ===

            # Take regular screenshots (in initial theme)
            await self.take_screenshots(page)

            # Extract page data
            print("[*] Extracting page data...")
            page_data = await self.extract_page_data(page)

            # Extract stylesheets
            print("[*] Extracting stylesheets...")
            css_data = await self.extract_all_stylesheets(page)

            # Extract component tree
            print("[*] Extracting component structure...")
            component_tree = await self.extract_component_structure(page)

            # Store HTML
            self.html = page_data['html']
            (self.output_dir / "index.html").write_text(self.html, encoding='utf-8')

            # Save combined CSS
            combined_css = self.combine_css(css_data)
            (self.output_dir / "combined_styles.css").write_text(combined_css, encoding='utf-8')

            # Prepare design system data
            design_system = {
                'colors': self.extract_color_palette(page_data['colors']),
                'css_variables': page_data['cssVariables'],
                'fonts': page_data['fonts'],
                'font_faces': page_data['fontFaces'],
                'typography': self.dedupe_typography(page_data['typography']),
                'backgrounds': [],
                'texts': [],
                'shadows': [],
                'borderRadius': [],
                'gradients': []
            }

            # Extract additional design tokens from computed styles
            for key, style in page_data.get('computedStyles', {}).items():
                if style.get('backgroundColor') and style['backgroundColor'] not in design_system['backgrounds']:
                    design_system['backgrounds'].append(style['backgroundColor'])
                if style.get('boxShadow') and style['boxShadow'] != 'none':
                    design_system['shadows'].append(style['boxShadow'])
                if style.get('borderRadius') and style['borderRadius'] != '0px':
                    design_system['borderRadius'].append(style['borderRadius'])

            # Dedupe lists
            design_system['shadows'] = list(set(design_system['shadows']))[:10]
            design_system['borderRadius'] = list(set(design_system['borderRadius']))[:10]

            # Generate Tailwind config
            self.generate_tailwind_config(design_system)

            # Compile comprehensive report
            report = {
                "url": self.url,
                "extracted_at": datetime.now().isoformat(),
                "title": page_data['title'],
                "meta": page_data['meta'],

                "design_system": design_system,

                "layout": {
                    "computed_styles": page_data['computedStyles']
                },

                "animations": {
                    "keyframes": page_data['keyframes'],
                    "animated_elements": page_data['animations']
                },

                "media": {
                    "videos": page_data['videos'],
                    "background_images": page_data['backgroundImages'],
                    "images": self.images
                },

                "assets": {
                    "fonts": self.fonts,
                    "stylesheets": [{"url": s['url'], "local_path": s['local_path']} for s in self.stylesheets],
                    "scripts": self.scripts,
                    "images": self.images,
                    "videos": self.videos
                },

                "stylesheets_content": css_data,
                "network_log": self.network_requests,
                "links": page_data['links']
            }

            # Save data files
            print("[*] Saving data files...")

            # Design tokens (for shell script compatibility)
            with open(self.data_dir / "design_tokens.json", 'w') as f:
                json.dump(design_system, f, indent=2)

            # Asset manifest (for shell script compatibility)
            asset_manifest = {
                "fonts": list(self.fonts.values()),
                "images": self.images,
                "videos": self.videos,
                "stylesheets": [{"url": s['url'], "local_path": s['local_path']} for s in self.stylesheets],
                "scripts": self.scripts
            }
            with open(self.data_dir / "asset_manifest.json", 'w') as f:
                json.dump(asset_manifest, f, indent=2)

            # Animations
            with open(self.data_dir / "animations.json", 'w') as f:
                json.dump(report['animations'], f, indent=2)

            # Component tree
            with open(self.data_dir / "component_tree.json", 'w') as f:
                json.dump(component_tree, f, indent=2)

            # Video sources
            with open(self.data_dir / "video_sources.json", 'w') as f:
                json.dump(self.video_sources, f, indent=2)

            # Rive animations
            if self.rive_animations:
                with open(self.data_dir / "rive_animations.json", 'w') as f:
                    json.dump(self.rive_animations, f, indent=2)
                print(f"  [RIVE] Saved {len(self.rive_animations)} Rive animation(s)")

            # Typography
            with open(self.data_dir / "typography.json", 'w') as f:
                json.dump(design_system['typography'], f, indent=2)

            # Full extraction report
            with open(self.output_dir / "extraction_report.json", 'w') as f:
                json.dump(report, f, indent=2, default=str)

            # Generate and save analysis report
            analysis_report = self.generate_analysis_report(report)
            (self.output_dir / "ANALYSIS_REPORT.md").write_text(analysis_report, encoding='utf-8')

            await browser.close()

        print(f"\n{'=' * 50}")
        print("  Clone Complete!")
        print(f"{'=' * 50}")
        print(f"\nOutput directory: {self.output_dir}")

        return report


async def main():
    import sys

    url = sys.argv[1] if len(sys.argv) > 1 else "https://www.aura.build/share/lumina-video"
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "cloned_site"

    cloner = WebsiteCloner(url, output_dir)
    await cloner.clone()


if __name__ == "__main__":
    asyncio.run(main())
