import React from 'react';
import { ResumeData } from './types';

export const resumeData: ResumeData = {
  name: "Sajjad Kashani",
  contact: {
    email: "",
    phone: "",
    location: "",
  },
  technicalSkills: [
    {
      title: "Languages",
      skills: ["C", "C++", "Python", "Java", "JavaScript", "R", "Assembly", "Bash"]
    },
    {
      title: "Web Technologies",
      skills: ["HTML/CSS", "Python Flask", "API Communication"]
    },
    {
      title: "Systems & Embedded",
      skills: ["Linux", "RTOS", "ARM", "Virtual Machines", "Multi-threaded Programming"]
    },
    {
      title: "DevOps & Tools",
      skills: ["Git", "CMake", "Jenkins", "CI/CD Pipelines", "Docker", "Atlassian"]
    },
    {
      title: "Testing & Quality Assurance",
      skills: ["Unit Testing", "Static & Dynamic Analysis", "Sanitizer"]
    },
    {
      title: "Software Engineering Concepts",
      skills: ["Object-Oriented Programming", "Optimization"]
    },
    {
      title: "Scientific Computing",
      skills: ["MATLAB", "Simulation"]
    }
  ],
  education: [
    {
      id: "edu-uvic",
      institution: "University of Victoria",
      degree: "Bachelor of Science, Computer Science and Physics",
      duration: "September 2019 - May 2025",
    },
  ],
  technicalExperience: [
    {
      id: "exp-vispa",
      company: "Victoria Subatomic Physics Research Centre",
      companyURL: "https://www.uvic.ca/science/physics/vispa/index.php",
      location: "Victoria, BC",
      role: "Research Assistant",
      duration: "April 2025 - Present",
      description: [
        "Leading the computational design and optimization of a C-shaped electromagnet for 1D magnetic field penetration testing in superconducting materials, aiming for minimal stray fields.",
        "Employing FEMM via the PyFEMM Python interface to optimize the 2D magnet geometry, then importing the resulting design into COMSOL Multiphysics for full 3D simulation in Ubuntu Linux.",
        "Applying simulated annealing algorithm to fine-tune the geometry of the magnet yoke and pole faces, reducing stray fields by over 50% from previous designs.",
      ],
    },
     {
      id: "exp-amo",
      company: "University of Victoria AMO Lab",
      companyURL: "https://web.uvic.ca/~macrae/",
      location: "Victoria, BC",
      role: "Research Support Staff",
      duration: "May 2023 – August 2023",
      description: [
        "Designed and soldered PCBs, supporting the construction of a scanning Fabry-Perot Interferometer.",
        "Hands-on experience with lasers, optics, detectors, and other photonics-related equipment.",
        "Applied physics and computer science to solve interdisciplinary photonics challenges."
      ]
    },
    {
      id: "exp-reliable",
      company: "Reliable Controls",
      companyURL: "https://www.reliablecontrols.com/",
      location: "Victoria, BC",
      role: "DevOps Engineer (4-month Co-op)",
      duration: "January 2022 - May 2022",
      description: [
        "Developed and automated build/test pipelines in Linux using Python, Jenkins, Git, CMake and Jira, improving release efficiency and reliability of embedded firmware.",
        "Applied Address, Thread, and Undefined Behavior Sanitizers on complex C++ codebases, detecting and resolving memory leaks, race conditions, and undefined behaviors to strengthen system stability.",
        "Utilized PC-Lint Plus to enforce MISRA, AUTOSAR, and CERT C standards, improving embedded code quality and ensuring compliance with industry best practices.",
        "Conducted dynamic and static analysis of C++ systems in a Linux environment, balancing runtime performance with pre-execution safety checks for high-reliability firmware.",
      ],
    },
    {
      id: "exp-novarc",
      company: "Novarc Technologies",
      companyURL: "https://www.novarctech.com/",
      location: "North Vancouver, BC",
      role: "Software Developer (8-month Co-op)",
      duration: "May 2021 – December 2021",
      description: [
        "Developed a Python script using Hashlib to generate SHA-256 hashes for robot configuration files, integrating with AWS cloud systems to ensure file integrity and support tamper-detection for field-deployed robots.",
        "Designed and implemented a solo web-based HMI application using Python Flask, HTML, CSS, and Jinja2, managing full-stack development from customer requirements to deployment.",
        "Automated build environments by configuring VMs and Clonezilla images for robot IPCs, reducing assembly time while ensuring driver and firewall compatibility.",
        "Authored comprehensive requirement and test plan documents, enabling robust code validation and seamless handoff for future development.",
      ],
    },
  ],
  otherExperience: [
    {
      id: "other-exp-uvic",
      institution: "University of Victoria",
      institutionURL: "https://www.uvic.ca/",
      location: "Victoria, BC",
      role: "Residence Community Leader and Community Assistant",
      duration: "August 2021 – April 2025",
      description: [
        "Won the Team Player and most enjoyable to work with awards amongst colleagues.",
        "Communicated effectively with diverse groups, building trust and resolving conflicts."
      ]
    }
  ],
  publications: [
    {
      id: "pub-qce24",
      details: "S.Kashani, A.Singh, U.Stege. Towards a distributed Quantum Computing Platform for Algorithm Experiments, 5th IEEE International Conference on Quantum Computing and Engineering (QCE24), pp. 620-621, 2024",
      url: "https://ieeexplore.ieee.org/document/10821025"
    }
  ],
  certificates: [
    {
      id: "cert-qai",
      title: "Quantum Software Engineering Bootcamp",
      institution: "Quantum Algorithms Institute",
      description: [
        "Proficient in Python for software development, emphasizing object-oriented programming, modules, testing, and libraries like NumPy and Matplotlib, with expertise in PyCharm, Docker, and Git for streamlined coding and version control."
      ]
    }
  ]
};

