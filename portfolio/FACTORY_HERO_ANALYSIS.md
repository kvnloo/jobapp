# Factory.ai Hero Animation Analysis

## Hero Animation Sequence (Multi-Phase Timeline)

Factory.ai uses JavaScript-controlled animations (likely GSAP) with character-by-character reveals and staggered timing.

### Phase 1: Badge Entrance (0-1.2s)
- **0-0.8s**: Badge icon fade-in with pulse glow animation
- **0.3-1.2s**: Badge text reveals character by character
- **Effect**: Badge appears first to establish context ("Vision")
- **Classes**: `.invisible → .visible` transition
- **Animation**: `translate(0, 0)` from initial hidden state

### Phase 2: Character Reveal - Main Headline (1.2-4.5s)
- **1.2-4.5s**: "Agent-Native Software Development" reveals character-by-character
- **Timing**: ~50ms delay per character (staggered)
- **Effect**: Each character animates from `opacity: 0, transform: translate(0, -50px)` to `opacity: 1, transform: translate(0, 0)`
- **Total Characters**: ~40 characters = ~2000ms + 1200ms start = 3.2s
- **Factory Implementation**:
  ```html
  <span class="char-reveal" style="transform: translate(0px, 0px); opacity: 1;">A</span>
  ```

### Phase 3: Subheadline Fade (4.5-6.5s)
- **4.5-6.5s**: Tagline/description fades in
- **Effect**: Smooth opacity transition with slight upward movement
- **Duration**: 2s ease-out
- **Transform**: `translateY(10px) → translateY(0)`

### Phase 4: CTA Buttons Stagger (6.5-8.5s)
- **6.5-7.5s**: Primary button ("View Projects") slides in from left
- **7.5-8.5s**: Secondary button ("Get In Touch") slides in from left
- **Effect**: Staggered entrance with 1s delay between buttons
- **Transform**: `translateX(-20px) opacity: 0 → translateX(0) opacity: 1`

### Phase 5: Terminal/Code Preview (8.5-12s)
- **8.5-10s**: Terminal container fades in
- **10-10.5s**: "// Current Role" comment types in
- **10.5-11s**: Role title reveals with cursor blink
- **11-11.5s**: Company name appears
- **11.5-12s**: Description fades in
- **Effect**: Terminal typing simulation with cursor

### Phase 6: Background Elements (12-15s)
- **12-15s**: Subtle background grid/pattern animations
- **Effect**: Grid lines pulse, fade patterns
- **Continuous**: Background effects loop after initial sequence

## Key Implementation Details

### CSS Animation Classes Needed:
```css
.animate-phase-1 { animation: fadeInUp 800ms ease-out 0s forwards; opacity: 0; }
.animate-phase-2 { animation: charReveal 100ms ease-out var(--char-delay) forwards; opacity: 0; }
.animate-phase-3 { animation: fadeInUp 2s ease-out 4.5s forwards; opacity: 0; }
.animate-phase-4a { animation: slideInLeft 1s ease-out 6.5s forwards; opacity: 0; }
.animate-phase-4b { animation: slideInLeft 1s ease-out 7.5s forwards; opacity: 0; }
.animate-phase-5 { animation: fadeIn 1.5s ease-out 8.5s forwards; opacity: 0; }
```

### Keyframe Definitions:
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes charReveal {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes pulse-glow {
  0%, 100% { background-color: var(--color-accent-200); }
  50% { background-color: var(--color-accent-100); }
}
```

## Scroll Section Indicators

Factory.ai doesn't appear to have traditional scroll dots, but modern implementations use:

### Recommended Scroll Indicator Features:
1. **Vertical dot navigation** on the right side
2. **Active state animations**: Scale up + color change
3. **Hover labels**: Section names appear on hover
4. **Progress line**: Connecting line shows scroll progress
5. **Smooth transitions**: 300ms ease-out for all state changes

### Animation States:
- **Inactive**: Small dot, base-600 color, opacity 0.5
- **Active**: Larger dot, accent-200 color, opacity 1, scale(1.5)
- **Hover**: Label slides in from right, tooltip effect
- **Transition**: Morph animation between states (scale + color)

## Total Sequence Duration: ~15 seconds

After 15s, all elements are in their final state and interactive. Background animations continue to loop for visual interest.
