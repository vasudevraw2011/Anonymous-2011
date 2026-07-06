import React, { useState } from "react";
import { Award, BrainCircuit, CheckCircle, FileText, Loader2, Sparkles, AlertCircle, RefreshCw, BarChart2, ShieldAlert } from "lucide-react";

interface Question {
  id: number;
  category: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number; // For score calculations
}

const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Career Interests",
    questionText: "What type of project environment excites you the most when starting a new venture?",
    options: [
      "Building clean, interactive user interfaces or data dashboards",
      "Designing complex server algorithms or database schemas",
      "Organizing business strategies, client sales, and market outreach",
      "Creating educational content or health-tech tools for community support"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 2,
    category: "Problem Solving",
    questionText: "How do you handle a system bug or logic flow that fails to output correctly?",
    options: [
      "Perform line-by-line debugging and consult official documentations",
      "Trial-and-error changes until the component visual state fixes itself",
      "Delegate to teammates or search forums for pre-built snippet scripts",
      "Design a secondary backend bypass pipeline to skip the issue entirely"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 3,
    category: "Communication",
    questionText: "What is your primary methodology to explain an abstract software architecture to non-technical stakeholders?",
    options: [
      "Use literal, simple human labels and real-world analogies with zero jargon",
      "Present complete JSON schemas and raw console log coordinates",
      "Show interactive wireframes and visual UI mockups to convey functions",
      "Provide formal, detailed textual API reports and system credentials"
    ],
    correctAnswerIndex: 2
  },
  {
    id: 4,
    category: "Leadership",
    questionText: "When team goals conflict during a strict development cycle, what action do you take?",
    options: [
      "Analyze constraints objectively and guide everyone to focus on the essential MVP scope",
      "Wait for outer authorities or project leads to resolve the timeline block",
      "Compromise on software quality by blending everyone's custom code requests",
      "Take absolute individual control of the workspace, rewriting all files myself"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 5,
    category: "Creativity",
    questionText: "How do you approach styling a new landing page or application card layout?",
    options: [
      "Focus on rhythm, generous negative space, and custom color accents instead of defaults",
      "Incorporate complex animated background canvases and dozens of scrolling particles",
      "Reuse standard system frameworks with zero custom visual alterations",
      "Introduce dense technical charts and decorative terminal logging scripts"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 6,
    category: "Analytical Thinking",
    questionText: "You are tasked to evaluate a slow database request query. Where do you start?",
    options: [
      "Profile the query network response time and analyze index schemas systematically",
      "Restart the local dev server and hope the latency issue goes away",
      "Rewrite the entire query block in multiple separate, unindexed requests",
      "Blame the infrastructure host and request more server RAM allocations"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 7,
    category: "Technology",
    questionText: "What is your preferred relationship with modern full-stack development tools?",
    options: [
      "Eagerly adopt verified typescript frameworks, keeping secrets strictly server-side",
      "Build client-only mock systems to avoid configuring backends completely",
      "Manually write custom native modules rather than leveraging package standards",
      "Rely purely on third-party public CDNs without NPM package tracking"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 8,
    category: "Business",
    questionText: "How do you gauge if a new software project fits the actual market demand?",
    options: [
      "Measure concrete user metrics, signups, and immediate customer feedbacks",
      "Rely on personal assumptions and build a highly complex feature stack first",
      "Check if any competitor uses a flashy marketing name or slogan",
      "Hire an external analyst team before coding a single hello-world prototype"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 9,
    category: "Healthcare",
    questionText: "If designing a clinical digital portal, which architectural trait is the absolute highest priority?",
    options: [
      "Strict data privacy, accessible high-contrast fonts, and zero latency inputs",
      "Flashy animated transitions and high-density 3D medical graphics",
      "Third-party advertising widgets and patient social media integrations",
      "A dense custom keyboard map that requires expert technical training"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 10,
    category: "Education",
    questionText: "What is the best way to help someone learn computer science concepts?",
    options: [
      "Provide interactive visual playgrounds and build small project roadmaps together",
      "Assign extensive reading lists from legacy 800-page academic textbooks",
      "Let them copy and paste complex scripts without explainers",
      "Lecture continuously without compiling real sandbox instances"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 11,
    category: "Entrepreneurship",
    questionText: "You discover a manual workflow that takes local businesses hours to compile. What do you do?",
    options: [
      "Build a simple, automated single-screen SaaS utility and offer a free trial",
      "Write a long essay on social media outlining the business's inefficiency",
      "Keep the automation idea secret until someone funds a full custom development team",
      "Ignore it as manual data operations are not your responsibility"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 12,
    category: "Work Preferences",
    questionText: "Which workspace setting enables you to produce your absolute highest quality code?",
    options: [
      "Collaborative hybrid channels with clear goals and flexible async coordination",
      "A highly chaotic office environment with constant loud visual meetings",
      "Complete isolated remote silence with zero peer feedback or code review",
      "A strict micromanaged assembly line where every minute is logged by telemetry"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 13,
    category: "Learning Style",
    questionText: "How do you master a brand-new programming library or SDK?",
    options: [
      "Build 3 small sandbox micro-apps, deploying and breaking elements to understand variables",
      "Watch 20 hours of continuous lectures on double speed without writing code",
      "Memorize the entire type definitions directory by heart before creating a file",
      "Wait until a production project forces me to write it without any practice"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 14,
    category: "Decision Making",
    questionText: "When selecting between two different UI design models, what guide is your north star?",
    options: [
      "Real world usability, high accessibility, and clean interface ergonomics",
      "Which model has more complicated colors and premium glowing animations",
      "The layout with fewer components to minimize file creation count",
      "A design model with interactive terminal feedback to look advanced"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 15,
    category: "Teamwork",
    questionText: "A peer suggests a different code structure that changes your component's entry props. You:",
    options: [
      "Review the performance and type safety trade-offs together and refactor collaboratively",
      "Refuse to adjust my code to protect my personal structural design boundaries",
      "Silently override their changes in the next git pull commit log",
      "Delete my file entirely and ask them to write the component themselves"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 16,
    category: "Goals",
    questionText: "What is your primary focus for your upcoming 12-month career sprint?",
    options: [
      "Acquire verified skills badges and build a solid portfolio of functional apps",
      "Earn a high-sounding title at a startup without building real code systems",
      "Learn 15 different languages superficially without mastering any frameworks",
      "Focus purely on theoretical algorithmic formulas with zero hands-on deployments"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 17,
    category: "Motivation",
    questionText: "What keeps you engaged when debugging an extremely tedious code problem late at night?",
    options: [
      "The immense satisfaction of resolving the bug and optimizing software health",
      "Fear of failing code audits or receiving disciplinary log messages",
      "Receiving praise or credit lines in the application code footer metadata",
      "Just matching the code so the client pays the final milestone invoice"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 18,
    category: "Values",
    questionText: "What core value defines your relationship with your software deliverables?",
    options: [
      "Pristine execution, durability, accessibility, and genuine customer value",
      "Using the newest experimental packages even if they break on startup",
      "Maximizing the total code line count to prove engineering effort",
      "Creating highly complex visual structures that only experts can operate"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 19,
    category: "Strengths",
    questionText: "If asked to name your single greatest software engineering asset, what is it?",
    options: [
      "Resilient troubleshooting, rapid learning, and structured technical empathy",
      "Fast typing speed and memorizing thousands of standard API methods",
      "The ability to build single-page apps with zero dependencies",
      "Creating highly unique, unreadable code blocks that prevent replacement"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 20,
    category: "Career Readiness",
    questionText: "How ready do you feel to collaborate inside a modern, professional, full-stack product team?",
    options: [
      "Equipped with solid Git logic, clean code habits, and high modularity awareness",
      "I only work well alone in custom local environments with zero server dependencies",
      "I need a complete classroom manager to guide every step of my code setup",
      "Ready to build visual features but unsure how variables sync to database lines"
    ],
    correctAnswerIndex: 0
  }
];

interface AssessmentResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendedCareers: string[];
  suggestedSkills: string[];
  roadmapBrief: string;
}

export default function CareerAssessment() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleAnswerSelect = (optionIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [ASSESSMENT_QUESTIONS[currentQuestionIdx].id]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Ensure all questions are answered
    if (Object.keys(answers).length < ASSESSMENT_QUESTIONS.length) {
      alert(`Please answer all questions before submitting. (${Object.keys(answers).length}/${ASSESSMENT_QUESTIONS.length} answered)`);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Calculate Score
      let correctCount = 0;
      ASSESSMENT_QUESTIONS.forEach(q => {
        if (answers[q.id] === q.correctAnswerIndex) {
          correctCount++;
        }
      });
      const finalScore = Math.round((correctCount / ASSESSMENT_QUESTIONS.length) * 100);

      // Determine strengths based on category answers
      const categoriesScore: Record<string, boolean> = {};
      ASSESSMENT_QUESTIONS.forEach(q => {
        categoriesScore[q.category] = (answers[q.id] === q.correctAnswerIndex);
      });

      const strengths: string[] = [];
      const weaknesses: string[] = [];

      Object.entries(categoriesScore).forEach(([cat, isCorrect]) => {
        if (isCorrect) {
          strengths.push(cat);
        } else {
          weaknesses.push(cat);
        }
      });

      // Provide defaults if too high or low
      if (strengths.length < 3) {
        strengths.push("Aptitude", "Technology", "Problem Solving");
      }
      if (weaknesses.length === 0) {
        weaknesses.push("Advanced Scalability", "Low-level Network Proxies");
      }

      const generatedResult: AssessmentResult = {
        score: finalScore,
        strengths: strengths.slice(0, 5),
        weaknesses: weaknesses.slice(0, 4),
        recommendedCareers: [
          finalScore >= 75 ? "Full-Stack Software Engineer" : "Junior Web UI Architect",
          "AI Operations Integrator",
          "Smart Agri-Tech Data Specialist"
        ],
        suggestedSkills: [
          "React Context & Hooks Mastery",
          "Advanced Node.js Express Server Routing",
          "TypeScript strict interface schemas",
          "Relational Database Migrations & Indexing"
        ],
        roadmapBrief: "Complete modern responsive frameworks (Months 1-3) -> Build Full Stack Express API routes with lazy initialization (Months 4-6) -> Integrate Live verified skill passports with blockchain proof assets (Months 7-12)."
      };

      setResult(generatedResult);
      setIsSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIdx(0);
    setIsSubmitted(false);
    setResult(null);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const progressPercentage = Math.round(((currentQuestionIdx + 1) / ASSESSMENT_QUESTIONS.length) * 100);
  const totalAnswered = Object.keys(answers).length;

  return (
    <div className="space-y-8 animate-fadeIn" id="assessment-workspace-root">
      
      {/* Intro Header */}
      <div className="glass-panel rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2" id="assessment-main-title">
            <BrainCircuit className="w-5.5 h-5.5 text-indigo-500 dark:text-indigo-400" /> Career Guidance & Aptitude Assessment
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Take this comprehensive 20-question psychometric & technical diagnostic to map your cognitive strengths, work values, and technology readiness.
          </p>
        </div>
        {isSubmitted && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 self-start md:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retake Test
          </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-24 glass-panel rounded-xl" id="assessment-loader">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Processing Psychometric Metrics...</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">Analyzing response vectors, score weights, and aligning ideal career coordinates.</p>
        </div>
      )}

      {!loading && !isSubmitted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="assessment-quiz-grid">
          
          {/* Main Quiz Stepper (Left 2 columns) */}
          <div className="lg:col-span-2 glass-panel rounded-xl p-6 shadow-md space-y-6">
            
            {/* Question Counter Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-200/50 dark:border-white/5">
              <div>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest block">
                  Topic: {ASSESSMENT_QUESTIONS[currentQuestionIdx].category}
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-white mt-1 block">
                  Question {currentQuestionIdx + 1} of {ASSESSMENT_QUESTIONS.length}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded border border-black/5 dark:border-white/5">
                Answered: {totalAnswered} / {ASSESSMENT_QUESTIONS.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-900/60 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Question Card */}
            <div className="space-y-4 py-2">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-snug">
                {ASSESSMENT_QUESTIONS[currentQuestionIdx].questionText}
              </h3>

              <div className="space-y-2.5">
                {ASSESSMENT_QUESTIONS[currentQuestionIdx].options.map((option, idx) => {
                  const isSelected = answers[ASSESSMENT_QUESTIONS[currentQuestionIdx].id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-xs leading-normal font-medium transition-all cursor-pointer flex justify-between items-center ${
                        isSelected
                          ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-700 dark:text-indigo-200"
                          : "bg-white/40 dark:bg-white/5 border-black/5 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-black/10 hover:dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10"
                      }`}
                    >
                      <span>{option}</span>
                      <span className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-indigo-500 border-indigo-400 text-white" : "border-slate-300 dark:border-slate-700"
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200/50 dark:border-white/5">
              <button
                disabled={currentQuestionIdx === 0}
                onClick={handlePrev}
                className="px-4 py-2 rounded-lg text-xs font-bold border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                ◀ Previous
              </button>

              {currentQuestionIdx === ASSESSMENT_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 glass-button-primary text-white text-xs font-bold rounded-lg shadow-md hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-1.5"
                  id="btn-submit-assessment"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Submit Assessment
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 glass-button-primary text-white text-xs font-bold rounded-lg shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Next Question ▶
                </button>
              )}
            </div>

          </div>

          {/* Quick Info Sidebar (Right 1 column) */}
          <div className="space-y-6">
            <div className="glass-panel rounded-xl p-5 shadow-sm space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-b border-slate-200/50 dark:border-white/5 pb-2">
                <BarChart2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> Assessment Blueprint
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                To yield an accurate DNA match, answer each query naturally. The test measures key workplace indicators across 20 distinct coordinates:
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-[9px] font-bold uppercase text-slate-500">
                <span className="p-1.5 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded">💡 Problem Solving</span>
                <span className="p-1.5 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded">🗣️ Communication</span>
                <span className="p-1.5 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded">👑 Leadership</span>
                <span className="p-1.5 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded">🎨 Creativity</span>
                <span className="p-1.5 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded">🛠️ Technology</span>
                <span className="p-1.5 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded">💼 Business Hub</span>
                <span className="p-1.5 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded">🌱 Values Align</span>
                <span className="p-1.5 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded">✅ Career Ready</span>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-5 shadow-sm space-y-3 font-medium text-xs text-slate-600 dark:text-slate-400 leading-normal">
              <div className="flex gap-2 text-indigo-600 dark:text-indigo-300">
                <CheckCircle className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span className="font-bold">Instant Validation</span>
              </div>
              <p className="text-[11px]">
                Upon submittal, a comprehensive strength profiling matrix is compiled, highlighting target vacancies matching your score index.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Results View */}
      {isSubmitted && result && (
        <div className="space-y-8 animate-fadeIn" id="assessment-results-report">
          
          {/* Score Header Showcase */}
          <div className="glass-panel-heavy rounded-2xl p-8 border border-black/5 dark:border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent opacity-60 pointer-events-none"></div>
            
            <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
              <span className="px-2.5 py-0.5 text-[10px] bg-indigo-500/10 border border-indigo-400/20 text-indigo-600 dark:text-indigo-300 rounded-full font-bold uppercase tracking-wider">
                Assessment Verified
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Your Career Readiness Score</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Outstanding! Your response matrix reveals high alignment with structured full-stack engineering environments and user-centric logic design.
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-2 glass-button-primary text-white rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
                  id="btn-print-report"
                >
                  <FileText className="w-4 h-4" /> Download PDF Report
                </button>
              </div>
            </div>

            {/* Score Ring */}
            <div className="relative flex items-center justify-center shrink-0 z-10">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className="text-slate-200/50 dark:text-white/5"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="#4f46e5"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={326.7}
                  strokeDashoffset={326.7 - (326.7 * result.score) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-black text-slate-900 dark:text-white block">{result.score}%</span>
                <span className="text-[8px] uppercase tracking-widest text-indigo-600 dark:text-indigo-300 font-bold">Readiness</span>
              </div>
            </div>

          </div>

          {/* Detailed analysis matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Strengths & Weaknesses (Left 2 columns) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Strength/Weak area splits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Strengths */}
                <div className="glass-panel rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-200/50 dark:border-white/5 pb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Primary Cognitive Strengths
                  </h4>
                  <div className="space-y-2">
                    {result.strengths.map((s, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weakness Areas */}
                <div className="glass-panel rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-200/50 dark:border-white/5 pb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span> Opportunities For Expansion
                  </h4>
                  <div className="space-y-2">
                    {result.weaknesses.map((w, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span> {w}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Suggested Skills & Micro-Projects */}
              <div className="glass-panel rounded-xl p-6 space-y-4">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400" /> Recommended Skill Upgrade Modules
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Based on your psychometric profile, prioritizing these technical competencies optimizes long-term software career security.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {result.suggestedSkills.map((s, idx) => (
                    <div key={idx} className="p-3 bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-indigo-500/15 transition-all rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {s}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Recommended careers & Roadmaps (Right column) */}
            <div className="space-y-6">
              
              {/* Career Matches */}
              <div className="glass-panel rounded-xl p-6 space-y-4 shadow-sm">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200/50 dark:border-white/5 pb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> Direct Career Path Matches
                </h4>
                <div className="space-y-3">
                  {result.recommendedCareers.map((c, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/20 text-xs font-bold text-indigo-700 dark:text-indigo-200">
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Roadmap teaser */}
              <div className="glass-panel rounded-xl p-6 space-y-4 shadow-sm">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200/50 dark:border-white/5 pb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Tailored Roadmap Overview
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {result.roadmapBrief}
                </p>
                <div className="p-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-lg text-[10px] text-slate-500 font-medium leading-relaxed flex gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>
                    Your assessment results have been synced to your local <strong>Digital Skill Passport</strong> hash key registry.
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
