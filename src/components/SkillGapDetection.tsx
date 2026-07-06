import React, { useState } from "react";
import { CareerProfile, SkillGapResult } from "../types";
import { Award, CheckCircle, Search, Sparkles, Loader2, BookOpen, Hammer, AlertCircle } from "lucide-react";

interface SkillGapDetectionProps {
  profile: CareerProfile;
}

const DEFAULT_GAP_MOCK: SkillGapResult = {
  targetRole: "Junior Full-Stack Web Developer",
  matchScore: 60,
  matchingSkills: ["HTML", "CSS", "Basic JavaScript", "Python Basics"],
  missingSkills: [
    {
      name: "React.js Framework",
      importance: "High",
      suggestedAction: "Complete a component-driven dashboard project and deploy to build hands-on skills."
    },
    {
      name: "REST APIs & Express Backends",
      importance: "High",
      suggestedAction: "Build server-side routing endpoints to proxy database connections securely."
    },
    {
      name: "TypeScript Integration",
      importance: "Medium",
      suggestedAction: "Refactor standard JavaScript variables and schemas with strict interface definitions."
    }
  ],
  suggestedCourses: [
    {
      title: "React Complete Guide & State Management",
      provider: "Udemy / FreeCodeCamp",
      duration: "4 Weeks"
    },
    {
      title: "Backend Development with Node, Express & SQL/Firestore",
      provider: "Coursera / free tutorials",
      duration: "6 Weeks"
    }
  ],
  recommendedProjects: [
    {
      title: "Responsive Career Portal Portfolio",
      description: "Build a multi-component interactive profile system featuring direct user state inputs, local storage syncing, and responsive cards.",
      difficulty: "Intermediate"
    },
    {
      title: "API Proxy Node Server",
      description: "Code a custom server-side Node.js environment routing endpoints, parsing request JSONs, and shielding sensitive secrets.",
      difficulty: "Intermediate"
    }
  ]
};

export default function SkillGapDetection({ profile }: SkillGapDetectionProps) {
  const [targetRole, setTargetRole] = useState(profile.targetRole || "Junior Full-Stack Web Developer");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkillGapResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkSkillGap = async (useDemo = false) => {
    setLoading(true);
    setError(null);

    if (useDemo) {
      setTimeout(() => {
        setResult(DEFAULT_GAP_MOCK);
        setLoading(false);
      }, 700);
      return;
    }

    try {
      const response = await fetch("/api/skill-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentSkills: profile.skills.join(", "),
          targetRole: targetRole,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to contact skill gap detection backend.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to analyze skills gap.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="skill-gap-root">
      
      {/* Search Header Config */}
      <div className="glass-panel rounded-xl p-6 shadow-sm">
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white flex items-center gap-2" id="skill-gap-title">
              <Award className="w-5.5 h-5.5 text-indigo-400" /> Live Skill Gap Scanner
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Measure your existing skills tags against actual vacancies. See your readiness index, discover missing competencies, and receive hyper-targeted micro-project directives.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="Type target job role to cross-match skills... (e.g., Junior Web Developer)"
                className="w-full glass-input rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none font-medium transition-all"
                id="input-gap-target"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => checkSkillGap(false)}
                className="px-4 py-2 glass-button-primary text-white rounded-lg text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                id="btn-scan-gap"
              >
                <Sparkles className="w-3.5 h-3.5" /> Scan Skill Gap
              </button>
              <button
                onClick={() => checkSkillGap(true)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-bold cursor-pointer border border-white/5 hover:border-white/10 transition-all whitespace-nowrap"
                id="btn-scan-gap-demo"
              >
                Mock Match Scan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 backdrop-blur-md rounded-xl border border-white/5" id="skill-gap-loading">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-sm font-bold text-slate-200">Cross-Referencing Skill Matrices...</p>
          <p className="text-xs text-slate-500 mt-1 font-medium">Comparing user's skill tags with real-world enterprise databases.</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-6 text-slate-300 space-y-4" id="skill-gap-error">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-rose-400">Skill Matcher Error</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">{error}</p>
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <span className="font-medium text-slate-300">
              Simulate skill matching using your custom profile metrics against a Junior Full-Stack Developer benchmark.
            </span>
            <button
              onClick={() => checkSkillGap(true)}
              className="px-3.5 py-1.5 glass-button-primary text-white rounded-md text-xs font-bold shrink-0 cursor-pointer"
            >
              Run Full-Stack Gap Simulation
            </button>
          </div>
        </div>
      )}

      {/* Results view */}
      {result && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn" id="skill-gap-result">
          
          {/* Main findings (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Top Score Dashboard */}
            <div className="glass-panel rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
              
              {/* Circular gauge */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#4f46e5"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * result.matchScore) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-xl font-black text-white">{result.matchScore}%</span>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold">Ready</span>
                </div>
              </div>

              {/* Match description */}
              <div className="space-y-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-white">Target Job Readiness Matrix</h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  You share <strong>{result.matchingSkills.length} matching skills</strong> with the industry profile for <strong>{result.targetRole}</strong>. Discover what gaps remain and how to resolve them.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2 justify-center md:justify-start">
                  {result.matchingSkills.map((skill, index) => (
                    <span key={index} className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm">
                      <CheckCircle className="w-3 h-3 text-emerald-400" /> {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Missing skills gap card */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Identified Competency Gaps</h3>
              <div className="space-y-3">
                {result.missingSkills.map((skill, index) => (
                  <div key={index} className="glass-card p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-200">{skill.name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          skill.importance === "High" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {skill.importance} Priority
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">{skill.suggestedAction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right column (Recommended programs and Projects) */}
          <div className="space-y-6">
            
            {/* Suggested courses */}
            <div className="glass-panel rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-white/5 pb-2">
                <BookOpen className="w-4 h-4 text-indigo-400" /> Recommended Sprints
              </h3>
              <div className="space-y-4 font-medium">
                {result.suggestedCourses.map((course, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-200 leading-tight">{course.title}</h4>
                    <div className="flex justify-between text-[10px] text-slate-450 font-bold">
                      <span>{course.provider}</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Targeted projects */}
            <div className="glass-panel rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-white/5 pb-2">
                <Hammer className="w-4 h-4 text-indigo-400" /> Portfolio Capstones
              </h3>
              <div className="space-y-4 font-medium">
                {result.recommendedProjects.map((proj, index) => (
                  <div key={index} className="space-y-1.5 p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-200">{proj.title}</h4>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-slate-900/60 text-slate-400 border border-white/5">
                        {proj.difficulty}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal font-medium">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Empty State */}
      {!result && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 backdrop-blur-md rounded-xl border border-white/5 text-center px-4">
          <Award className="w-12 h-12 text-slate-600 mb-3" />
          <p className="text-sm font-bold text-slate-300">Awaiting Target Selection</p>
          <p className="text-xs text-slate-500 max-w-sm mt-1 font-medium leading-relaxed">
            Analyze your skills against any role to calculate a live match percentage and reveal missing credentials.
          </p>
          <button
            onClick={() => checkSkillGap(false)}
            className="mt-4 px-4 py-2 glass-button-primary text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Scan Gaps
          </button>
        </div>
      )}
    </div>
  );
}
