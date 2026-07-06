import React, { useState } from "react";
import { CareerProfile } from "../types";
import { Search, ShieldCheck, UserCheck, Code, Loader2, Sparkles, Building, Briefcase } from "lucide-react";

interface EmployerDashboardProps {
  profile: CareerProfile;
}

export default function EmployerDashboard({ profile }: EmployerDashboardProps) {
  const [activeTab, setActiveTab] = useState<"browse" | "screen">("browse");
  const [selectedRole, setSelectedRole] = useState("Junior Web Developer");
  const [screeningLogs, setScreeningLogs] = useState<string[]>([]);
  const [screeningState, setScreeningState] = useState<"idle" | "running" | "completed">("idle");

  const runScreeningSimulation = () => {
    setScreeningState("running");
    setScreeningLogs([]);

    const logSteps = [
      "🔄 Initializing AI-assisted screening model for role: " + selectedRole,
      "🔍 Querying global Verified Skill Passport blockchain registry...",
      "✅ Found matching candidate: " + (profile.name || "Amit Patel") + " (ID: DNA-9831-XP)",
      "🔐 Validating cryptographic hashes for 3 registered certificates...",
      "✅ Cryptographic proof: sha256_v2_f58d91c10d32e5b8... verified successfully.",
      "📊 Parsing core skills tags: " + profile.skills.join(", "),
      "🌾 Examining capstone projects: Agri-Tech Smart Crop Monitor tracking interface...",
      "🎯 Mapping personality traits: Empathy, structured troubleshooting, logical patience...",
      "📈 Match rating: 92.5/100 candidate ready index. No skill gaps detected for junior tier.",
      "🎉 Recommendation: HIGHLY QUALIFIED. Invite for interview."
    ];

    let delay = 0;
    logSteps.forEach((step, index) => {
      delay += 800;
      setTimeout(() => {
        setScreeningLogs(prev => [...prev, step]);
        if (index === logSteps.length - 1) {
          setScreeningState("completed");
        }
      }, delay);
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="employer-root">
      {/* Title Header */}
      <div className="glass-panel rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-white flex items-center gap-2" id="employer-title">
          <Building className="w-5.5 h-5.5 text-indigo-400" /> Employer AI Talent Workspace
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Search the verified credentials pool. View verified portfolios, confirm cryptographic milestone stamps, and execute AI automated screens to bypass manual interview filters.
        </p>

        {/* Tab Selection */}
        <div className="flex gap-4 border-t border-white/5 pt-4 mt-4">
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === "browse" ? "glass-button-primary text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Browse Verified Talent
          </button>
          <button
            onClick={() => setActiveTab("screen")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === "screen" ? "glass-button-primary text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            AI Candidate Screening
          </button>
        </div>
      </div>

      {/* 1. Browse Talent Tab */}
      {activeTab === "browse" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          
          {/* Filters Column */}
          <div className="glass-panel rounded-xl p-5 space-y-4">
            <h3 className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">Search Filters</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Skills Search</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-slate-500">
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    disabled
                    placeholder="e.g., Python, React..."
                    className="w-full glass-input rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Required Verification Status</label>
                <select disabled className="w-full glass-input rounded-lg p-1.5 text-xs text-slate-400">
                  <option>Verified Passport Stamps Only</option>
                  <option>All Candidates</option>
                </select>
              </div>

              <div className="text-[10px] text-slate-450 italic bg-white/5 p-3 rounded-lg border border-white/5 font-medium leading-relaxed">
                Talent database represents candidates synced from local, rural, and vocational academies directly. All portfolio hashes are immutable.
              </div>
            </div>
          </div>

          {/* Candidates Listing (Middle / Right columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-400" /> Matches Found for: {profile.targetRole || "Technology Specialist"}
            </h3>

            {/* Candidate Card */}
            <div className="glass-card rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-4 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">{profile.name || "Amit Patel"}</h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Passport
                    </span>
                  </div>
                  <p className="text-xs text-indigo-300 font-semibold">{profile.targetRole || "Junior Full-Stack Web Developer"}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Trust Rating</span>
                  <span className="text-emerald-400 font-extrabold text-sm">99.8% Cryptographic</span>
                </div>
              </div>

              {/* Bio Details */}
              <div className="space-y-3">
                <div className="text-xs">
                  <span className="block text-[10px] uppercase font-bold text-slate-500">Education Background</span>
                  <span className="text-slate-300 font-medium">{profile.education}</span>
                </div>

                <div className="text-xs">
                  <span className="block text-[10px] uppercase font-bold text-slate-500">Verified Project Accomplishments</span>
                  <span className="text-slate-300 font-medium leading-relaxed block">{profile.experience}</span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Acquired Skill Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-0.5 rounded bg-slate-950/60 border border-white/5 text-indigo-300 text-[10px] font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* 2. Candidate Screening Tab */}
      {activeTab === "screen" && (
        <div className="glass-panel rounded-xl p-6 shadow-sm space-y-6 animate-fadeIn">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Automated Candidate Screener Simulator</h3>
              <p className="text-xs text-slate-400">Launch a cryptographic screening pipeline targeting the candidate profile to detect direct readiness percentages.</p>
            </div>

            <div className="flex gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="glass-input rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none font-medium"
                id="select-employer-target"
              >
                <option value="Junior Web Developer">Junior Web Developer</option>
                <option value="AI Solutions Specialist">AI Solutions Specialist</option>
                <option value="Database Architect">Database Architect</option>
              </select>

              <button
                onClick={runScreeningSimulation}
                disabled={screeningState === "running"}
                className="px-4 py-1.5 glass-button-primary text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                id="btn-run-screening"
              >
                <Sparkles className="w-3.5 h-3.5" /> Launch AI Screening
              </button>
            </div>
          </div>

          {/* Console / Log Terminal */}
          <div className="bg-slate-950/65 backdrop-blur-md rounded-xl p-5 border border-white/5 font-mono text-xs text-indigo-200 h-80 overflow-y-auto space-y-2">
            <div className="text-slate-500 text-[10px] border-b border-slate-900 pb-2 mb-2 uppercase font-bold flex justify-between">
              <span>Automated Screening Terminal logs</span>
              <span className="text-slate-600 animate-pulse">● online</span>
            </div>

            {screeningLogs.map((log, index) => (
              <div key={index} className="leading-relaxed animate-fadeIn">
                {log}
              </div>
            ))}

            {screeningState === "running" && (
              <div className="flex items-center gap-2 text-slate-500 py-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                <span>Processing candidate profiles...</span>
              </div>
            )}

            {screeningState === "idle" && (
              <div className="text-slate-600 italic py-12 text-center">
                Terminal ready. Click 'Launch AI Screening' above to begin validation.
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
