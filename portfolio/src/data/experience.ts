export interface Experience {
  id: string;
  company: string;
  location?: string;
  role: string;
  period: string;
  description: string[];
  technologies?: string[];
}

export const experience: Experience[] = [
  {
    id: 'zero-llc',
    company: 'zero, LLC',
    role: 'Founder & CEO',
    period: 'Present',
    description: [
      'Build continuous research systems to synthesize population-level trends to formulate preventative health solutions',
      'Conduct technical research to automate software processes while networking with software clients, enabling strategic alignment during discovery to identify pain points and create AI workflows to be included in a statement of work',
      'Prototype OS-level automation for end-to-end product management, enabling LLMs to use internal, application-level APIs, resulting in complex workflows spanning multiple platforms/applications',
      'Design intricate digital twin simulations to prototype AI factories and industrialize entire feedback loops to implement systems-thinking',
      'Implemented efficient, reproducible development environments (nixos, ubuntu, arch, k8s) for on-prem compute by researching best practices, resulting in a reduction of operating costs by 50%'
    ],
    technologies: ['AI/LLMs', 'Digital Twins', 'NixOS', 'Kubernetes', 'Ubuntu', 'Arch', 'Systems Architecture']
  },
  {
    id: 'outlier',
    company: 'Outlier (Scale.ai)',
    role: 'LLM Training Specialist',
    period: '2023 - Present',
    description: [
      'Designed and applied detailed rubrics for LLM evaluation, writing complex logic, math, and physics prompts to elicit reasoning failures and guide model improvement through process-supervision feedback',
      'Performed red-teaming and factchecking across STEM and general-knowledge domains, verifying claims with web sources and explaining weaknesses in model reasoning to refine future outputs',
      'Conducted large-scale preference labeling and comparative ranking of multiple LLMs (RLHF, DPO, RLAIF) while drafting critiques that articulated why certain completions failed rubric standards',
      'Developed multimodal and tool-use evaluations integrating text, image, and retrieval tasks to measure grounding, reliability, and reasoning depth across diverse model architectures'
    ],
    technologies: ['RLHF', 'DPO', 'RLAIF', 'LLM Evaluation', 'Red-teaming', 'Multimodal AI']
  },
  {
    id: 'sabbatical',
    company: 'Sabbatical',
    role: 'Ultralearning',
    period: '2022 - 2023',
    description: [
      'Engineered a holistic performance optimization system to enhance cognitive and motor skills, applying an algorithmic feedback loop (Research → Implement → Analyze → Iterate) to systematically correlate and refine inputs, including sleep, nutrition, and specialized training protocols',
      'Executed a long-term data-driven analysis project to benchmark and optimize rapid skill acquisition; successfully reverse-engineered complex, dynamic systems to identify and eliminate bottlenecks',
      'Culminating in validated performance metrics within the top 1-5% of a 25M+ user environment (Kovaaks, Valorant, Apex)'
    ],
    technologies: ['Data Analysis', 'Systems Optimization', 'Performance Engineering']
  },
  {
    id: 'slalom',
    company: 'Slalom Consulting',
    location: 'Chicago, IL',
    role: 'Senior Consultant',
    period: 'Aug 2018 - 2022',
    description: [
      'Collaborated within a multi-disciplinary team to enhance client (4B+ revenue finance firm) engagement while modernizing technology systems across 12 teams and verticals',
      'Mitigated obstacles for business unit teams using enhanced software processes and workflows, promoting Agile/DevOps/CICD concepts by utilizing AWS, Jenkins, Terraform and Vault',
      'Improved developer impact by creating tailored pipelines that publish biweekly golden Windows and RHEL releases, ultimately ensuring security standards within custom AMIs',
      'Spearheaded the creation of a centralized knowledge base, curating exemplary business documents like SPROs, customer stories, qualifiers, and evaluations across technological and business administrative platforms to enhance company-wide accessibility post-sanitization and lay the groundwork for AI-driven content generation',
      'Championed a comprehensive DevOps training program tailored for over 500 new hires, ensuring a smooth transition into the company\'s technology ecosystem',
      'Designed an engaging onboarding session anchored around point poker, fostering collaboration and hands-on learning',
      'Orchestrated multi-cloud environments to provide an interactive, holistic, real-world experience of the best practices we use with our clients'
    ],
    technologies: ['AWS', 'Jenkins', 'Terraform', 'Vault', 'DevOps', 'CI/CD', 'Multi-cloud']
  },
  {
    id: 'amazon',
    company: 'Amazon',
    location: 'Seattle, WA',
    role: 'Software Engineering Intern (EC2 Fargate)',
    period: 'Summer 2018',
    description: [
      'Increase response time in identifying customer container issues by conceptualizing and integrating pool metrics that allow developers to understand the "state of the world"',
      'Automate modifying customer\'s compute capacity through automatic pool management system that algorithmically detects customer traffic spikes'
    ],
    technologies: ['AWS', 'EC2 Fargate', 'Container Orchestration', 'Python']
  },
  {
    id: 'bcbs',
    company: 'BlueCross BlueShield',
    location: 'Chicago, IL',
    role: 'IT Enterprise Architect Intern',
    period: 'Jun 2018 - Aug 2018',
    description: [
      'Execute individual contributor projects that become inputs and contribute toward HCSC\'s enterprise data strategy',
      'Convert technical data to ideas and concepts that encourage pursuit of strategy or solicit action'
    ],
    technologies: ['Enterprise Architecture', 'Data Strategy', 'Healthcare IT']
  },
  {
    id: 'prenosis',
    company: 'Prenosis Inc.',
    location: 'Champaign, IL',
    role: 'iOS Engineer / UX Engineer',
    period: 'Jul 2017 - Feb 2018',
    description: [
      'Designed an iOS application from scratch that allows physicians to manage various patients\' lab results, vitals, imaging results, and other significant statistics',
      'Integrated a feature called "Prenosis" Number, which acts as a risk stratification value that allows physicians to prioritize the order in which they see the patients',
      'Created a cross-functional feature such that physicians can access patients\' past medical history, prescriptions, and doctor notes, as well as prescribe new medications'
    ],
    technologies: ['iOS', 'Swift', 'UIKit', 'Healthcare', 'UX Design']
  }
];
