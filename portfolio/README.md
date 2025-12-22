# Kevin Rajan - Portfolio Website

A modern, minimalist portfolio website showcasing AI engineering projects, professional experience, and technical skills.

## Features

- **Responsive Design**: Fully responsive layout optimized for all screen sizes
- **Modern UI**: Clean, professional design inspired by Factory.ai's aesthetic
- **Smooth Animations**: Character reveal animations, scroll effects, and smooth transitions
- **Content Sections**:
  - Hero section with animated name reveal
  - 8 featured projects with filtering by category
  - 7 professional experiences with timeline view
  - Skills organized by technology categories
  - About section with bio and contact links

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom Factory.ai design system
- **Fonts**: Geist and Geist Mono
- **Animations**: Custom CSS animations with Intersection Observer

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
portfolio/
├── src/
│   ├── components/      # React components
│   │   ├── about/      # About section
│   │   ├── experience/ # Experience timeline
│   │   ├── hero/       # Hero section
│   │   ├── layout/     # Header & Footer
│   │   ├── projects/   # Projects grid
│   │   ├── shared/     # Reusable components
│   │   └── skills/     # Skills section
│   ├── data/           # Content data
│   ├── hooks/          # Custom React hooks
│   ├── App.tsx         # Main app component
│   ├── index.css       # Global styles
│   └── main.tsx        # App entry point
├── public/             # Static assets
└── package.json        # Dependencies
```

## Customization

To customize the content:

1. **Profile Information**: Edit `/src/data/profile.ts`
2. **Projects**: Edit `/src/data/projects.ts`
3. **Experience**: Edit `/src/data/experience.ts`
4. **Skills**: Edit `/src/data/skills.ts`

## License

© 2025 Kevin Rajan. All rights reserved.

## Contact

- **GitHub**: [github.com/kvnloo](https://github.com/kvnloo)
- **LinkedIn**: [linkedin.com/in/kevinsrajan](https://linkedin.com/in/kevinsrajan)
- **Email**: kevin@zero.llc