export const skillExperienceMapping: Record<string, string[]> = {
    // Languages
    "C": ["edu-uvic"],
    "C++": ["exp-reliable", "edu-uvic"],
    "Python": ["exp-vispa", "exp-reliable", "exp-novarc", "cert-qai"],
    "Java": ["edu-uvic"],
    "JavaScript": ["edu-uvic"],
    "R": ["edu-uvic"],
    "Assembly": ["edu-uvic"],
    "Bash": ["exp-reliable", "edu-uvic"],
    // Web Technologies
    "HTML/CSS": ["exp-novarc"],
    "Python Flask": ["exp-novarc"],
    "API Communication": ["exp-novarc"],
    // Systems & Embedded
    "Linux": ["exp-vispa", "exp-reliable"],
    "RTOS": ["edu-uvic"],
    "ARM": ["edu-uvic"],
    "Virtual Machines": ["exp-novarc"],
    "Multi-threaded Programming": ["exp-reliable"],
    // DevOps & Tools
    "Git": ["exp-reliable", "exp-novarc", "cert-qai", "edu-uvic"],
    "CMake": ["exp-reliable"],
    "Jenkins": ["exp-reliable"],
    "CI/CD Pipelines": ["exp-reliable"],
    "Docker": ["cert-qai"],
    "Atlassian": ["exp-reliable"],
    // Testing & Quality Assurance
    "Unit Testing": ["edu-uvic"],
    "Static & Dynamic Analysis": ["exp-reliable"],
    "Sanitizer": ["exp-reliable"],
    // Software Engineering Concepts
    "Object-Oriented Programming": ["cert-qai", "edu-uvic"],
    "Optimization": ["exp-vispa"],
    // Scientific Computing
    "MATLAB": ["edu-uvic"],
    "Simulation": ["exp-vispa"],
};


// SVG Icons
export const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const PhoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

export const LocationIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export const ClipboardCheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ClipboardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </svg>
);

export const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.423-1.423L13.5 18.75l1.188-.648a2.25 2.25 0 011.423-1.423L16.25 15l.648 1.188a2.25 2.25 0 011.423 1.423L18.5 18.75l-1.188.648a2.25 2.25 0 01-1.423 1.423z" />
  </svg>
);

export const DocumentPlusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
