# Website Clone Analysis Report

## Source
- **URL**: https://factory.ai/
- **Title**: Factory | Agent-Native Software Development
- **Extracted**: 2025-12-21T09:19:26.852966

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
Total unique colors: 21

**Hex Colors:**
- None found

### CSS Variables
```css
--tw-inset-shadow-alpha: 100%;
--tw-ring-shadow: 0 0 #0000;
--text-2xl: 1.5rem;
--aspect-video: 16/9;
--color-base-500: #8a8380;
--neutral-800: #3d3a39;
--tw-drop-shadow-alpha: 100%;
--neutral-300: #b8b3b0;
--text-7xl: 4.5rem;
--tw-animation-delay: 0s;
--text-lg: 1.125rem;
--color-neutral-600: oklch(43.9% 0 0);
--neutral-500: #8a8380;
--neutral-1000: #1f1d1c;
--neutral-100: #d6d3d2;
--tw-outline-style: solid;
--_number-flow-dx: 0px;
--text-5xl--line-height: 1;
--tw-inset-ring-shadow: 0 0 #0000;
--text-base--line-height: calc(1.5/1);
--tw-animation-direction: normal;
--tw-enter-scale: 1;
--color-base-300: #b8b3b0;
--neutral-600: #5c5855;
--color-gray-500: oklch(55.1% .027 264.364);
--color-accent-300: #d15010;
--tw-inset-shadow: 0 0 #0000;
--tw-ring-offset-color: #fff;
--text-lg--line-height: calc(1.75/1.125);
--tw-gradient-from: rgba(0, 0, 0, 0);
```

### Fonts Used
- ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- Geist, "Geist Fallback"
- "Geist Mono", "Geist Mono Fallback"

### Font Files Downloaded
- 93f479601ee12b01-s.p_93cd7176.woff2
- 4cf2300e9c8272f7-s.p_93846fc4.woff2

### Typography Samples
| Tag | Font | Size | Weight |
|-----|------|------|--------|
| A | Geist, "Geist Fallback"... | 16px | 400 |
| SPAN | Geist, "Geist Fallback"... | 16px | 400 |
| LI | Geist, "Geist Fallback"... | 16px | 400 |
| BUTTON | Geist, "Geist Fallback"... | 16px | 400 |
| SPAN | "Geist Mono", "Geist Mono Fall... | 12px | 400 |
| A | "Geist Mono", "Geist Mono Fall... | 12px | 400 |
| P | "Geist Mono", "Geist Mono Fall... | 12px | 400 |
| H1 | Geist, "Geist Fallback"... | 72px | 400 |
| SPAN | Geist, "Geist Fallback"... | 72px | 400 |
| P | "Geist Mono", "Geist Mono Fall... | 18px | 400 |
| SPAN | "Geist Mono", "Geist Mono Fall... | 16px | 400 |
| H2 | Geist, "Geist Fallback"... | 48px | 400 |
| SPAN | Geist, "Geist Fallback"... | 48px | 400 |

---

## Animations

### Keyframes Defined
- `scaleIn`
- `scaleOut`
- `enterFromRight`
- `enterFromLeft`
- `exitToRight`
- `exitToLeft`
- `accordion-down`
- `accordion-up`
- `slidePattern`
- `carouselSlide`
- `delayedFadeIn`
- `pulse`
- `enter`
- `exit`
- `progress-slide`
- `progress-slide`
- `progress-slide`
- `progress-slide`
- `progress-slide`
- `progress-slide`
- `progress-slide`
- `progress-slide`
- `progress-slide`
- `progress-slide`
- `progress-slide`

### Animated Elements
3520 elements with animations/transitions

---

## Assets Downloaded

| Category | Count |
|----------|-------|
| Fonts | 2 |
| Images | 2 |
| Videos | 0 |
| Stylesheets | 3 |
| Scripts | 44 |

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

*Generated by Website Cloner on 2025-12-21 09:19:26*
