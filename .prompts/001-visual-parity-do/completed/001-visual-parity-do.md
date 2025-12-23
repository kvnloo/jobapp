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
    0. STRUCTURAL → Extract and compare DOM/flex/grid patterns (BEFORE screenshots)
    1. CAPTURE → Take screenshots of both sites
    2. COMPARE → Analyze visual differences
    3. IDENTIFY → List specific discrepancies (priority order)
    4. FIX → Update code to address top 3 issues
    5. VERIFY → Re-capture and confirm fixes
    6. REPEAT → Continue until parity achieved
```

### Phase 0: Structural Analysis (CRITICAL - Run Before Screenshots)

**Why this phase exists**: Screenshots compare pixels but miss structural layout issues. A component can look 90% correct in a screenshot but have fundamentally wrong flex/grid structure that causes layout bugs at different viewport sizes or content lengths.

**Extract from `component_tree.json` and compare:**

1. **Flex patterns**:
   - `justify-between` vs `mt-auto` (Factory uses justify-between with 2-child wrapper)
   - `h-full` chain from parent to child
   - `gap` values between siblings

2. **Grid patterns**:
   - Column counts: `grid-cols-4 lg:grid-cols-12`
   - Column spans: `col-span-5`, `col-span-7`
   - Responsive breakpoints

3. **DOM structure**:
   - Child count per flex container (Factory groups content into wrappers)
   - Wrapper groupings vs flat siblings
   - Semantic nesting depth

4. **Height inheritance**:
   - `h-screen` → `h-full` cascade must propagate correctly
   - Sticky containers need explicit height chain

**Structural Discrepancy Format**:
```xml
<structural-discrepancy>
  <component>ScrollShowcase left panel</component>
  <issue>mt-auto not working - nav not anchored to bottom</issue>
  <factory-pattern>flex flex-col justify-between with 2 children (content-wrapper + nav)</factory-pattern>
  <current-pattern>flex flex-col with 4 flat siblings + mt-auto on last</current-pattern>
  <fix>Add justify-between, wrap first 3 children in div, remove mt-auto</fix>
  <priority>critical</priority>
</structural-discrepancy>
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

### Structural (Phase 0 - Check First)
- [ ] Flex parents have correct `justify-content` (justify-between for top/bottom anchoring)
- [ ] Content groups wrapped in divs (not flat siblings)
- [ ] `h-full` cascade propagates from `h-screen` parent through all children
- [ ] Border colors use `base-800` (not `base-700` - too prominent)
- [ ] Grid uses 12-column system with correct spans

### Visual (Phases 1-5)
- [ ] Header matches Factory.ai (sticky, blur backdrop, colors)
- [ ] Hero section matches (typography, spacing, terminal element)
- [ ] Project cards match (border, background, hover states)
- [ ] Colors are exact RGB matches
- [ ] Fonts render correctly (Geist loaded)
- [ ] Animations are smooth and match timing
- [ ] Responsive behavior matches at all breakpoints
- [ ] Headlines 48-56px on desktop with 100% line-height
- [ ] Body text uses sans font (not mono) where appropriate

---

## Known Structural Issues (Apply First)

These issues were identified via k-voting synthesis from 10 parallel analysis agents. Apply these fixes in Phase 0 before proceeding to visual comparison.

### ScrollShowcase Component
**File:** `src/components/shared/ScrollShowcase.tsx`

#### Issue 1: Left Panel Layout (ROOT CAUSE - Critical)
**Problem:** `mt-auto` doesn't anchor navigation to bottom because container has 4 flat siblings instead of 2 wrapped groups.

**Current (broken):**
```tsx
<div className="flex h-full flex-col">
  <div>Badge</div>      <!-- flat sibling 1 -->
  <h2>Headline</h2>     <!-- flat sibling 2 -->
  <p>Description</p>    <!-- flat sibling 3 -->
  <div className="mt-auto">Nav</div>  <!-- mt-auto ineffective -->
</div>
```

**Factory.ai pattern (correct):**
```tsx
<div className="flex h-full flex-col justify-between">
  <div>                 <!-- wrapper child 1 -->
    <div>Badge</div>
    <h2>Headline</h2>
    <p>Description</p>
  </div>
  <div>Nav</div>        <!-- child 2 - pushed to bottom -->
</div>
```

**Fix:**
1. Add `justify-between` to left panel container (~line 578)
2. Wrap badge + headline + description in `<div>`
3. Remove `mt-auto` from navigation div, keep `pt-6`

#### Issue 2: Height Cascade
**Problem:** `h-full` not propagating through grid children.

**Fix:**
- Add `h-full` to right panel container (~line 659)
- Add `md:h-full` to both column children (~lines 662, 708)

#### Issue 3: Typography
**Problem:** Headlines too small, body using mono font.

**Fix:**
- Headline: `text-[28px] lg:text-[36px] xl:text-[42px]` → `text-[32px] lg:text-[48px] xl:text-[56px] leading-[100%]`
- Description: `font-mono text-[13px]` → `font-sans text-[14px] lg:text-[16px]`

#### Issue 4: Polish
**Problem:** Borders too prominent, gaps too tight.

**Fix:**
- All `border-base-700` → `border-base-800`
- Tab gaps: `gap-1` → `gap-2 lg:gap-3`
- Section label gaps: `gap-1.5` → `gap-3 lg:gap-4`

### Validation After Fixes
- [ ] Pills anchored to bottom-left of viewport
- [ ] Headlines 48-56px on desktop
- [ ] Body uses sans font (not mono)
- [ ] Borders subtle (base-800)
- [ ] Spacing feels airy

---

## Execution Command
```
Run this prompt using Task agents. The workflow should:
1. Start dev server if not running
2. Apply Known Structural Issues fixes FIRST (Phase 0)
3. Capture initial screenshots
4. Enter comparison loop
5. Apply remaining fixes iteratively
6. Report completion with evidence
```
