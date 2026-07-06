import React, { useState } from "react";
import { CareerProfile, RoadmapResult, RoadmapStep } from "../types";
import { Milestone, Search, Loader2, CheckCircle, ArrowDown, Award, Sparkles, AlertCircle } from "lucide-react";

interface RoadmapGeneratorProps {
  profile: CareerProfile;
}

const DEFAULT_ROADMAP_MOCK: RoadmapResult = {
  targetJob: "Junior Full-Stack Web Developer",
  estimatedTimeframe: "12 - 18 Months",
  steps: [
    {
      id: "step-1",
      title: "Core Web Foundations",
      subtitle: "Semantic HTML, CSS layouts & Git",
      description: "Learn how the web works under the hood. Master CSS positioning, Flexbox, CSS Grid, and responsive design systems. Learn basic command line and git version controls.",
      timeframe: "Months 1 - 3",
      recommendedActions: [
        "Create 5 responsive semantic landing pages",
        "Publish code repositories to GitHub",
        "Build a multi-page local business portfolio"
      ],
      verifiedBadges: ["Git Essentials", "Responsive Layout Master"]
    },
    {
      id: "step-2",
      title: "Interactive Programming Logic",
      subtitle: "Modern JavaScript (ES6+) & DOM manipulation",
      description: "Understand variables, data types, standard arrays, functional array methods (map, filter, reduce), closures, and handling async promises and HTTP API fetches.",
      timeframe: "Months 4 - 6",
      recommendedActions: [
        "Build an interactive weather dashboard with public API",
        "Create a local storage task organizer",
        "Solve 30 fundamental JavaScript code challenges"
      ],
      verifiedBadges: ["JS Algorithms Foundation", "API Integration Badge"]
    },
    {
      id: "step-3",
      title: "Modern UI Libraries",
      subtitle: "React framework, Vite, and State management",
      description: "Develop interactive modular views with React. Understand components, functional props, state, hooks (useState, useEffect, useMemo), and Tailwind CSS for utility styling.",
      timeframe: "Months 7 - 9",
      recommendedActions: [
        "Create a multi-tab workspace dashboard",
        "Integrate Lucide Icons and Tailwind utility stylings",
        "Implement a custom state reducer for local user inputs"
      ],
      verifiedBadges: ["React Core Specialist", "Tailwind UI Designer"]
    },
    {
      id: "step-4",
      title: "Backend & Server Operations",
      subtitle: "Node.js, Express & Database fundamentals",
      description: "Gain full-stack awareness by building backend Express servers, creating restful API routes, parsing requests, and querying databases securely.",
      timeframe: "Months 10 - 12",
      recommendedActions: [
        "Build a full-stack Express REST proxy backend",
        "Implement secure token validation or lazy secret checks",
        "Connect client dashboard requests to server-side endpoints"
      ],
      verifiedBadges: ["Node & Express Engineer", "Data Architecture Foundation"]
    }
  ],
  successMetrics: [
    "Able to configure and deploy a fully functional full-stack app under 2 hours",
    "Verified Portfolio site displaying 3 complex independent projects",
    "Completed technical screen preparation with STAR-method readiness"
  ]
};

