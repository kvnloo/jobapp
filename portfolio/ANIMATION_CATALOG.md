# Factory.ai Animation Catalog

Complete audit comparing Factory.ai animations to current portfolio implementation.

---

## 1. Hero Section Animations

### Orange Dot Pulse/Glow
**Factory.ai Implementation:**
- **Element**: Orange circular indicator on hero logo
- **Animation**: `filter: drop-shadow(rgb(255, 255, 255) 0px 0px 0px)` with animation
- **Visual**: Pulsing orange dot with white glow effect visible in screenshot
- **Location**: Center of Factory logo star/badge in hero section
- **CSS Class**: Applied via inline styles with data-svg-origin transforms

**Portfolio Status:** ❌ **MISSING**
- No orange dot indicator
- No pulsing/glow animation on logo
- **Gap**: Need to add glowing orange accent to hero section

---

### Character Reveal/Typing Effect
**Factory.ai Implementation:**
- **Animation**: Characters appear sequentially with subtle fade-in
- **Usage**: Hero headline "Agent-Native Software Development"
- **Timing**: Not explicitly defined in extracted data, appears smooth and progressive

**Portfolio Status:** ✅ **IMPLEMENTED** (Partial)
- **File**: `/portfolio/src/hooks/useCharacterReveal.ts`
- **Keyframe**: `@keyframes charReveal` (0%: opacity 0, translateY(10px) → 100%: opacity 1, translateY(0))
- **Duration**: 0.3s ease-out forwards
- **Delay**: 50ms per character (configurable)
- **Gap**: Working implementation, similar timing needed

---

### Logo Text Reveal
**Factory.ai Implementation:**
- **Animation**: Logo letters (FACTORY) start with `opacity: 0` and `transform: matrix(1,0,0,1,0,-50)`
- **Effect**: Slides down 50px while fading in
- **Stagger**: Each letter path has individual animation
- **Keyframes**: Uses inline transform animations

**Portfolio Status:** ❌ **MISSING**
- No logo letter animation
- No stagger effect on brand name
- **Gap**: Need staggered slide-down + fade animation for logo

---

## 2. Scroll Animations

### Progress Indicator (Loading Bar)
**Factory.ai Implementation:**
- **Keyframe**: `@keyframes progress-slide`
  ```css
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0%); }
  100% { transform: translateX(100%); }
  ```
- **Class**: `.progress-loader`
- **Animation**: `animation: 2s linear 0s infinite normal none running progress-slide`
- **Element**: Horizontal sliding bar that moves left-to-right continuously
- **Visual**: Visible in screenshot as thin progress indicators

**Portfolio Status:** ❌ **MISSING**
- No progress loader animation
- No sliding bar effect
- **Gap**: Need to implement sliding progress bar for loading states

---

### Section Scroll Indicators (Dots/Pagination)
**Factory.ai Visual Evidence:**
- Screenshot shows vertical dot navigation on right side
- Appears to indicate current scroll section
- Active state likely uses different opacity/color

**Factory.ai Code Evidence:**
- No explicit "dot" or "pagination" classes found in HTML
- Likely implemented via JavaScript scroll listeners
- May use opacity transitions and color changes

**Portfolio Status:** ❌ **MISSING**
- No section dot indicators
- No scroll position tracking UI
- **Gap**: Need vertical scroll progress dots with active states

---

### Smooth Scroll Behavior
**Factory.ai Implementation:**
- **HTML**: `class="mx-auto min-h-screen max-w-[1920px] scroll-smooth"`
- **CSS**: `scroll-behavior: smooth;`
- **Effect**: Native smooth scrolling enabled

**Portfolio Status:** ✅ **IMPLEMENTED**
- **File**: `/portfolio/src/index.css`
- **CSS**: `html { scroll-behavior: smooth; }` (line 165)
- **Status**: Identical implementation

---

### Scroll-Triggered Element Reveals
**Factory.ai Implementation:**
- Uses IntersectionObserver (implied by class patterns)
- Elements start with `opacity-0` and animate to `opacity-100`
- Transform animations on scroll into view

**Portfolio Status:** ✅ **IMPLEMENTED**
- **File**: `/portfolio/src/hooks/useScrollAnimation.ts`
- **Features**:
  - IntersectionObserver with configurable threshold (default 0.1)
  - triggerOnce option (default true)
  - rootMargin support
  - Returns isVisible state for conditional rendering
- **Status**: Full implementation matches Factory pattern

---

## 3. Hover/Interactive Animations

