import React, { useState } from "react";
import { RURAL_GOVT_SCHEMES, TRANSLATIONS } from "../data";
import { Globe, Volume2, Wifi, WifiOff, FileText } from "lucide-react";

interface RuralSupportProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export default function RuralSupport({ currentLanguage, onLanguageChange }: RuralSupportProps) {
  const [offlineActive, setOfflineActive] = useState(false);
  const [activeVoicePrompt, setActiveVoicePrompt] = useState<string | null>(null);
  const [expandedScheme, setExpandedScheme] = useState<string | null>("pmkvy");

  const voicePromptsResponses: Record<string, string> = {
    "Which scheme supports free computer coding courses?": 
      "The Pradhan Mantri Kaushal Vikas Yojana (PMKVY) or localized Common Service Centers (CSCs) offer zero-cost digital literacy courses and front-end developer foundations directly in rural block development units.",
    "Are there smart-farming jobs near me?": 
      "Yes! Under the Smart Agro-Cooperative program, local greenhouses and cooperatives are looking for 'Smart Crop Data Integrators'. These roles pay competitive salaries and accommodate remote or hybrid telemetry tracking.",
    "Can I apply for apprenticeships without a university degree?": 
      "Absolutely! The Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY) guarantees skill-based traineeship placements directly into IT, SaaS operations, and logistics departments without formal degree boundaries."
  };

  const handleVoiceQuery = (prompt: string) => {
    setActiveVoicePrompt(prompt);
    
    // Simulate TTS output
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const speechText = voicePromptsResponses[prompt] || "";
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="rural-root">
      
      {/* Introduction */}
      <div className="glass-panel rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-white flex items-center gap-2" id="rural-title">
          <Globe className="w-5.5 h-5.5 text-indigo-400" /> Rural & Underprivileged Access Support
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Bridge the digital divide. Career DNA Web implements language toggling, offline persistence simulations, smart crop apprentice listings, and accessible vocal synthesizers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Controls (Language and Offline Cache) */}
        <div className="space-y-6">
          
          {/* Regional language settings */}
          <div className="glass-panel rounded-xl p-5 space-y-4">
            <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" /> Regional Language (भाषा)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Translate your Career Intelligence portal into localized dialects instantly.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "en", label: "English" },
                { id: "hi", label: "हिंदी (Hindi)" },
                { id: "ta", label: "தமிழ் (Tamil)" },
                { id: "es", label: "Español" },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => onLanguageChange(lang.id)}
                  className={`px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                    currentLanguage === lang.id
                      ? "glass-button-primary text-white border-transparent"
                      : "bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:text-slate-300"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Offline Sync Cache Simulator */}
          <div className="glass-panel rounded-xl p-5 space-y-4">
            <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
              {offlineActive ? <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" /> : <Wifi className="w-4 h-4 text-emerald-400" />}
              Offline Sync (बिना इंटरनेट काम)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Enable offline mode to pre-download learning roadmaps and certified passports into browser localStorage.
            </p>

            <button
              onClick={() => setOfflineActive(!offlineActive)}
              className={`w-full py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                offlineActive
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "glass-button-primary text-white border-transparent"
              }`}
              id="btn-toggle-offline"
            >
              {offlineActive ? (
                <>
                  <WifiOff className="w-4 h-4 text-amber-400" /> Cache Engaged (Active Offline)
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4 text-indigo-400" /> Initialize Offline Cache
                </>
              )}
            </button>

            {offlineActive && (
              <div className="p-3 rounded bg-white/5 border border-white/5 text-[10px] text-amber-300 leading-normal font-medium">
                <strong>Offline Sync engaged:</strong> Roadmaps, credentials, and portfolios are pre-cached. Synchronization will re-fire when a signal is acquired.
              </div>
            )}
          </div>

        </div>

        {/* Middle/Right column: Government scheme guide & Voice assistant */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-400" /> Government & Skill Schemes (सरकारी योजनाएं)
            </h3>

            <div className="space-y-3" id="schemes-accordion">
              {RURAL_GOVT_SCHEMES.map((scheme) => {
                const isOpen = expandedScheme === scheme.id;
                return (
                  <div
                    key={scheme.id}
                    className="glass-panel rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedScheme(isOpen ? null : scheme.id)}
                      className="w-full p-4 text-left font-bold text-sm text-slate-200 flex justify-between items-center cursor-pointer hover:bg-white/5"
                    >
                      <span>{scheme.title}</span>
                      <span className="text-xs text-slate-550">{isOpen ? "Collapse ▲" : "Expand ▼"}</span>
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-white/5 border-t border-white/5 space-y-3 text-xs leading-relaxed text-slate-300">
                        <div>
                          <strong className="text-slate-450 block text-[10px] uppercase font-bold tracking-wider">Benefits & Provisions</strong>
                          <span>{scheme.benefits}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div>
                            <strong className="text-slate-455 block text-[10px] uppercase font-bold tracking-wider">Who is Eligible?</strong>
                            <span>{scheme.eligibility}</span>
                          </div>
                          <div>
                            <strong className="text-slate-455 block text-[10px] uppercase font-bold tracking-wider">How to Apply?</strong>
                            <span className="text-indigo-300 font-bold">{scheme.howToApply}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Voice Assistant Simulation */}
          <div className="glass-panel rounded-xl p-5 space-y-4 pt-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div>
                <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-indigo-400 animate-pulse" /> Accessible Voice Assistant Simulator
                </h3>
                <p className="text-[10px] text-slate-500 font-medium">Read or listen to vocalized guides answering immediate rural apprentice queries.</p>
              </div>
            </div>

            <div className="space-y-2">
              {Object.keys(voicePromptsResponses).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleVoiceQuery(prompt)}
                  className={`w-full text-left p-3 rounded-lg border text-xs flex justify-between items-center transition-colors cursor-pointer ${
                    activeVoicePrompt === prompt
                      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-200 font-semibold"
                      : "bg-white/5 border-white/5 text-slate-300 hover:border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span>"{prompt}"</span>
                  <span className="text-[10px] text-indigo-400 font-bold flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> Listen
                  </span>
                </button>
              ))}
            </div>

            {activeVoicePrompt && (
              <div className="p-4 bg-white/5 border border-indigo-500/25 text-xs text-indigo-200 leading-relaxed rounded-xl font-medium animate-fadeIn">
                <strong>Vocal Response:</strong>
                <p className="text-slate-300 text-xs mt-1 leading-normal">
                  {voicePromptsResponses[activeVoicePrompt]}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
