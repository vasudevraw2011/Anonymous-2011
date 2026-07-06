import { HeatMapNode, PassportCredential } from "./types";

export const MOCK_HEAT_MAP: HeatMapNode[] = [
  {
    id: "sf",
    cityName: "San Francisco / Silicon Valley",
    coordinates: { x: 15, y: 35 },
    highDemandSkills: ["LLM Fine-Tuning", "PyTorch", "Rust", "Distributed Systems"],
    salaryTrend: "$145,000 - $210,000",
    industryGrowth: "+24% YoY",
    remoteOpenings: 1420,
    overallRating: 5
  },
  {
    id: "blr",
    cityName: "Bangalore (Silicon Valley of India)",
    coordinates: { x: 68, y: 55 },
    highDemandSkills: ["GenAI APIs", "React", "Cloud Architecture", "Kubernetes"],
    salaryTrend: "₹1,800,000 - ₹4,200,000",
    industryGrowth: "+19% YoY",
    remoteOpenings: 3100,
    overallRating: 4.8
  },
  {
    id: "ldn",
    cityName: "London, UK",
    coordinates: { x: 48, y: 25 },
    highDemandSkills: ["FinTech Infrastructure", "Data Engineering", "TypeScript", "Python"],
    salaryTrend: "£75,000 - £125,000",
    industryGrowth: "+12% YoY",
    remoteOpenings: 850,
    overallRating: 4.5
  },
  {
    id: "tky",
    cityName: "Tokyo, Japan",
    coordinates: { x: 85, y: 40 },
    highDemandSkills: ["Robotics Automation", "IoT", "Computer Vision", "C++"],
    salaryTrend: "¥7,500,000 - ¥13,000,000",
    industryGrowth: "+8% YoY",
    remoteOpenings: 430,
    overallRating: 4.2
  },
  {
    id: "syd",
    cityName: "Sydney, Australia",
    coordinates: { x: 90, y: 82 },
    highDemandSkills: ["DevOps", "Cybersecurity", "React", "Node.js"],
    salaryTrend: "A$110,000 - A$165,000",
    industryGrowth: "+14% YoY",
    remoteOpenings: 620,
    overallRating: 4.4
  },
  {
    id: "ber",
    cityName: "Berlin, Germany",
    coordinates: { x: 52, y: 28 },
    highDemandSkills: ["Solidity", "Go", "Docker", "SaaS Growth Marketing"],
    salaryTrend: "€65,000 - €95,000",
    industryGrowth: "+15% YoY",
    remoteOpenings: 910,
    overallRating: 4.6
  }
];

export const RURAL_GOVT_SCHEMES = [
  {
    id: "pmkvy",
    title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    region: "India (National)",
    benefits: "Free skill training, financial reward on certification, placements assistance, and soft-skills mentoring in rural centers.",
    eligibility: "Any unemployed youth or school/college dropout.",
    howToApply: "Visit any nearest Pradhan Mantri Kaushal Kendra (PMKK) or register online through official portal."
  },
  {
    id: "ddugky",
    title: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
    region: "India (Rural Districts)",
    benefits: "Full boarding & lodging training for rural youth, guaranteed placement in reputed organizations, post-placement support.",
    eligibility: "Rural poor youth aged between 15 and 35 years.",
    howToApply: "Contact Gram Panchayat leaders or check nearest block-level mobilization camps."
  },
  {
    id: "rural-broadband",
    title: "BharatNet & Rural Digital Literacy Scheme",
    region: "Rural Communities",
    benefits: "High-speed broadband access in Gram Panchayats and free digital literacy training to access global job markets.",
    eligibility: "Rural citizens wanting to transition to remote/digital work.",
    howToApply: "Register at local Common Service Center (CSC)."
  }
];

export const MOCK_PASSPORT_INITIAL: PassportCredential[] = [
  {
    id: "p1",
    title: "Full-Stack Web Development Foundation",
    issuer: "State Vocational Academy",
    date: "2026-03-12",
    type: "certification",
    status: "verified",
    verificationHash: "sha256-a1c890e1f77d33b8a6d71b806d20914fe6b2de0119b33a558fd33230a1132e03"
  },
  {
    id: "p2",
    title: "Agri-Tech Smart Crop Monitor",
    issuer: "Hackathon - Rural Innovation Hub",
    date: "2026-05-18",
    type: "project",
    status: "verified",
    verificationHash: "sha256-f58d91c10d32e5b889fa6e541dfa90234bdde01a89c3cfdf32910fa889f029a1"
  },
  {
    id: "p3",
    title: "Introduction to Generative AI Concepts",
    issuer: "Google Cloud Skills Boost",
    date: "2026-06-25",
    type: "certification",
    status: "verified",
    verificationHash: "sha256-74ab382c49fe0567e91d8e6fa39f375089201f3db98cbfa1e763ef8092a10123"
  }
];

export const DEFAULT_USER_PROFILE = {
  name: "Amit Patel",
  education: "Diploma in Information Technology (Rural Polytechnic)",
  experience: "Designed a local community smart agriculture tracking system using basic web tools.",
  skills: ["HTML", "CSS", "Basic JavaScript", "Python Basics", "Manual Data Entry"],
  interests: "Smart technology, farm automation, software development, customer support.",
  personality: "Analytical, hardworking, prefers structured workflows, high empathy.",
  learningStyle: "Visual & Hands-on projects (builds tools to learn).",
  values: "Job stability, local impact, helping family, community empowerment.",
  aptitude: "Problem solving, logical troubleshooting, patience.",
  targetRole: "Junior Full-Stack Web Developer"
};

