export interface UserData {
  id: string;
  email: string;
  name: string;
}

export interface PortfolioData {
  basics: {
    name: string;
    role: string;
    bio: string;
    email: string;
    location: string;
    avatar: string;
    resumeUrl: string;
    socialLinks: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
  skills: {
    languages: string[];
    databases: string[];
    frameworks: string[];
    tools: string[];
  };
  projects: {
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    liveUrl?: string;
    githubUrl?: string;
  }[];
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    duration: string;
    location: string;
  }[];
  selectedTemplate: 'modern' | 'minimal' | 'creative';
}