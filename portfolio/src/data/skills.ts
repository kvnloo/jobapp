export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    name: 'AI & LLMs',
    skills: [
      'claude-code',
      'codex',
      'gemini-cli',
      'cursor',
      'MCP Servers',
      'Context Engineering',
      'SPARC',
      'superclaude',
      'ccpm',
      'claude flow',
      'Multi-Agent Systems',
      'RLHF',
      'DPO',
      'RLAIF',
      'LLM Evaluation',
      'Red-teaming'
    ]
  },
  {
    name: 'DevOps & Infrastructure',
    skills: [
      'AWS',
      'Terraform',
      'Jenkins',
      'Azure',
      'Kubernetes',
      'NixOS',
      'Ubuntu',
      'Arch',
      'Docker',
      'CI/CD',
      'Vault'
    ]
  },
  {
    name: 'Programming Languages',
    skills: [
      'Python',
      'C++',
      'C',
      'Java',
      'Haskell',
      'Swift',
      'JavaScript',
      'TypeScript',
      'Shell',
      'Vim Script'
    ]
  },
  {
    name: 'iOS Development',
    skills: [
      'Xcode',
      'Swift',
      'jazzy-docs',
      'cocoapods',
      'AVFoundation',
      'CoreAudio',
      'AudioToolbox',
      'UIKit',
      'Firebase'
    ]
  },
  {
    name: 'Design & Creative',
    skills: [
      'Photoshop',
      'Figma',
      'GIMP',
      'Sketch',
      'Zeplin',
      'Tailwind CSS',
      'Framer Motion',
      'Three.js'
    ]
  },
  {
    name: 'Web Development',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'WebGL',
      'Vite',
      'Modern CSS'
    ]
  },
  {
    name: 'Data & Analytics',
    skills: [
      'pandas',
      'Tableau',
      'Cognos',
      'PowerBI',
      'NumPy',
      'SciPy',
      'Data Analysis'
    ]
  },
  {
    name: 'Computer Vision & Signal Processing',
    skills: [
      'Computer Vision',
      'EEG Signal Processing',
      'FFT',
      'Real-time Systems',
      'Biomechanics Analysis',
      'Motion Tracking'
    ]
  },
  {
    name: 'IoT & Digital Twins',
    skills: [
      'Eclipse Ditto',
      'Eclipse Hono',
      'MQTT',
      'Digital Twin Architecture',
      'IoT Integration'
    ]
  }
];

// Skill proficiency levels (optional - can be added later)
export interface SkillWithLevel {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

// Top skills for quick reference
export const topSkills = [
  'AI/LLMs',
  'Multi-Agent Systems',
  'Python',
  'TypeScript',
  'React',
  'Swift',
  'AWS',
  'Kubernetes',
  'Computer Vision',
  'Digital Twins'
];
