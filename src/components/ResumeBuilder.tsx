import React, { useState } from "react";
import { CareerProfile, ResumeResult } from "../types";
import { FileText, Sparkles, Loader2, Copy, Check, ArrowRight, HelpCircle, AlertCircle } from "lucide-react";

interface ResumeBuilderProps {
  profile: CareerProfile;
}

const DEFAULT_RESUME_MOCK: ResumeResult = {
  atsResumeMarkdown: `# ${DEFAULT_NAME_REPLACEMENT()}
Email: candidate@careerdna.io | Web: portfolio.careerdna.io/candidate
Location: Silicon Valley / Remote Hub

## PROFESSIONAL SUMMARY
Highly analytical and dedicated technology enthusiast with a foundational background in software development. Experienced in designing local community-level agricultural tracking interfaces and automated sensors. Proven troubleshooting aptitude, high empathy, and a strong visual learning methodology to acquire new full-stack tools instantly.

## CORE SKILLS
* **Front-end**: HTML5, CSS3, Modern JavaScript (ES6+), Responsive Layouts, Tailwind CSS, React.js
* **Back-end & Scripting**: Node.js, Express, Python Basics, REST APIs
* **Tools**: Git, GitHub, VS Code, CommandLine, local storage integrations

## RELEVANT PROJECTS
### Agri-Tech Smart Crop Monitor
* Designed and deployed a local community smart agriculture monitoring dashboard.
* Connected sensor logic in Python to visualize real-time humidity, crop analytics, and yield alerts.
* Handled responsive utility stylesheets to guarantee clean layouts across tablet and mobile displays.

## EDUCATION
* Diploma in Information Technology - Rural Polytechnic (Honors)
`,
  coverLetter: `Dear Hiring Manager,

I am writing to express my enthusiastic interest in joining your team as a Junior Full-Stack Web Developer. 

With a strong educational foundation in information technology and hands-on experience designing community Agri-Tech monitoring pipelines, I have mastered the art of building practical software solutions. Whether implementing responsive grid layouts using Tailwind CSS or organizing logic flows in Python, I approach complex problems with persistent troubleshooting, structured workflows, and high user empathy. 

I am eager to contribute my capabilities to your upcoming initiatives. Thank you for your time and consideration.

Sincerely,
${DEFAULT_NAME_REPLACEMENT()}`,
  linkedinSummary: `💡 Aspiring Junior Full-Stack Web Developer passionate about building high-converting responsive interfaces and data automation pipelines. Master of HTML, CSS, JavaScript, and Python frameworks. Champion of Agri-Tech innovation, community-centered design, and robust API proxies. Let's connect!`,
  interviewPrep: [
    {
      question: "Can you tell me about a time you solved a difficult technical issue?",
      sampleAnswer: "Situation: While developing my community Agri-Tech monitor, real-time sensor streams were failing on low-bandwidth networks. Task: I needed to reduce payload sizing. Action: I optimized our JSON schemas, stripped unused metadata, and established local client caching. Result: Network latency dropped by 45%, enabling continuous crop-yield forecasting.",
      tip: "Structure your response using the STAR method (Situation, Task, Action, Result) to demonstrate logical troubleshooting."
    },
    {
      question: "How do you approach learning a new programming tool or library?",
      sampleAnswer: "Situation: I needed to utilize React hooks and Tailwind for a project with zero prior library experience. Task: Acquire functional mastery within 4 days. Action: I built three small sandbox applications, modifying styles incrementally. Result: Developed and deployed a fully functional multi-tab career portal ahead of schedule.",
      tip: "Highlight hands-on project trials to prove agility and high self-motivation."
    }
  ]
};

function DEFAULT_NAME_REPLACEMENT() {
  return "Candidate Explorer";
}

