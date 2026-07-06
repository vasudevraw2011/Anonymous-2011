export interface CareerProfile {
  name: string;
  education: string;
  experience: string;
  skills: string[];
  interests: string;
  personality: string;
  learningStyle: string;
  values: string;
  aptitude: string;
  targetRole: string;
}

export interface RecommendedCareer {
  title: string;
  matchPercentage: number;
  whyItMatches: string;
  demandLevel: "High" | "Medium" | "Very High";
  averageSalary: string;
  keySkillsNeeded: string[];
}

export interface EmergingCareer {
  title: string;
  marketGrowth: string;
  description: string;
}

export interface DNAResult {
  recommendedCareers: RecommendedCareer[];
  emergingCareers: EmergingCareer[];
  personalitySummary: string;
  learningStyleAdvice: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  timeframe: string;
  recommendedActions: string[];
  verifiedBadges: string[];
}

export interface RoadmapResult {
  targetJob: string;
  estimatedTimeframe: string;
  steps: RoadmapStep[];
  successMetrics: string[];
}

export interface MissingSkill {
  name: string;
  importance: "High" | "Medium";
  suggestedAction: string;
}

export interface SuggestedCourse {
  title: string;
  provider: string;
  duration: string;
}

export interface RecommendedProject {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface SkillGapResult {
  targetRole: string;
  matchScore: number;
  matchingSkills: string[];
  missingSkills: MissingSkill[];
  suggestedCourses: SuggestedCourse[];
  recommendedProjects: RecommendedProject[];
}

export interface InterviewPrepQuestion {
  question: string;
  sampleAnswer: string;
  tip: string;
}

export interface ResumeResult {
  atsResumeMarkdown: string;
  coverLetter: string;
  linkedinSummary: string;
  interviewPrep: InterviewPrepQuestion[];
}

export interface PassportCredential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: "certification" | "project" | "hackathon" | "volunteer";
  status: "verified" | "pending";
  verificationHash: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface HeatMapNode {
  id: string;
  cityName: string;
  coordinates: { x: number; y: number }; // Relative percentage for map plotting
  highDemandSkills: string[];
  salaryTrend: string;
  industryGrowth: string;
  remoteOpenings: number;
  overallRating: number; // 1-5 stars
}
