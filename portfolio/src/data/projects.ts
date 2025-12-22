export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai' | 'mobile' | 'frontend' | 'devops';
  featured: boolean;
  summary: string;
  techStack: string[];
  metrics: { label: string; value: string; highlight?: boolean }[];
  links: { github?: string; live?: string; docs?: string };
}

export const projects: Project[] = [
  {
    id: 'evolve-framework',
    title: 'Evolve Framework',
    subtitle: 'State-of-the-Art Autonomous AI Development',
    category: 'ai',
    featured: true,
    summary: 'Integrated framework combining 54+ specialized AI agents with Byzantine fault tolerance, SPARC methodology, and zero context loss across development sessions. Achieved industry-leading 84.8% SWE-Bench solve rate while reducing costs by 32.3% through intelligent multi-agent coordination.',
    techStack: ['Shell', 'Python', 'JavaScript', 'Multi-Agent Systems', 'Neural Networks', 'JAX', 'GitHub API'],
    metrics: [
      { label: 'SWE-Bench Score', value: '84.8%', highlight: true },
      { label: 'Performance Gain', value: '4.4x faster' },
      { label: 'Cost Reduction', value: '32.3%' },
      { label: 'Context Loss', value: 'Zero' }
    ],
    links: {
      github: 'https://github.com/kvnloo/evolve',
      docs: 'https://github.com/kvnloo/evolve#quick-start'
    }
  },
  {
    id: 'lawntech-dynamics',
    title: 'LawnTech Dynamics (ACE)',
    subtitle: "World's First Autonomous Indoor Grass Court Facility",
    category: 'ai',
    featured: true,
    summary: 'AI-powered indoor sports facility combining computer vision biomechanics tracking (60 FPS), autonomous grass court management with 60-minute replacement cycles, and digital twin architecture. Integrates Google Gemini for real-time coaching insights and Eclipse Ditto/Hono for IoT facility optimization across 68 courts.',
    techStack: ['React 19', 'TypeScript', 'Three.js', 'Google Gemini API', 'Eclipse Ditto', 'Eclipse Hono', 'Computer Vision', 'Framer Motion'],
    metrics: [
      { label: 'Court Replacement', value: '60 minutes', highlight: true },
      { label: 'Biomechanics FPS', value: '60 FPS' },
      { label: 'Serve Speed Analysis', value: '225 km/h' },
      { label: 'Total Courts', value: '68' },
      { label: 'Vertical Farming', value: '2,000 m²' }
    ],
    links: {
      live: 'https://kvnloo.github.io/ace/',
      github: 'https://github.com/kvnloo/ace'
    }
  },
  {
    id: 'flowstate-bci',
    title: 'FlowState BCI',
    subtitle: 'Brain-Computer Interface for Attention-Based Video Control',
    category: 'ai',
    featured: true,
    summary: 'Brain-computer interface controlling video playback speed based on real-time attention measurement through EEG alpha band detection (8-12 Hz). Provides objective biofeedback for focus training by modulating content speed based on actual brain activity with <100ms latency.',
    techStack: ['Python', 'NumPy', 'SciPy', 'FFT', 'EEG Signal Processing', 'Real-time Systems'],
    metrics: [
      { label: 'Processing Latency', value: '<100ms', highlight: true },
      { label: 'Alpha Band', value: '8-12 Hz' },
      { label: 'Playback Range', value: '0.5x - 1.5x' }
    ],
    links: {
      github: 'https://github.com/kvnloo/FlowState',
      docs: 'https://kvnloo.github.io/FlowState/'
    }
  },
  {
    id: 'monument',
    title: 'Monument',
    subtitle: 'Visual AI Design Showcase & Component Library',
    category: 'ai',
    featured: false,
    summary: 'Curated collection of pixel-perfect UI components demonstrating AI-assisted design-to-code workflows. Showcases multiple aesthetic approaches (brutalist, glassmorphism, modern dark mode) with production-ready, accessible implementations.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'AI-Assisted Design'],
    metrics: [
      { label: 'Design Fidelity', value: 'Pixel-perfect', highlight: true },
      { label: 'Accessibility', value: 'WCAG Compliant' },
      { label: 'Design Systems', value: 'Multiple' }
    ],
    links: {
      github: 'https://github.com/kvnloo/monument',
      live: 'https://kvnloo.github.io/monument/'
    }
  },
  {
    id: 'audio-engine',
    title: 'AudioEngine',
    subtitle: 'Production-Quality iOS Audio Processing Application',
    category: 'mobile',
    featured: true,
    summary: 'iOS application implementing real-time noise meter and 14-band dual-channel equalizer with Firebase cloud synchronization. Achieved industry-exceptional 98% documentation coverage (typical: ~20%) across 2,347 lines of Swift code spanning 25 files.',
    techStack: ['Swift', 'AVFoundation', 'CoreAudio', 'AudioToolbox', 'Firebase', 'Jazzy', 'CocoaPods'],
    metrics: [
      { label: 'Documentation Coverage', value: '98.0%', highlight: true },
      { label: 'Lines of Code', value: '2,347' },
      { label: 'File Count', value: '25 files' },
      { label: 'EQ Bands', value: '14-band dual-channel' }
    ],
    links: {
      github: 'https://github.com/kvnloo/AudioEngine',
      docs: 'https://kvnloo.github.io/AudioEngine/'
    }
  },
  {
    id: 'hackillinois',
    title: 'HackIllinois 2017',
    subtitle: 'Consumer Mobile App for 500+ Hackathon Attendees',
    category: 'mobile',
    featured: false,
    summary: 'Complete iOS conference application serving as primary mobile interface for 500+ attendees at premier collegiate hackathon. Foundation project demonstrating real-time event management, networking features, and deadline-driven production deployment.',
    techStack: ['Swift', 'Objective-C', 'iOS SDK', 'UIKit'],
    metrics: [
      { label: 'Active Users', value: '500+' },
      { label: 'Push Notifications', value: 'Real-time' },
      { label: 'Event Type', value: 'Production' }
    ],
    links: {
      github: 'https://github.com/HackIllinois/iOS',
      live: 'https://www.behance.net/gallery/56050265/HackIllinois-2017-iOS-Application'
    }
  },
  {
    id: 'pixel-perfect-ui',
    title: 'Pixel-Perfect UI Implementation',
    subtitle: 'Production-Quality Frontend Development',
    category: 'frontend',
    featured: false,
    summary: 'Production-ready UI implementations across diverse design systems achieving pixel-perfect accuracy through systematic AI-assisted workflows. Demonstrates 945+ lines of production code with <1% variance from design inspiration, implementing responsive layouts and WCAG AA accessibility standards.',
    techStack: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'Lucide Icons', 'Modern CSS'],
    metrics: [
      { label: 'Design Variance', value: '<1%', highlight: true },
      { label: 'Lines of Code', value: '945+' },
      { label: 'Design Systems', value: '3' },
      { label: 'Accessibility', value: 'WCAG AA' }
    ],
    links: {
      github: 'https://github.com/kvnloo/aliens-made-this'
    }
  },
  {
    id: 'dotfiles',
    title: 'Dotfiles Configuration',
    subtitle: 'Development Environment Automation',
    category: 'devops',
    featured: false,
    summary: 'Comprehensive dotfiles repository containing configuration files and automation scripts for reproducible development environments. Community-validated through 3 GitHub stars, demonstrating Infrastructure as Code principles and cross-platform compatibility.',
    techStack: ['Vim Script', 'Bash', 'Zsh', 'Git', 'Automation Scripts'],
    metrics: [
      { label: 'GitHub Stars', value: '3' },
      { label: 'Platforms', value: 'Cross-platform' },
      { label: 'Configuration', value: 'Comprehensive' }
    ],
    links: {
      github: 'https://github.com/kvnloo/.files'
    }
  }
];

// Featured projects for quick access
export const featuredProjects = projects.filter(p => p.featured);

// Projects by category
export const projectsByCategory = {
  ai: projects.filter(p => p.category === 'ai'),
  mobile: projects.filter(p => p.category === 'mobile'),
  frontend: projects.filter(p => p.category === 'frontend'),
  devops: projects.filter(p => p.category === 'devops')
};
