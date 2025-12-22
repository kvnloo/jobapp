# Visual Parity Implementation - Autonomous Workflow

## Objective
Achieve pixel-perfect visual parity between the portfolio site and Factory.ai reference using an autonomous visual comparison loop with Puppeteer screenshots and iterative code fixes.

## Priority Order
1. **Styling** - Colors, typography, spacing, borders
2. **Layout** - Grid structure, component placement, responsive behavior
3. **Animations** - Transitions, hover effects, scroll animations

## Source Files

### Reference (Target)
- Screenshots: `/home/kvn/workspace/jobapp/factory_clone/screenshot_desktop.png`
- Screenshots: `/home/kvn/workspace/jobapp/factory_clone/screenshot_mobile.png`
- Live CSS: `/home/kvn/workspace/jobapp/factory_clone/combined_styles.css`
- Design tokens: `/home/kvn/workspace/jobapp/factory_clone/data/design_tokens.json`

### Portfolio (Current)
- Project: `/home/kvn/workspace/jobapp/portfolio/`
- Dev server: `http://localhost:5175/`

---

## Autonomous Loop Workflow

### Loop Structure
```
WHILE visual_differences_exist:
    1. CAPTURE → Take screenshots of both sites
    2. COMPARE → Analyze visual differences
    3. IDENTIFY → List specific discrepancies (priority order)
    4. FIX → Update code to address top 3 issues
    5. VERIFY → Re-capture and confirm fixes
    6. REPEAT → Continue until parity achieved
```

### Phase 1: Initial Capture
Use Playwright MCP or Puppeteer to capture:

```javascript
// Capture reference screenshots (already exist, but can refresh)
// Capture portfolio at http://localhost:5175/

// Viewports to capture:
const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 }
];

// Sections to capture individually:
const sections = [
  { name: 'header', selector: 'header' },
  { name: 'hero', selector: '#hero, [class*="hero"], main > section:first-child' },
  { name: 'projects', selector: '#projects' },
  { name: 'full-page', selector: 'body' }
];
```

Save screenshots to: `/home/kvn/workspace/jobapp/portfolio/screenshots/`

### Phase 2: Visual Comparison Analysis
For each screenshot pair (reference vs portfolio):

1. **Read both images** using the Read tool
2. **Analyze differences** in:
   - Background colors (should be rgb(2,2,2))
   - Text colors (foreground rgb(238,238,238))
   - Accent colors (orange #EF6F2E)
   - Font rendering (Geist family)
   - Spacing and padding
   - Border styles and colors
   - Shadow effects
   - Animation presence

3. **Document discrepancies** with specific details:
   ```xml
   <discrepancy>
     <section>hero</section>
     <element>main heading</element>
     <issue>Font size too small, should be 72px</issue>
     <reference>text-[72px] tracking-[-2.88px]</reference>
     <current>text-6xl</current>
     <fix>Update HeroSection.tsx line X</fix>
     <priority>high</priority>
   </discrepancy>
   ```

### Phase 3: Code Fixes
For each identified discrepancy (top 3 per iteration):

1. **Locate the component** in `/home/kvn/workspace/jobapp/portfolio/src/`
2. **Read the current code**
3. **Apply the fix** using exact Factory.ai classes/values
4. **Verify build** passes after each fix

### Phase 4: Verification
After fixes:
1. Wait for Vite hot reload (2 seconds)
2. Re-capture screenshots
3. Compare to reference again
4. Log improvements and remaining issues

### Phase 5: Loop Decision
- If major discrepancies remain → Continue loop
- If only minor differences → Report completion
- Max iterations: 10 (prevent infinite loop)

---

## Specific Focus Areas

### Typography Matching
```css
/* Factory.ai exact values */
--text-hero: 72px, line-height: 1, letter-spacing: -2.88px
--text-section: 48px, line-height: 1, letter-spacing: -1.44px
--text-body-mono: 18px, line-height: 1.2, letter-spacing: -0.36px
--text-label: 12px, line-height: 1, letter-spacing: -0.24px

/* Font families */
font-family: Geist, "Geist Fallback", system-ui, sans-serif
font-family: "Geist Mono", "Geist Mono Fallback", monospace
```

### Color Matching
```css
/* Exact Factory.ai colors */
--background: rgb(2, 2, 2)
--foreground: rgb(238, 238, 238)
--accent-100: rgb(239, 111, 46)  /* #EF6F2E */
--accent-200: rgb(238, 96, 24)
--accent-300: rgb(209, 80, 16)
--neutral-100: #d6d3d2
--neutral-800: #3d3a39
--neutral-1000: #1f1d1c
```

### Animation Matching
```css
/* Factory.ai animations to replicate */
@keyframes delayedFadeIn {
  0%, 80% { opacity: 0 }
  100% { opacity: 1 }
}

@keyframes scaleIn {
  0% { opacity: 0; transform: scale(0.95) }
  100% { opacity: 1; transform: scale(1) }
}

/* Transition defaults */
transition-duration: 250ms
transition-timing-function: ease-out
```

---

## Agent Delegation Strategy

### Use Task tool with these subagent types:

1. **Explore agent** - Analyze screenshots, identify differences
2. **frontend-architect agent** - Design CSS/component fixes
3. **general-purpose agent** - Execute code changes

### Parallel Execution
- Capture all viewport screenshots in parallel
- Fix independent components in parallel
- Sequential for dependent changes

---

## Output Requirements

### Progress Log
Create `/home/kvn/workspace/jobapp/portfolio/VISUAL_PARITY_LOG.md`:
```markdown
# Visual Parity Progress

## Iteration 1
- Captured: desktop, tablet, mobile screenshots
- Issues found: 12
- Fixed: 3 (header background, hero font size, accent color)
- Remaining: 9

## Iteration 2
...
```

### Final Report
When complete, create SUMMARY.md with:
- Total iterations required
- All fixes applied
- Before/after screenshot comparison
- Remaining minor differences (if any)

---

## Success Criteria
- [ ] Header matches Factory.ai (sticky, blur backdrop, colors)
- [ ] Hero section matches (typography, spacing, terminal element)
- [ ] Project cards match (border, background, hover states)
- [ ] Colors are exact RGB matches
- [ ] Fonts render correctly (Geist loaded)
- [ ] Animations are smooth and match timing
- [ ] Responsive behavior matches at all breakpoints

---

## Execution Command
```
Run this prompt using Task agents. The workflow should:
1. Start dev server if not running
2. Capture initial screenshots
3. Enter comparison loop
4. Apply fixes iteratively
5. Report completion with evidence
```
