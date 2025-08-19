export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  duration: string;
}

export interface Experience {
  id?: string;
  company: string;
  companyURL?: string;
  location: string;
  role: string;
  duration: string;
  description: string[];
}

export interface Publication {
  id?: string;
  details: string;
  url?: string;
}

export interface Certificate {
  id?: string;
  title: string;
  institution: string;
  description: string[];
}

export interface OtherExperience {
  id?: string;
  institution: string;
  institutionURL?: string;
  location: string;
  role: string;
  duration: string;
  description: string[];
}

export interface ResumeData {
  name: string;
  contact: ContactInfo;
  technicalSkills: SkillCategory[];
  education: Education[];
  technicalExperience: Experience[];
  otherExperience: OtherExperience[];
  publications: Publication[];
  certificates: Certificate[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