export const MOCK_DNA_MOCK: any = {
  recommendedCareers: [
    {
      title: "Agri-Tech Solutions Developer",
      matchPercentage: 96,
      whyItMatches: "Perfect bridge between your IT skills, smart farming interest, and strong problem-solving aptitude to support rural ecosystems.",
      demandLevel: "Very High",
      averageSalary: "$70,000 - $95,000 (Global) / ₹8L - ₹15L (India)",
      keySkillsNeeded: ["IoT Integrations", "Python", "Data Visualizations", "React Basics"]
    },
    {
      title: "Junior Web Developer",
      matchPercentage: 92,
      whyItMatches: "Aligns with your HTML, CSS, and basic Javascript foundation. Matches your structured learning preference.",
      demandLevel: "High",
      averageSalary: "$60,000 - $80,000 (Global) / ₹5L - ₹9L (India)",
      keySkillsNeeded: ["React", "TypeScript", "REST APIs", "Git & GitHub"]
    },
    {
      title: "Technical Customer Operations Specialist",
      matchPercentage: 88,
      whyItMatches: "Leverages your high empathy, patience, and logical troubleshooting aptitude to support users of complex software solutions.",
      demandLevel: "Medium",
      averageSalary: "$55,000 - $70,000",
      keySkillsNeeded: ["Troubleshooting", "SQL basics", "Customer Communication", "API testing"]
    }
  ],
  emergingCareers: [
    {
      title: "AI Automation Specialist for Small Businesses",
      marketGrowth: "+45% over 5 years",
      description: "Setting up low-code/no-code AI pipelines, voice agents, and customer assistants for local trades, matching your desire for local impact."
    },
    {
      title: "Smart Farm Data Integrator",
      marketGrowth: "+38% over 5 years",
      description: "Configuring sensor networks, weather forecasts, and crop-yield forecasting interfaces to help farmers double productivity."
    }
  ],
  personalitySummary: "The Practical Architect: You thrive on taking concrete challenges in your environment and crafting structured, tech-enabled answers. Your natural diligence, coupled with hands-on focus, enables you to master backend systems and local implementations.",
  learningStyleAdvice: "Focus 80% of your time on building micro-applications first, then learn the theory. Use standard boilerplate codes and adapt them step-by-step. Avoid tutorial purgatory by deploying your small code experiments instantly to the cloud."
};

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    appTitle: "Career DNA Web",
    tagline: "One Platform. One Career Journey. Lifetime Growth.",
    dnaAnalysis: "AI Career DNA Analysis",
    roadmap: "Career Roadmap Generator",
    skillGap: "Live Skill Gap Detection",
    resumeBuilder: "AI Resume & Portfolio Builder",
    heatMap: "Employment Heat Map",
    employerDashboard: "Employer AI Dashboard",
    skillPassport: "Verified Skill Passport",
    careerMentor: "AI Career Mentor",
    ruralSupport: "Rural Employment Support",
    opportunityMatch: "Opportunity Matching"
  },
  hi: {
    appTitle: "करियर डीएनए वेब",
    tagline: "एक मंच। एक करियर यात्रा। आजीवन विकास।",
    dnaAnalysis: "एआई करियर डीएनए विश्लेषण",
    roadmap: "करियर रोडमैप जनरेटर",
    skillGap: "लाइव कौशल अंतराल जांच",
    resumeBuilder: "एआई रेज़्यूमे और पोर्टफोलियो निर्माता",
    heatMap: "रोजगार हीट मैप",
    employerDashboard: "नियोक्ता एआई डैशबोर्ड",
    skillPassport: "सत्यापित कौशल पासपोर्ट",
    careerMentor: "एआई करियर मेंटर",
    ruralSupport: "ग्रामीण रोजगार सहायता",
    opportunityMatch: "अवसर मिलान"
  },
  ta: {
    appTitle: "கேரியர் டிஎன்ஏ வெப்",
    tagline: "ஒரு தளம். ஒரு தொழில் பயணம். வாழ்நாள் வளர்ச்சி.",
    dnaAnalysis: "AI தொழில் டிஎன்ஏ பகுப்பாய்வு",
    roadmap: "தொழில் வரைபட ஜெனரேட்டர்",
    skillGap: "நேரடி திறன் இடைவெளி கண்டறிதல்",
    resumeBuilder: "AI ரெஸ்யூம் & போர்ட்ஃபோலியோ பில்டர்",
    heatMap: "வேலைவாய்ப்பு வெப்ப வரைபடம்",
    employerDashboard: "பணியமர்த்துபவர் AI டாஷ்போர்டு",
    skillPassport: "சரிபார்க்கப்பட்ட திறன் பாஸ்போர்ட்",
    careerMentor: "AI தொழில் வழிகாட்டி",
    ruralSupport: "கிராமப்புற வேலைவாய்ப்பு ஆதரவு",
    opportunityMatch: "வாய்ப்பு பொருத்தம்"
  },
  es: {
    appTitle: "Career DNA Web",
    tagline: "Una Plataforma. Un Camino Profesional. Crecimiento de por Vida.",
    dnaAnalysis: "Análisis de ADN Profesional con IA",
    roadmap: "Generador de Mapa de Ruta Profesional",
    skillGap: "Detección de Brecha de Habilidades",
    resumeBuilder: "Creador de Currículum y Portafolio con IA",
    heatMap: "Mapa de Calor de Empleo",
    employerDashboard: "Panel de Empleador con IA",
    skillPassport: "Pasaporte de Habilidades Verificado",
    careerMentor: "Mentor Profesional de IA",
    ruralSupport: "Soporte de Empleo Rural",
    opportunityMatch: "Emparejamiento de Oportunidades"
  }
};
