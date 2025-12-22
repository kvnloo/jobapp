export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  currentRole: { title: string; company: string; description: string };
  links: { github: string; linkedin: string; email: string };
}

export const profile: Profile = {
  name: "Kevin Rajan",
  tagline: "AI Engineer building autonomous systems that solve previously impossible problems",
  bio: "I build production AI systems that achieve measurable results—84.8% SWE-Bench solve rate, 98% documentation coverage, and 60-minute autonomous grass court replacement. My work spans multi-agent orchestration, computer vision, neuroscience-informed engineering, and full-stack development. I specialize in transforming complex technical challenges into elegant, scalable solutions through systematic methodology and rigorous quality standards.",
  currentRole: {
    title: "Founder & CEO",
    company: "zero, LLC",
    description: "Building continuous research systems to synthesize population-level trends for preventative health solutions. Designing AI workflows spanning multiple platforms, implementing OS-level automation for end-to-end product management. Reduced operating costs by 50% through efficient, reproducible development environments across nixos, ubuntu, arch, and k8s."
  },
  links: {
    github: "https://github.com/kvnloo",
    linkedin: "https://linkedin.com/in/kevinsrajan",
    email: "kevin@zero.llc"
  }
};