export default function ResumeBuilder({ profile }: ResumeBuilderProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<"resume" | "cover" | "linkedin" | "interview" | "portfolio">("portfolio");
  const [copiedText, setCopiedText] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const triggerCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const getResumeData = async (useDemo = false) => {
    setLoading(true);
    setError(null);

    if (useDemo) {
      setTimeout(() => {
        const adapted = { ...DEFAULT_RESUME_MOCK };
        adapted.atsResumeMarkdown = adapted.atsResumeMarkdown.replace("Candidate Explorer", profile.name || "Amit Patel");
        adapted.coverLetter = adapted.coverLetter.replace("Candidate Explorer", profile.name || "Amit Patel");
        setResult(adapted);
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch("/api/resume-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          education: profile.education,
          experience: profile.experience,
          skills: profile.skills.join(", "),
          targetRole: profile.targetRole,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to contact resume builder server.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to compile documents.");
    } finally {
      setLoading(false);
    }
  };

  const currentName = profile.name || "Amit Patel";

  return (
    <div className="space-y-8 animate-fadeIn" id="resume-builder-root">
      
      {/* Intro Header */}
      <div className="glass-panel rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2" id="resume-builder-title">
              <FileText className="w-5.5 h-5.5 text-indigo-500 dark:text-indigo-400" /> AI Resume & Portfolio Architect
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Compile ATS-ready markdown resumes, tailored cover letters, and social media intros. Instantly preview your responsive online portfolio card or test interview prep cards.
            </p>
          </div>
          <div>
            {!loading && (
              <div className="flex gap-2">
                <button
                  onClick={() => getResumeData(false)}
                  className="px-4 py-2 glass-button-primary text-white rounded-lg text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                  id="btn-build-resume"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Package Assets
                </button>
                <button
                  onClick={() => getResumeData(true)}
                  className="px-4 py-2 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold cursor-pointer border border-black/5 dark:border-white/5 hover:border-black/10 hover:dark:border-white/10 transition-all whitespace-nowrap"
                  id="btn-build-resume-demo"
                >
                  Load Predefined
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 glass-panel rounded-xl" id="resume-loading">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Structuring ATS Assets...</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">Generating custom markdown templates, cover letter blueprints, and STAR-method interview cases.</p>
        </div>
      )}

      {/* Error state with redirection */}
      {error && !loading && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-6 text-slate-300 space-y-4" id="resume-error">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-rose-400">Content Packaging Error</p>
              <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">{error}</p>
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <span className="font-medium text-slate-350">
              Load the predefined portfolio builder engine to test the interactive mock website preview and interview simulator.
            </span>
            <button
              onClick={() => getResumeData(true)}
              className="px-3.5 py-1.5 glass-button-primary text-white rounded-md text-xs font-bold shrink-0 cursor-pointer"
            >
              Activate Predefined Templates
            </button>
          </div>
        </div>
      )}

      {/* Main layout once assets exist */}
      {result && !loading && (
        <div className="space-y-6" id="resume-tabs-container">
          
          {/* Subtab navigation */}
          <div className="flex flex-wrap border-b border-black/5 dark:border-white/5">
            {[
              { id: "portfolio", label: "Live Portfolio Site" },
              { id: "resume", label: "ATS Resume" },
              { id: "cover", label: "Cover Letter" },
              { id: "linkedin", label: "LinkedIn Summary" },
              { id: "interview", label: "Interview Flashcards" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-5 py-3 text-xs font-bold transition-all relative cursor-pointer ${
                  activeSubTab === tab.id
                    ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500 font-bold"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Subtab Contents */}
          <div className="glass-panel rounded-xl p-6 shadow-sm">
            
            {/* 1. Live Portfolio Site Mock (Visual masterpiece) */}
            {activeSubTab === "portfolio" && (
              <div className="space-y-6 animate-fadeIn font-sans">
                <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">Interactive Web Portfolio Mockup</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">See how your Career DNA is automatically translated into a professional visual landing page.</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10 font-mono">
                    responsive-frame: ON
                  </span>
                </div>

                {/* Portfolio Preview Frame */}
                <div className="bg-slate-50 dark:bg-slate-950/60 backdrop-blur-md rounded-lg border border-black/5 dark:border-white/5 overflow-hidden shadow-inner text-slate-800 dark:text-slate-300">
                  {/* Browser-like Toolbar */}
                  <div className="bg-black/5 dark:bg-white/5 px-4 py-2 border-b border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
                    </div>
                    <div className="bg-white dark:bg-slate-950/80 px-8 py-0.5 rounded text-[10px] font-mono select-all border border-black/5 dark:border-white/5 text-slate-600 dark:text-slate-400">
                      https://careerdna.web/portfolios/{currentName.toLowerCase().replace(/\s+/g, "-")}
                    </div>
                    <div className="w-10"></div>
                  </div>

                  {/* Portfolio Landing Content */}
                  <div className="p-8 space-y-12 bg-white dark:bg-transparent">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center pb-6 border-b border-slate-100 dark:border-white/5">
                      <span className="font-bold text-sm tracking-tight text-slate-950 dark:text-white">{currentName}</span>
                      <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400 font-bold">
                        <span>About</span>
                        <span>Projects</span>
                        <span>Skills</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Connect</span>
                      </div>
                    </div>

                    {/* Hero segment */}
                    <div className="space-y-4 max-w-xl py-6">
                      <span className="px-2.5 py-0.5 text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full font-bold border border-indigo-500/20 uppercase tracking-wider">
                        Available for Opportunities
                      </span>
                      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Hi, I'm {currentName}.
                      </h1>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        I specialize as a <strong className="text-indigo-600 dark:text-indigo-400">{profile.targetRole || "Technology Specialist"}</strong>. {profile.experience || "Dedicated developer crafting sustainable community technology solutions."}
                      </p>
                      <button className="px-4 py-2 glass-button-primary text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer">
                        Download Credentials <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Skill segment */}
                    <div className="space-y-4">
                      <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider">Core Competencies</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-slate-800 dark:text-slate-200 rounded text-xs font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Local project callout */}
                    <div className="space-y-4 pt-4">
                      <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider">Featured Capstone</h3>
                      <div className="bg-slate-50 dark:bg-white/5 p-5 rounded-lg border border-black/5 dark:border-white/5 hover:border-black/10 hover:dark:border-white/10 transition-all space-y-2">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Agri-Tech Smart Monitor Deployment</h4>
                          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider">Python + React</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          Developed visual humidity metrics, local storage sync logs, and offline crop alert systems, driving measurable community efficiency.
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-[10px] text-slate-500 pt-8 border-t border-slate-100 dark:border-white/5">
                      © {new Date().getFullYear()} {currentName}. Powered by Career DNA Web passport.
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* 2. ATS Resume */}
            {activeSubTab === "resume" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">ATS-Optimized Resume Markdown</h3>
                  <button
                    onClick={() => triggerCopy(result.atsResumeMarkdown)}
                    className="px-3 py-1 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded text-xs flex items-center gap-1.5 cursor-pointer border border-black/5 dark:border-white/5 font-bold transition-colors"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    {copiedText ? "Copied!" : "Copy Markdown"}
                  </button>
                </div>
                <pre className="p-4 bg-slate-50 dark:bg-slate-950/60 backdrop-blur-md rounded-lg text-xs font-mono text-slate-800 dark:text-slate-300 border border-black/5 dark:border-white/5 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {result.atsResumeMarkdown}
                </pre>
              </div>
            )}

            {/* 3. Cover Letter */}
            {activeSubTab === "cover" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Tailored Cover Letter Draft</h3>
                  <button
                    onClick={() => triggerCopy(result.coverLetter)}
                    className="px-3 py-1 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded text-xs flex items-center gap-1.5 cursor-pointer border border-black/5 dark:border-white/5 font-bold transition-colors"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    {copiedText ? "Copied!" : "Copy Letter"}
                  </button>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-950/60 backdrop-blur-md rounded-lg text-xs text-slate-800 dark:text-slate-300 border border-black/5 dark:border-white/5 whitespace-pre-wrap leading-relaxed font-medium">
                  {result.coverLetter}
                </div>
              </div>
            )}

            {/* 4. LinkedIn Summary */}
            {activeSubTab === "linkedin" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">LinkedIn "About" Bio Hook</h3>
                  <button
                    onClick={() => triggerCopy(result.linkedinSummary)}
                    className="px-3 py-1 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded text-xs flex items-center gap-1.5 cursor-pointer border border-black/5 dark:border-white/5 font-bold transition-colors"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    {copiedText ? "Copied!" : "Copy Summary"}
                  </button>
                </div>
                <div className="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-lg text-xs text-indigo-800 dark:text-indigo-200 italic font-bold leading-relaxed">
                  "{result.linkedinSummary}"
                </div>
              </div>
            )}

            {/* 5. Interview Flashcards */}
            {activeSubTab === "interview" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">Mock Interview Prep Simulator</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Click a question card below to "flip" and reveal its optimized STAR-method answer framework and critical hiring insights.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.interviewPrep.map((item, idx) => {
                    const isFlipped = flippedIndex === idx;

                    return (
                      <div
                        key={idx}
                        onClick={() => setFlippedIndex(isFlipped ? null : idx)}
                        className={`p-6 rounded-xl border transition-all cursor-pointer h-56 flex flex-col justify-between ${
                          isFlipped
                            ? "bg-slate-100 dark:bg-slate-950/70 backdrop-blur-md border-indigo-500/40 text-slate-800 dark:text-slate-200"
                            : "glass-card border-black/5 dark:border-white/5 hover:border-indigo-500/30 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {isFlipped ? (
                          <div className="space-y-2 overflow-y-auto">
                            <span className="text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider block">Recommended STAR Response</span>
                            <p className="text-xs leading-normal font-bold text-slate-800 dark:text-slate-200">{item.sampleAnswer}</p>
                            <span className="block border-t border-black/5 dark:border-white/5 pt-1.5 text-[10px] text-indigo-600 dark:text-indigo-300 font-bold">
                              💡 <strong>Hiring Manager Tip:</strong> {item.tip}
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-full font-bold border border-black/5 dark:border-white/5 uppercase">
                              <HelpCircle className="w-3 h-3 text-indigo-500 dark:text-indigo-400" /> Question #{idx + 1}
                            </span>
                            <h4 className="text-sm font-bold leading-snug text-slate-800 dark:text-white">{item.question}</h4>
                          </div>
                        )}
                        <span className="text-[9px] text-slate-500 font-bold self-end uppercase pt-2">
                          {isFlipped ? "Click to see Question" : "Click to flip & reveal answer"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Empty state */}
      {!result && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-20 glass-panel rounded-xl text-center px-4">
          <FileText className="w-12 h-12 text-slate-400 dark:text-slate-600 mb-3" />
          <p className="text-sm font-bold text-slate-800 dark:text-slate-300">ATS Assets Unpackaged</p>
          <p className="text-xs text-slate-500 max-w-sm mt-1 font-medium leading-relaxed">
            Build your documents and deploy a real-time portfolio layout derived directly from your profile settings.
          </p>
          <button
            onClick={() => getResumeData(false)}
            className="mt-4 px-4 py-2 glass-button-primary text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Package Now
          </button>
        </div>
      )}
    </div>
  );
}