export default function RoadmapGenerator({ profile }: RoadmapGeneratorProps) {
  const [targetJob, setTargetJob] = useState(profile.targetRole || "Junior Full-Stack Web Developer");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoadmapResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const handleActionToggle = (actionKey: string) => {
    setCompletedActions(prev => ({
      ...prev,
      [actionKey]: !prev[actionKey]
    }));
  };

  const getProgressPercentage = (step: RoadmapStep) => {
    const total = step.recommendedActions.length;
    if (total === 0) return 0;
    const completed = step.recommendedActions.filter(
      (act, i) => completedActions[`${step.id}-${i}`]
    ).length;
    return Math.round((completed / total) * 100);
  };

  const generateRoadmap = async (useDemo = false) => {
    setLoading(true);
    setError(null);

    if (useDemo) {
      setTimeout(() => {
        setResult(DEFAULT_ROADMAP_MOCK);
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentStage: profile.education,
          targetCareer: targetJob,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to contact roadmap generator backend.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate roadmap.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="roadmap-root">
      {/* Target Config Header */}
      <div className="glass-panel rounded-xl p-6 shadow-sm">
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white flex items-center gap-2" id="roadmap-title">
              <Milestone className="w-5.5 h-5.5 text-indigo-400" /> AI Career Roadmap Compiler
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Map out chronological milestones from your current academic standing to high-level engineering or corporate targets, compiled into verified skill sprints.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={targetJob}
                onChange={(e) => setTargetJob(e.target.value)}
                placeholder="Type your dream career role... (e.g., Senior AI Engineer)"
                className="w-full glass-input rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none font-medium transition-all"
                id="input-roadmap-target"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => generateRoadmap(false)}
                className="px-4 py-2 glass-button-primary text-white rounded-lg text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                id="btn-generate-roadmap"
              >
                <Sparkles className="w-3.5 h-3.5" /> Compile Path
              </button>
              <button
                onClick={() => generateRoadmap(true)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-bold cursor-pointer border border-white/5 hover:border-white/10 transition-all whitespace-nowrap"
                id="btn-generate-roadmap-demo"
              >
                Mock Full Stack Path
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 backdrop-blur-md rounded-xl border border-white/5" id="roadmap-loading">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-sm font-bold text-slate-200">Structuring Career Roadmap...</p>
          <p className="text-xs text-slate-500 mt-1 font-medium">Generating chronological phases, verified badge targets, and tactical milestones.</p>
        </div>
      )}

      {/* Error State with Graceful Demo Redirection */}
      {error && !loading && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-6 text-slate-300 space-y-4" id="roadmap-error">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-rose-400">Roadmap Generator Error</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">{error}</p>
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 font-medium">
            <span>
              You can instantly load the compiled Full-Stack Developer roadmap as a live interactive demo to test the checklist tracker.
            </span>
            <button
              onClick={() => generateRoadmap(true)}
              className="px-3.5 py-1.5 glass-button-primary text-white rounded-md text-xs font-bold shrink-0 cursor-pointer"
            >
              Load Full-Stack Demo Path
            </button>
          </div>
        </div>
      )}

      {/* Results Rendering */}
      {result && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn" id="roadmap-result-view">
          
          {/* Main vertical flow nodes (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Target Destination</span>
                <h3 className="text-lg font-bold text-white">{result.targetJob}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Estimated Duration</span>
                <span className="text-sm text-indigo-400 font-bold">{result.estimatedTimeframe}</span>
              </div>
            </div>

            {/* Steps Vertical Timeline */}
            <div className="relative pl-6 border-l border-white/5 space-y-12 ml-4">
              {result.steps.map((step, idx) => {
                const stepProgress = getProgressPercentage(step);

                return (
                  <div key={step.id} className="relative group">
                    {/* Visual Bullet Connector */}
                    <div className="absolute -left-[31px] top-1 flex items-center justify-center w-6.5 h-6.5 rounded-full bg-slate-950/80 border-2 border-white/5 text-xs font-bold text-slate-400 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-all">
                      {idx + 1}
                    </div>

                    <div className="space-y-4 font-medium">
                      {/* Title Bar */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5">
                        <div>
                          <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-indigo-500/10 text-indigo-400 rounded uppercase tracking-wider mb-1">
                            {step.timeframe}
                          </span>
                          <h4 className="text-base font-bold text-slate-200">{step.title}</h4>
                          <p className="text-xs text-indigo-300 font-bold">{step.subtitle}</p>
                        </div>
                        {/* Progress Badge */}
                        <div className="shrink-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            stepProgress === 100 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            stepProgress > 0 ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-slate-950 text-slate-500 border-white/5"
                          }`}>
                            {stepProgress}% Sprinted
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-450 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                        {step.description}
                      </p>

                      {/* Interactive Actions Checklists */}
                      <div className="space-y-2">
                        <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Chronological Actions Sprints</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {step.recommendedActions.map((action, aIdx) => {
                            const actionKey = `${step.id}-${aIdx}`;
                            const isDone = !!completedActions[actionKey];

                            return (
                              <button
                                key={aIdx}
                                onClick={() => handleActionToggle(actionKey)}
                                className={`text-left p-2.5 rounded-lg border text-xs flex items-start gap-2.5 transition-all cursor-pointer ${
                                  isDone
                                    ? "bg-emerald-500/5 border-emerald-500/20 text-slate-300"
                                    : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:bg-white/10"
                                }`}
                              >
                                <span className={`w-4.5 h-4.5 shrink-0 rounded border flex items-center justify-center transition-colors ${
                                  isDone ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "border-slate-700"
                                }`}>
                                  {isDone && <CheckCircle className="w-3.5 h-3.5" />}
                                </span>
                                <span className="leading-tight">{action}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Expected Badges */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] uppercase font-bold text-slate-550 tracking-wider">Unlocks Badges:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {step.verifiedBadges.map((badge, bIdx) => (
                            <span
                              key={bIdx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950/60 text-emerald-400 border border-emerald-500/25 text-[10px] font-bold"
                            >
                              <Award className="w-3 h-3 text-emerald-400/80" /> {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Arrow down connector for middle steps */}
                    {idx < result.steps.length - 1 && (
                      <div className="absolute left-[3px] -bottom-9 opacity-30 text-slate-600">
                        <ArrowDown className="w-3 h-3 animate-bounce" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Metrics (Right column) */}
          <div className="space-y-6">
            <div className="glass-panel rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-350 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Success Metrics (KPIs)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                To claim verification of your completed roadmap, you should satisfy these key benchmarks:
              </p>
              <ul className="space-y-3 font-medium">
                {result.successMetrics.map((metric, index) => (
                  <li key={index} className="flex gap-2.5 items-start text-xs text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">
                    <span className="text-indigo-400 font-black mt-0.5">•</span>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel rounded-xl p-6 shadow-sm space-y-3 text-xs text-slate-400 leading-relaxed font-medium">
              <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">What is a Verified Skill Sprints Roadmap?</h4>
              <p>
                Each phase corresponds to industry-grade modules. Once you check off the action sprints, you can add projects demonstrating these skills to your <strong>Verified Skill Passport</strong> to unlock employer visibility.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Empty State */}
      {!result && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 backdrop-blur-md rounded-xl border border-white/5 text-center px-4">
          <Milestone className="w-12 h-12 text-slate-600 mb-3" />
          <p className="text-sm font-bold text-slate-350">No Target Compiled Yet</p>
          <p className="text-xs text-slate-500 max-w-sm mt-1 font-medium leading-relaxed">
            Specify your dream job target (or accept the default based on your profile) and click "Compile Path" to map your learning trajectory.
          </p>
          <button
            onClick={() => generateRoadmap(false)}
            className="mt-4 px-4 py-2 glass-button-primary text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Compile Target Path
          </button>
        </div>
      )}
    </div>
  );
}