### Button Pattern Animation (Diagonal Lines)
**Factory.ai Implementation:**
- **Pattern**: `slidePattern` keyframe
  ```css
  @keyframes slidePattern {
    0% { background-position: 0px 0px; }
    100% { background-position: 28.28px -28.28px; }
  }
  ```
- **Animation**: `animate-[slidePattern_2000ms_linear_infinite]`
- **Background**:
  ```css
  background-image: repeating-linear-gradient(
    45deg,
    transparent 0px, transparent 2px,
    var(--lines-color) 2px, var(--lines-color) 3px,
    transparent 3px, transparent 5px
  );
  background-size: 7.07px 7.07px
  ```
- **Trigger**:
  - Default: `paused` state
  - On hover: `group-hover:running`
  - On focus: `group-focus-visible:running`
- **Overlay**: `opacity-0` → `group-hover:animate-[delayedFadeIn_100ms_ease-out_forwards]`

**Portfolio Status:** ❌ **MISSING**
- No diagonal line pattern animation
- No paused/running animation state toggle
- **Gap**: Need full button pattern animation system

---

### Delayed Fade In (On Hover)
**Factory.ai Implementation:**
- **Keyframe**: `@keyframes delayedFadeIn`
  ```css
  0%, 80% { opacity: 0; }
  100% { opacity: 1; }
  ```
- **Usage**: Overlay patterns that wait before appearing on hover
- **Duration**: 100ms ease-out forwards
- **Effect**: Creates subtle delay before showing hover effects

**Portfolio Status:** ❌ **MISSING**
- No delayed fade-in keyframe
- Basic fade-in doesn't include delay threshold
- **Gap**: Need delayedFadeIn for sophisticated hover states

---

### Underline Grow Effect
**Factory.ai Implementation:**
- Uses `::after` pseudo-element
- **Classes**:
  ```css
  after:absolute after:-bottom-px after:left-0
  after:h-px after:w-0 after:bg-current
  after:transition-all after:duration-300 after:ease-in-out
  hover:after:w-full
  ```
- **Effect**: Underline grows from 0 to 100% width on hover
- **Duration**: 300ms ease-in-out
- **Color**: Uses `bg-current` (inherits text color)

**Portfolio Status:** ❌ **MISSING**
- No underline grow animation on links
- No ::after pseudo-element animation
- **Gap**: Need animated underline for navigation links

---

### Opacity Hierarchy on Hover
**Factory.ai Implementation:**
- **Group Pattern**: `group/menu` container
- **Default**: `opacity-100`
- **Group Hover**: All items fade to `opacity-60`
- **Individual Hover**: Hovered item returns to `hover:!opacity-100`
- **Effect**: Creates focus by dimming non-hovered items

**Portfolio Status:** ❌ **MISSING**
- No opacity hierarchy system
- No group hover patterns
- **Gap**: Need menu item focus via opacity manipulation

---

## 4. Navigation/UI Component Animations

### Navigation Menu Dropdown
**Factory.ai Implementation:**
- **Open Animation**: `scaleIn` (250ms ease)
  ```css
  @keyframes scaleIn {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
  ```
- **Close Animation**: `scaleOut` (250ms ease)
  ```css
  @keyframes scaleOut {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.95); }
  }
  ```
- **Directional Animations**:
  - `enterFromLeft`: translate(-100px) → translate(0)
  - `enterFromRight`: translate(100px) → translate(0)
  - `exitToLeft`: translate(0) → translate(-200px)
  - `exitToRight`: translate(0) → translate(200px)
- **State Management**: `data-state="open"/"closed"` and `data-motion="from-start"/"from-end"`

**Portfolio Status:** ✅ **IMPLEMENTED** (Partial)
- **File**: `/portfolio/src/index.css`
- `@keyframes scaleIn` (lines 231-240) - ✅ Matches Factory
- `@keyframes fadeIn` (lines 222-229) - Similar concept
- **Gaps**:
  - ❌ Missing `scaleOut`
  - ❌ Missing directional enter/exit animations
  - ❌ Missing state-based animation triggers

---

### Accordion Animations
**Factory.ai Implementation:**
- **Down Animation**: `accordion-down`
  ```css
  @keyframes accordion-down {
    0% { height: 0px; }
    100% { height: var(--radix-accordion-content-height, auto); }
  }
  ```
- **Up Animation**: `accordion-up`
  ```css
  @keyframes accordion-up {
    0% { height: var(--radix-accordion-content-height, auto); }
    100% { height: 0px; }
  }
  ```
- **Duration**: 200ms ease-out
- **Trigger**: `data-state="open"` → `animate-accordion-down`
- **Class**: `.animate-accordion-down` and `.animate-accordion-up`

