import React, { useState } from "react";
import { PassportCredential } from "../types";
import { MOCK_PASSPORT_INITIAL } from "../data";
import { Award, Plus, Calendar, Bookmark, ShieldCheck, CheckCircle2, Shield, Loader2 } from "lucide-react";

export default function SkillPassport() {
  const [credentials, setCredentials] = useState<PassportCredential[]>(MOCK_PASSPORT_INITIAL);
  const [newTitle, setNewTitle] = useState("");
  const [newIssuer, setNewIssuer] = useState("");
  const [newType, setNewType] = useState<PassportCredential["type"]>("certification");
  const [isVerifying, setIsVerifying] = useState(false);

  const simulateSHA256 = (str: string) => {
    // Basic hash simulator
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return `sha256-v2_${Math.abs(hash).toString(16)}${Date.now().toString(16)}`;
  };

  const handleAddCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newIssuer.trim()) return;

    setIsVerifying(true);

    // Simulate cryptographic validation latency
    setTimeout(() => {
      const newCred: PassportCredential = {
        id: `cred-${Date.now()}`,
        title: newTitle,
        issuer: newIssuer,
        date: new Date().toISOString().split("T")[0],
        type: newType,
        status: "verified",
        verificationHash: simulateSHA256(newTitle + newIssuer),
      };

      setCredentials([newCred, ...credentials]);
      setNewTitle("");
      setNewIssuer("");
      setIsVerifying(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="passport-root">
      
      {/* Header block */}
      <div className="glass-panel rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-white flex items-center gap-2" id="passport-title">
          <ShieldCheck className="w-5.5 h-5.5 text-emerald-400" /> Verified Skill Passport Registry
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          A persistent digital credential vault storing certified competencies, projects, and hackathons. Each entry is stamped with a unique SHA-256 proof hash, building a bulletproof hiring trust.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Visual Passport Card and Form */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Visual Passport Card */}
          <div className="glass-panel-heavy border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
            {/* Stamp decoration */}
            <div className="absolute top-4 right-4 border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 px-2 py-0.5 rounded text-[8px] font-mono rotate-12 backdrop-blur-sm shadow-sm">
              CRYPTO REGISTRY APPROVED
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-indigo-400" />
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white leading-tight">Skill Passport</h4>
                <p className="text-[9px] text-slate-400 font-mono">ID: DNA-9831-XP</p>
              </div>
            </div>

            <div className="space-y-4 text-xs relative z-10">
              <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/5">
                <div>
                  <span className="block text-[8px] text-slate-400 uppercase font-bold">Holder Name</span>
                  <span className="font-bold text-slate-200 text-xs">Amit Patel</span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400 uppercase font-bold">Class</span>
                  <span className="font-bold text-slate-200 text-xs">Full Stack Web</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/5">
                <div>
                  <span className="block text-[8px] text-slate-400 uppercase font-bold">Credentials</span>
                  <span className="font-bold text-indigo-300 text-xs">{credentials.length} Registered</span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400 uppercase font-bold">Trust Score</span>
                  <span className="font-bold text-emerald-400 text-xs">99.8% Perfect</span>
                </div>
              </div>

              {/* QR Dot simulation */}
              <div className="flex justify-between items-center pt-2">
                <div className="w-12 h-12 bg-white/95 rounded p-1 flex items-center justify-center backdrop-blur-sm shadow-inner">
                  <div className="grid grid-cols-4 gap-0.5 w-full h-full">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={`rounded-sm ${i % 3 === 0 ? "bg-slate-900" : "bg-transparent"}`}></div>
                    ))}
                  </div>
                </div>
                <div className="text-right text-[8px] text-slate-400 font-mono font-semibold max-w-[120px]">
                  SECURE BLOCKCHAIN-HASH PROOF REGISTRY
                </div>
              </div>
            </div>
          </div>

          {/* Form to log new skill achievements */}
          <div className="glass-panel rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-indigo-400" /> Log Skill Achievement
            </h3>

            <form onSubmit={handleAddCredential} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Achievement Name</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Responsive layout bootcamp"
                  className="w-full glass-input rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none font-medium"
                  id="input-cred-title"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Issuer / Academy / Platform</label>
                <input
                  type="text"
                  required
                  value={newIssuer}
                  onChange={(e) => setNewIssuer(e.target.value)}
                  placeholder="e.g., Coursera / State Vocational Center"
                  className="w-full glass-input rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none font-medium"
                  id="input-cred-issuer"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Category</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full glass-input rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                    id="select-cred-type"
                  >
                    <option value="certification">Certification</option>
                    <option value="project">Project</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="volunteer">Volunteer Work</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full py-1.5 glass-button-primary text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    id="btn-cred-submit"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Verifying...
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Stamp Passport
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>

        {/* Right Side: Listed Stamp Credentials */}
        <div className="lg:col-span-2 space-y-4" id="cred-list-box">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 text-indigo-400" /> Active Stamp Records
          </h3>

          <div className="space-y-4">
            {credentials.map((cred) => (
              <div
                key={cred.id}
                className="glass-card rounded-xl p-5 shadow-sm space-y-3"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-950/60 border border-white/5 text-indigo-300 text-[9px] uppercase font-bold tracking-wider">
                      {cred.type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-200 leading-tight">{cred.title}</h4>
                    <p className="text-xs text-slate-400 font-bold">{cred.issuer}</p>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-emerald-455 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified stamp
                  </div>
                </div>

                {/* Proof block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-3 border-t border-white/5 text-xs">
                  <div className="flex items-center gap-1 text-slate-400 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> Date Stamped:{" "}
                    <span className="text-slate-200">{cred.date}</span>
                  </div>
                  <div className="text-left md:text-right text-[9px] font-mono text-slate-500 select-all truncate font-semibold">
                    Hash: {cred.verificationHash}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
