import React, { useState } from "react";
import { CareerProfile, DNAResult } from "../types";
import { Sparkles, BrainCircuit, TrendingUp, DollarSign, Award, Loader2, AlertCircle } from "lucide-react";
import { MOCK_DNA_MOCK } from "../data";

interface CareerDNAProps {
  profile: CareerProfile;
}

export default function CareerDNA({ profile }: CareerDNAProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DNAResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  const performAnalysis = async (useDemo: boolean = false) => {
    setLoading(true);
    setError(null);
    setIsDemo(useDemo);

    if (useDemo) {
      // Simulate network request
      setTimeout(() => {
        setResult(MOCK_DNA_MOCK);
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch("/api/dna-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interests: profile.interests,
          personality: profile.personality,
          skills: profile.skills.join(", "),
          learningStyle: profile.learningStyle,
          values: profile.values,
          aptitude: profile.aptitude,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to contact Gemini API on server.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not complete analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="career-dna-root">
      {/* Introduction Card */}
      <div className="glass-panel rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2" id="dna-section-title">
              <BrainCircuit className="w-5.5 h-5.5 text-indigo-500 dark:text-indigo-400 animate-pulse" /> AI Career DNA Decoder
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Our advanced skill ontology engines cross-map your Personality, Interests, Learning Styles, and Aptitude with market metrics to discover your perfect career matches.
            </p>
          </div>
          <div>
            {!loading && (
              <div className="flex gap-2">
                <button
                  onClick={() => performAnalysis(false)}
                  className="px-4 py-2 glass-button-primary text-white rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1.5"
                  id="btn-run-dna"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Analyze Profile
                </button>
                <button
                  onClick={() => performAnalysis(true)}
                  className="px-4 py-2 glass-button-secondary text-slate-800 dark:text-slate-300 rounded-lg text-xs font-bold cursor-pointer"
                  id="btn-run-dna-demo"
                >
                  Simulate Demo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile parameters summarized */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 p-4 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-lg border border-black/5 dark:border-white/5">
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Aptitude</span>
            <span className="text-xs text-slate-800 dark:text-slate-300 font-bold line-clamp-1">{profile.aptitude || "Default"}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Personality</span>
            <span className="text-xs text-slate-800 dark:text-slate-300 font-bold line-clamp-1">{profile.personality || "Default"}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Interests</span>
            <span className="text-xs text-slate-800 dark:text-slate-300 font-bold line-clamp-1">{profile.interests || "Default"}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Learning Style</span>
            <span className="text-xs text-indigo-600 dark:text-indigo-300 font-bold line-clamp-1">{profile.learningStyle}</span>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 glass-panel rounded-xl" id="dna-loading-box">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Decoding Career DNA...</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm text-center font-medium">
            Querying server and analyzing skill ontology data graphs against current industry growth sectors. This takes around 5-10 seconds.
          </p>
        </div>
      )}

      {/* Error State with Graceful Demo Redirection */}
      {error && !loading && (
        <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-md rounded-xl p-6 text-slate-300 space-y-4" id="dna-error-box">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-400">Gemini Key or Network Issue</p>
              <p className="text-xs text-slate-400 mt-1">
                {error}
              </p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/5 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <span>
              <strong>No worries!</strong> You can run the Career DNA assessment in **Simulated Demo Mode** to preview the layout, metrics, and visualization indicators.
            </span>
            <button
              onClick={() => performAnalysis(true)}
              className="px-3.5 py-1.5 glass-button-primary text-white rounded-md text-xs font-bold shrink-0 cursor-pointer"
            >
              Launch Simulated DNA Demo
            </button>
          </div>
        </div>
      )}

      {/* Results Rendering */}
      {result && !loading && (
        <div className="space-y-8 animate-fadeIn" id="dna-results-view">
          
          {/* Top block: Personality archetype banner */}
          <div className="glass-panel-heavy rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 border border-black/5 dark:border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 via-transparent to-transparent opacity-60"></div>
            <div className="md:col-span-2 space-y-2 relative z-10">
              <span className="inline-flex px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 rounded-md border border-indigo-400/20">
                Career Personality Archetype
              </span>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">{result.personalitySummary.split(":")[0] || "The Specialist"}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {result.personalitySummary.includes(":") ? result.personalitySummary.split(":").slice(1).join(":") : result.personalitySummary}
              </p>
            </div>
            <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-black/5 dark:border-white/5 flex flex-col justify-between relative z-10">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Speed-Learning Advice</span>
              <p className="text-xs text-indigo-700 dark:text-indigo-200 leading-relaxed mt-2 italic font-medium">
                "{result.learningStyleAdvice}"
              </p>
            </div>
          </div>

          {/* Recommended Careers */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Optimal Career Path Matches
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.recommendedCareers.map((career, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-tight">{career.title}</h4>
                      <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {career.matchPercentage}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {career.whyItMatches}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-black/5 dark:border-white/5 mt-4">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-500 dark:text-slate-400">Market Demand</span>
                      <span className={`font-bold ${
                        career.demandLevel === "Very High" ? "text-rose-600 dark:text-rose-400" :
                        career.demandLevel === "High" ? "text-amber-600 dark:text-amber-400" : "text-sky-600 dark:text-sky-400"
                      }`}>
                        {career.demandLevel}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-500 dark:text-slate-400">Est. Compensation</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold flex items-center"><DollarSign className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />{career.averageSalary}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Required Skills Needed</span>
                      <div className="flex flex-wrap gap-1">
                        {career.keySkillsNeeded.map((skill, sIdx) => (
                          <span key={sIdx} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-950/60 border border-black/5 dark:border-white/5 text-indigo-700 dark:text-indigo-300 font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emerging Careers Trend */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-sky-500 dark:text-sky-400" /> Emerging & Automated-Immune Roles
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.emergingCareers.map((career, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-xl p-5"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{career.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                      {career.marketGrowth} Growth
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {career.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlight prompt for demonstration */}
          {isDemo && (
            <div className="text-center text-xs text-slate-500 py-2 border-t border-white/5">
              Currently viewing pre-loaded Career DNA. Enter real variables on the home dashboard to test active AI integrations!
            </div>
          )}

        </div>
      )}

      {/* Empty State before running */}
      {!result && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-16 glass-panel rounded-xl text-center px-4">
          <BrainCircuit className="w-12 h-12 text-slate-400 dark:text-slate-600 mb-3 animate-pulse" />
          <p className="text-sm font-bold text-slate-800 dark:text-slate-300">Profile Awaiting Decoder</p>
          <p className="text-xs text-slate-500 max-w-sm mt-1 font-medium">
            Fill out your interests, personality, and career aspirations, then click "Analyze Profile" to initiate full AI DNA extraction.
          </p>
          <button
            onClick={() => performAnalysis(false)}
            className="mt-4 px-4 py-2 glass-button-primary text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Analyze Now
          </button>
        </div>
      )}
    </div>
  );
}