**Portfolio Status:** ❌ **MISSING**
- No accordion animations
- No height-based expand/collapse
- **Gap**: Need accordion animation system if using accordions

---

### Mobile Menu Animation
**Factory.ai Implementation:**
- **Toggle Icon**: SVG paths with transform animations
  - Top bar: `transform: matrix(1,0,0,1,0,0)` (rotates on toggle)
  - Middle bar: `opacity: 1` → fades out
  - Bottom bar: transforms to complete X shape
- **Menu Slide**: Likely uses `enterFromLeft` or similar
- **Backdrop**: Fade in with backdrop-blur

**Portfolio Status:** ❌ **NOT ANALYZED**
- Need to check if portfolio has mobile menu
- **Gap**: TBD based on mobile implementation

---

## 5. Transition Timing & Easing

### Factory.ai Timing System
**CSS Variables:**
```css
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--default-transition-duration: 0.15s;
--default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```

**Common Durations:**
- Ultra-fast: 100ms (delayed fade-in)
- Fast: 150ms (default transitions)
- Standard: 200-250ms (modals, dropdowns, accordions)
- Medium: 300ms (underline grows)
- Slow: 2000ms (pattern slides, infinite)

**Portfolio Implementation:**
✅ **Partially Matches**
- Uses similar ease-out timings
- Missing explicit CSS variable definitions
- Animation durations vary but in similar range

---

## 6. Advanced Animation Patterns

### Pulse Animation
**Factory.ai Implementation:**
- **Keyframe**: `@keyframes pulse { 50% { opacity: 0.5; } }`
- **CSS Variable**: `--animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`
- **Class**: `.animate-pulse`
- **Usage**: Likely for loading states or attention indicators

**Portfolio Status:** ❌ **MISSING**
- No pulse keyframe defined
- No infinite opacity animation
- **Gap**: Need pulse for loading/attention states

---

### Carousel/Slide Animations
**Factory.ai Implementation:**
- **Keyframe**: `@keyframes carouselSlide`
  ```css
  100% { translate: var(--destination-x) var(--destination-y); }
  ```
- **Dynamic Variables**: Uses CSS custom properties for destinations
- **Effect**: Translates element to dynamic coordinates

**Portfolio Status:** ❌ **MISSING**
- No carousel animations
- No dynamic translate system
- **Gap**: Need if implementing carousel/slider

---

### Generic Enter/Exit System
**Factory.ai Implementation:**
- **Enter**:
  ```css
  @keyframes enter {
    0% {
      opacity: var(--tw-enter-opacity, 1);
      transform: translate3d(
        var(--tw-enter-translate-x, 0),
        var(--tw-enter-translate-y, 0),
        0
      ) scale3d(
        var(--tw-enter-scale, 1),
        var(--tw-enter-scale, 1),
        var(--tw-enter-scale, 1)
      ) rotate(var(--tw-enter-rotate, 0));
    }
  }
  ```
- **Exit**: Similar with `--tw-exit-*` variables
- **Classes**: `.animate-in`, `.animate-out`, `.data-[state=open]:animate-in`
- **Flexibility**: Highly configurable via CSS variables

**Portfolio Status:** ❌ **MISSING**
- No generic enter/exit system
- Animations are hardcoded, not variable-driven
- **Gap**: Need flexible animation system for complex components

---

## 7. Performance Optimizations

### Factory.ai Optimizations
**Will-Change Properties:**
- `will-change-transform` - on animated elements
- `will-change-[background-color]` - on color-transitioning elements
- `will-change-[color]` - on text color changes

**Transform Optimizations:**
- Uses `translate` property instead of `transform: translateX/Y`
- Uses `rotate` and `scale` properties for better performance
- 3D transforms for GPU acceleration: `translate3d()`, `scale3d()`

**Animation States:**
- `paused` class on idle animations
- `running` class triggered by interactions
- Prevents unnecessary animation calculations

**Portfolio Status:** ❌ **MISSING**
- No will-change declarations
- Not using new CSS transform properties
- No animation pause/play optimization
- **Gap**: Need performance optimization layer

---

## 8. What Portfolio HAS That Factory Doesn't Use

### fadeInUp Animation
**Portfolio Implementation:**
```css
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```
**Factory.ai**: Not found (uses more granular enter/exit system)

---

## 9. Critical Missing Animations (Priority Order)

### 🔴 HIGH PRIORITY
1. **Orange Dot Pulse/Glow** - Hero section signature element
2. **Button Pattern Animation** (slidePattern) - Used on ALL CTAs
3. **Progress Loader** - Loading states throughout site
4. **Delayed Fade In** - Hover state sophistication
5. **Logo Text Reveal** - Hero section entrance

