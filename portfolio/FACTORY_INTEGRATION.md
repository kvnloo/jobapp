# Factory.ai Design System Integration

This project is a React + TypeScript portfolio built with Vite and integrates the Factory.ai design system.

## What Was Done (Phase 1)

### 1. Project Setup
- Created Vite + React + TypeScript project in `/home/kvn/workspace/jobapp/portfolio/`
- Installed Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- Configured PostCSS and Tailwind

### 2. Design Assets Copied

#### Fonts
Copied from `/home/kvn/workspace/jobapp/factory_clone/assets/fonts/` to `public/fonts/`:
- `4cf2300e9c8272f7-s.p_93846fc4.woff2` (Geist font)
- `93f479601ee12b01-s.p_93cd7176.woff2` (Geist Mono font)

#### CSS Styles
Copied from `/home/kvn/workspace/jobapp/factory_clone/`:
- `combined_styles.css` → `src/styles/factory.css` (1846 lines)

### 3. Design Tokens Integration

Created comprehensive design system based on `factory_clone/data/design_tokens.json`:

#### CSS Variables in `src/index.css`
- **Color System**: All Factory.ai colors including dark/light base, accent, and neutral palettes
- **Typography Scale**: Text sizes from xs (0.75rem) to 7xl (4.5rem) with line heights
- **Font Weights**: normal (400), medium (500), semibold (600), bold (700)
- **Spacing System**: Base spacing unit (0.25rem)
- **Border Radius**: From xs (0.125rem) to 3xl (1.5rem)
- **Transitions**: Easing functions and timing
- **Font Faces**: Geist and Geist Mono with fallbacks

#### Tailwind Configuration (`tailwind.config.js`)
Extended Tailwind with Factory.ai design tokens:
- Custom colors matching Factory.ai palette
- Font families (Geist, Geist Mono)
- Custom letter spacing for tight tracking
- Line height utilities

### 4. Test Implementation
Created `App.tsx` with comprehensive design system tests:
- Typography scale demonstration
- Color palette showcase
- Button components with hover states
- Font family examples

## Available Design Tokens

### Colors
```css
--color-background: #020202
--color-foreground: #eeeeee
--dark-base-primary: #020202
--dark-base-secondary: #101010
--light-base-primary: #eeeeee
--light-base-secondary: #fafafa
--accent-100: #ef6f2e
--accent-200: #ee6018
--accent-300: #d15010
--neutral-100 through --neutral-1000
```

### Typography
```css
--text-xs through --text-7xl (with line heights)
--font-weight-normal through --font-weight-bold
--leading-tight, --leading-snug, --leading-relaxed, --leading-loose
```

### Spacing & Borders
```css
--spacing: 0.25rem
--radius-xs through --radius-3xl
```

### Fonts
- **Geist**: Variable weight (100-900) sans-serif font
- **Geist Mono**: Variable weight (100-900) monospace font

## Build & Development

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
portfolio/
├── public/
│   └── fonts/
│       ├── 4cf2300e9c8272f7-s.p_93846fc4.woff2 (Geist)
│       └── 93f479601ee12b01-s.p_93cd7176.woff2 (Geist Mono)
├── src/
│   ├── styles/
│   │   └── factory.css (1846 lines of Factory.ai CSS)
│   ├── App.tsx (Design system test page)
│   ├── index.css (CSS variables & Tailwind setup)
│   └── main.tsx
├── tailwind.config.js (Factory.ai design tokens)
├── postcss.config.js
└── package.json
```

## Verification Status

✅ Project created with Vite + React + TypeScript
✅ Factory.ai styles copied to `src/styles/factory.css`
✅ Fonts copied to `public/fonts/`
✅ Design tokens converted to CSS variables in `src/index.css`
✅ Tailwind configured with Factory.ai color palette
✅ Build successful (no errors)
✅ Test page created demonstrating design system

## Next Steps

Now you can:
1. Use Factory.ai design tokens via CSS variables or Tailwind classes
2. Build portfolio components using the established design system
3. Reference `src/styles/factory.css` for additional Factory.ai specific utilities
4. Use Geist and Geist Mono fonts throughout the application