### 🟡 MEDIUM PRIORITY
6. **Underline Grow Effect** - Navigation links
7. **Opacity Hierarchy** - Menu item focus
8. **Pulse Animation** - Attention/loading indicators
9. **Navigation Dropdowns** (scaleOut + directional exits)
10. **Section Scroll Dots** - Page navigation

### 🟢 LOW PRIORITY
11. **Accordion Animations** - If using accordions
12. **Carousel Slides** - If implementing carousel
13. **Generic Enter/Exit System** - Advanced component library
14. **Mobile Menu Animations** - Mobile-specific

---

## 10. Implementation Recommendations

### Phase 1: Core Hero Animations (Week 1)
- [ ] Add orange dot pulse to logo/hero section
- [ ] Implement slidePattern button animation
- [ ] Add logo text stagger reveal
- [ ] Ensure character reveal timing matches Factory

### Phase 2: Interaction Patterns (Week 2)
- [ ] Add delayedFadeIn keyframe
- [ ] Implement underline grow on links
- [ ] Add opacity hierarchy to navigation
- [ ] Create progress-slide loader

### Phase 3: Performance & Polish (Week 3)
- [ ] Add will-change optimizations
- [ ] Implement animation pause/play states
- [ ] Add pulse animation for loading
- [ ] Create scroll position dots

### Phase 4: Advanced Features (Week 4)
- [ ] Build generic enter/exit system
- [ ] Add navigation dropdown animations (scaleOut, directional)
- [ ] Implement accordion animations if needed
- [ ] Add mobile menu transitions

---

## 11. Animation Inventory Summary

| Animation Type | Factory.ai | Portfolio | Status |
|----------------|------------|-----------|--------|
| Character Reveal | ✅ | ✅ | MATCH |
| Scroll Animation Hook | ✅ | ✅ | MATCH |
| Smooth Scroll | ✅ | ✅ | MATCH |
| ScaleIn | ✅ | ✅ | MATCH |
| FadeIn | ✅ | ✅ | MATCH |
| Orange Dot Pulse | ✅ | ❌ | MISSING |
| SlidePattern (Button) | ✅ | ❌ | MISSING |
| Progress Loader | ✅ | ❌ | MISSING |
| Delayed Fade In | ✅ | ❌ | MISSING |
| Logo Text Reveal | ✅ | ❌ | MISSING |
| Underline Grow | ✅ | ❌ | MISSING |
| Opacity Hierarchy | ✅ | ❌ | MISSING |
| ScaleOut | ✅ | ❌ | MISSING |
| Directional Exits | ✅ | ❌ | MISSING |
| Accordion Down/Up | ✅ | ❌ | MISSING |
| Pulse | ✅ | ❌ | MISSING |
| Carousel Slide | ✅ | ❌ | MISSING |
| Enter/Exit System | ✅ | ❌ | MISSING |
| Will-Change Opts | ✅ | ❌ | MISSING |
| Animation Pause/Play | ✅ | ❌ | MISSING |
| Scroll Dots | ✅ | ❌ | MISSING |

**Match Rate: 5/22 (22.7%)**

---

## 12. Next Steps

1. **Immediate**: Implement HIGH PRIORITY animations (orange dot, slidePattern, progress loader)
2. **Short-term**: Add interaction polish (delayed fade, underline, opacity hierarchy)
3. **Medium-term**: Build comprehensive animation system (enter/exit, variables)
4. **Long-term**: Add performance optimizations (will-change, pause/play states)

---

## Appendix: Animation Code Reference

### Factory.ai Keyframes (Complete List)
1. `scaleIn` - Modal/dropdown open
2. `scaleOut` - Modal/dropdown close
3. `enterFromRight` - Slide in from right
4. `enterFromLeft` - Slide in from left
5. `exitToRight` - Slide out to right
6. `exitToLeft` - Slide out to left
7. `accordion-down` - Expand accordion
8. `accordion-up` - Collapse accordion
9. `slidePattern` - Diagonal line animation
10. `carouselSlide` - Dynamic translate
11. `delayedFadeIn` - Delayed opacity reveal
12. `pulse` - Infinite opacity oscillation
13. `enter` - Generic enter with variables
14. `exit` - Generic exit with variables
15. `progress-slide` - Loading bar animation

### Portfolio Keyframes (Complete List)
1. `fadeInUp` - Fade + translate up
2. `fadeIn` - Simple opacity
3. `scaleIn` - Scale + fade (matches Factory)
4. `charReveal` - Character typing effect

**Factory has 11 more keyframes than Portfolio.**
