import React, { useState } from "react";
import {
  Sparkles,
  BrainCircuit,
  ShieldCheck,
  Milestone,
  Award,
  FileText,
  Activity,
  Bot,
  Building,
  Globe,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Compass,
  ArrowRight,
  HelpCircle,
  MessageSquare,
  TrendingUp,
  UserCheck
} from "lucide-react";
import Logo from "./Logo";

interface LandingPageProps {
  onLoginSuccess: (user: { name: string; role: "student" | "employer" | "admin"; email: string }) => void;
}

export default function LandingPage({ onLoginSuccess }: LandingPageProps) {
  const [viewState, setViewState] = useState<"landing" | "intro" | "login" | "signup">("landing");
  const [showPassword, setShowPassword] = useState(false);
  const [currentFaqIdx, setCurrentFaqIdx] = useState<number | null>(null);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: "amit.patel@vocational.edu",
    password: "password123",
    role: "student" as "student" | "employer" | "admin"
  });

  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "Male",
    dob: "",
    country: "",
    state: "",
    city: "",
    education: "Diploma in Information Technology",
    careerInterest: "Junior Full-Stack Web Developer",
    acceptTerms: false
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let userName = "Amit Patel";
    if (loginForm.role === "employer") userName = "Sarah Connor";
    if (loginForm.role === "admin") userName = "Vikram Dev";

    onLoginSuccess({
      name: userName,
      role: loginForm.role,
      email: loginForm.email
    });
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpForm.password !== signUpForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!signUpForm.acceptTerms) {
      alert("Please accept the terms & conditions.");
      return;
    }
    onLoginSuccess({
      name: `${signUpForm.firstName} ${signUpForm.lastName}`,
      role: "student",
      email: signUpForm.email
    });
  };

  const handleFaqToggle = (idx: number) => {
    setCurrentFaqIdx(currentFaqIdx === idx ? null : idx);
  };

  // Intro items data
  const introFeatures = [
    {
      id: "guidance",
      title: "Career Guidance",
      desc: "Interactive cognitive mapping to align with dynamic global market opportunities.",
      icon: Compass,
      example: "Aptitude core capability matrix index checks",
      color: "from-indigo-500/10 to-blue-500/10",
      accent: "text-blue-400"
    },
    {
      id: "mentor",
      title: "AI Career Mentor",
      desc: "Chat instantly with a contextual mentor specialized in full-stack strategies & tech fields.",
      icon: Bot,
      example: "STAR-method mock interview drill assistance",
      color: "from-purple-500/10 to-pink-500/10",
      accent: "text-purple-400"
    },
    {
      id: "roadmap",
      title: "Career Roadmaps",
      desc: "Chronological skill sprints with targeted micro-milestones to reach dream jobs faster.",
      icon: Milestone,
      example: "Phase 1: React & Tailwind -> Phase 2: Express Server & SQL",
      color: "from-emerald-500/10 to-teal-500/10",
      accent: "text-emerald-400"
    },
    {
      id: "gap",
      title: "Skill Gap Analysis",
      desc: "Cross-references your tags with corporate vacancy requirements live to guide learning.",
      icon: Award,
      example: "Identifies system deficiency & suggests customized project Sprints",
      color: "from-amber-500/10 to-orange-500/10",
      accent: "text-amber-400"
    },
    {
      id: "assessment",
      title: "Career Assessment",
      desc: "20 comprehensive coordinates evaluating cognitive logic, business skills, and personal goals.",
      icon: BrainCircuit,
      example: "Generates custom PDF Readiness index suitability reports",
      color: "from-cyan-500/10 to-sky-500/10",
      accent: "text-cyan-400"
    },
    {
      id: "resume",
      title: "Resume Builder",
      desc: "ATS-optimized clean resume compilation with cover letters and ready-to-use summaries.",
      icon: FileText,
      example: "Direct Markdown compilation copyable instantly to editors",
      color: "from-violet-500/10 to-purple-500/10",
      accent: "text-violet-400"
    },
    {
      id: "passport",
      title: "Digital Skill Passport",
      desc: "A secured system holding cryptographic badges signed by verified regional employers.",
      icon: ShieldCheck,
      example: "Tamper-proof block-linked certification ledger representation",
      color: "from-rose-500/10 to-red-500/10",
      accent: "text-rose-400"
    },
    {
      id: "employer",
      title: "Employer Portal",
      desc: "Post vacancies, check candidate career readiness ratings, and recruit verified graduates.",
      icon: Building,
      example: "Filter talent by verified React badge competency scores",
      color: "from-blue-500/10 to-cyan-500/10",
      accent: "text-sky-400"
    }
  ];

  return (
    <div
      className="min-h-screen bg-[#040812] text-slate-100 flex flex-col relative overflow-hidden font-sans select-none"
      id="landing-shell"
    >
      {/* Dynamic Animated Liquid Glow Blobs (Parallax Aura Lighting) */}
      <div className="absolute top-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-purple-500/20 blur-[130px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-15%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-violet-600/15 via-emerald-500/5 to-blue-600/10 blur-[120px] pointer-events-none animate-pulse-slower"></div>
      <div className="absolute top-[30%] left-[25%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none animate-pulse-slow"></div>

      {/* Futuristic Floating Interactive Liquid Glass Orbs */}
      <div className="absolute top-[18%] left-[8%] w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500/10 to-white/10 border border-white/10 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)] animate-float pointer-events-none opacity-80"></div>
      <div className="absolute bottom-[22%] right-[8%] w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/10 to-white/5 border border-white/5 backdrop-blur-lg shadow-[inset_0_3px_6px_rgba(255,255,255,0.15)] animate-float pointer-events-none opacity-70" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-[45%] right-[15%] w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500/10 to-white/15 border border-white/15 backdrop-blur-sm shadow-[inset_0_1px_3px_rgba(255,255,255,0.25)] animate-float pointer-events-none opacity-90" style={{ animationDelay: "4.5s" }}></div>

      {/* Grid Pattern Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mix-blend-overlay"></div>

      {/* Landing Navigation Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between relative z-30 border-b border-white/5 bg-[#040812]/45 backdrop-blur-xl">
        <Logo size="md" variant="horizontal" />
        
        <div className="flex items-center gap-6 text-xs font-bold">
          <button
            onClick={() => setViewState("intro")}
            className={`hover:text-indigo-300 transition-colors cursor-pointer tracking-wider ${
              viewState === "intro" ? "text-indigo-400" : "text-slate-400"
            }`}
          >
            Capabilities Map
          </button>
          <button
            onClick={() => setViewState("login")}
            className="px-4.5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 transition-all cursor-pointer tracking-wider hover:border-white/20 hover:scale-102 active:scale-98"
          >
            Sign In
          </button>
          <button
            onClick={() => setViewState("signup")}
            className="px-4.5 py-2 rounded-xl glass-button-primary text-white font-bold transition-all cursor-pointer tracking-wider"
          >
            Start Your Journey
          </button>
        </div>
      </header>

      {/* Main Container Stage */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 relative z-10" id="landing-stage">
        {/* VIEW 1: LANDING HERO */}
        {viewState === "landing" && (
          <div className="space-y-32 py-8 animate-[fadeIn_0.5s_ease-out]" id="view-landing">
            {/* HERO SECTION */}
            <section className="py-8 text-center space-y-8 max-w-4xl mx-auto relative">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/25 text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-2 shadow-[0_4px_12px_rgba(99,102,241,0.15)]">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Discover Your Career DNA
              </div>
              
              <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight text-white leading-[1.1] text-balance">
                Map Your Potential.<br />
                <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                  Build Sprints. Get Recruited.
                </span>
              </h1>
              
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
                AI-powered career guidance, skill development, personalized roadmaps, and employment opportunities—all in one intelligent platform.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center pt-6">
                <button
                  onClick={() => setViewState("signup")}
                  className="px-7 py-3.5 rounded-xl glass-button-primary text-white text-xs font-bold shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2 tracking-wider"
                >
                  Start Your Journey <Sparkles className="w-4 h-4 animate-bounce" />
                </button>
                <button
                  onClick={() => setViewState("login")}
                  className="px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all cursor-pointer tracking-wider hover:border-white/20 hover:scale-103 active:scale-97"
                >
                  Sign In to Workspace
                </button>
              </div>

              {/* Quick Hero Floating Match Widget (Liquid Glass Container) */}
              <div className="mt-16 p-6 rounded-3xl glass-panel-heavy border border-white/15 max-w-2xl mx-auto flex items-center justify-between text-left text-xs gap-6 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute top-[-11px] left-6 px-3 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-black rounded uppercase tracking-wider">
                  AI Real-Time Alignment
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10">
                    <UserCheck className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block">Candidate Verification</span>
                    <span className="text-sm font-black text-white mt-0.5 block">Amit Patel • IT Graduate</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block">Role Fit Index</span>
                  <span className="text-lg text-emerald-400 font-black block">96% Suitability</span>
                </div>
              </div>
            </section>

            {/* WHY CAREER DNA? (INTRO HIGHLIGHTS) */}
            <section className="space-y-12">
              <div className="text-center space-y-3">
                <span className="text-indigo-400 text-xs font-black uppercase tracking-widest block">Interactive Modules</span>
                <h2 className="text-2xl md:text-3xl font-display font-black text-white">Why Career DNA Web?</h2>
                <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                  We rebuild career trajectories from rural polytechnic institutes to global enterprise workspaces with proven modules:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-panel p-8 space-y-4 hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-[100px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-white/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold font-display text-slate-200">AI Cognitive Profiling</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    We map cognitive strengths, leadership parameters, technology interests, and workspace values to build a multidimensional profile.
                  </p>
                </div>

                <div className="glass-panel p-8 space-y-4 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-[100px] pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-white/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]">
                    <Milestone className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold font-display text-slate-200">Personalized Sprints</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Avoid tutorial loops. Deploy actionable monthly learning roadmaps populated with target credentials, assignments, and mentorship guides.
                  </p>
                </div>

                <div className="glass-panel p-8 space-y-4 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-[100px] pointer-events-none group-hover:bg-emerald-500/10 transition-colors"></div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-white/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold font-display text-slate-200">Cryptographic Verification</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Consolidate verified achievements in your Skill Passport, generating cryptographically verified proof of competencies for top employers.
                  </p>
                </div>
              </div>
            </section>

            {/* KEY METRICS STATISTICS */}
            <section className="glass-panel-heavy p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <span className="text-3xl md:text-5xl font-display font-black bg-gradient-to-r from-indigo-400 to-indigo-200 bg-clip-text text-transparent block">98%</span>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-2.5 block">Placement Rate</span>
              </div>
              <div className="relative z-10">
                <span className="text-3xl md:text-5xl font-display font-black bg-gradient-to-r from-sky-400 to-cyan-200 bg-clip-text text-transparent block">4.8M</span>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-2.5 block">Sprints Audited</span>
              </div>
              <div className="relative z-10">
                <span className="text-3xl md:text-5xl font-display font-black bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent block">250+</span>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-2.5 block">Corporate Partners</span>
              </div>
              <div className="relative z-10">
                <span className="text-3xl md:text-5xl font-display font-black bg-gradient-to-r from-rose-400 to-purple-300 bg-clip-text text-transparent block">100%</span>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-2.5 block">Verified Claims</span>
              </div>
            </section>

            {/* RECENT SUCCESS STORIES */}
            <section className="space-y-12">
              <div className="text-center space-y-3">
                <span className="text-cyan-400 text-xs font-black uppercase tracking-widest block">Graduate Success</span>
                <h2 className="text-2xl md:text-3xl font-display font-black text-white">Student Transitions</h2>
                <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                  Read how students transitioned from rural polytechnic schools to global technical roles using our platform:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-8 space-y-4 relative overflow-hidden border border-white/8 hover:border-indigo-500/25 transition-all">
                  <div className="absolute top-0 right-0 px-4 py-1.5 text-emerald-400 font-bold text-[10px] uppercase tracking-wider bg-emerald-500/15 rounded-bl-xl border-l border-b border-white/5">
                    Placed At Cyberdyne
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold font-display text-slate-200">Rajesh Kumar • Rural Web Developer</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                    "Career DNA mapped my technical skills and showed me exactly which skills were missing for high-salary React positions. Compiling the roadmap landed me an internship in under 3 weeks!"
                  </p>
                </div>

                <div className="glass-panel p-8 space-y-4 relative overflow-hidden border border-white/8 hover:border-cyan-500/25 transition-all">
                  <div className="absolute top-0 right-0 px-4 py-1.5 text-sky-400 font-bold text-[10px] uppercase tracking-wider bg-sky-500/15 rounded-bl-xl border-l border-b border-white/5">
                    Placed At AgriTech IoT
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-sky-400" />
                    <h4 className="text-sm font-bold font-display text-slate-200">Ananya Sen • Smart Agriculture Consultant</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                    "The assessment helped me link my agronomy passion with software telemetry. Now I build crop trackers and verified my code via the Digital Skill Passport."
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ SECTION */}
            <section className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <HelpCircle className="w-8 h-8 text-indigo-400 mx-auto" />
                <h2 className="text-2xl font-display font-black text-white">Frequently Asked Questions</h2>
                <p className="text-xs text-slate-400">Everything you need to know about Career DNA Web platform</p>
              </div>

              <div className="space-y-4 font-medium text-xs">
                {[
                  {
                    q: "What is a Verified Skill Passport?",
                    a: "The Verified Skill Passport is a cryptographic digital ledger where certified badges from mentors or academic hubs are registered, creating an unforgeable, reviewable portfolio for recruiters."
                  },
                  {
                    q: "How does the AI Career DNA analysis calculate career suitability?",
                    a: "By compiling 20 comprehensive indices across Interests, Problem-Solving, Teamwork, and Tech Aptitude, our platform parses ideal matching corporate titles and forecasts emerging role trends."
                  },
                  {
                    q: "Is the platform mobile responsive and translation supportive?",
                    a: "Yes, Career DNA Web supports fluid responsive designs optimized for mobile viewports, with full regional dialect support for rural accessibility."
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="glass-panel rounded-2xl overflow-hidden border border-white/5">
                    <button
                      onClick={() => handleFaqToggle(idx)}
                      className="w-full text-left p-5 font-bold font-display text-slate-200 flex justify-between items-center bg-white/3 cursor-pointer hover:bg-white/8 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="text-indigo-400 text-lg">{currentFaqIdx === idx ? "−" : "+"}</span>
                    </button>
                    {currentFaqIdx === idx && (
                      <div className="p-5 bg-[#040812]/50 text-slate-400 leading-relaxed border-t border-white/5 font-medium animate-[fadeIn_0.2s_ease-out]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: CAPABILITIES INTRO PAGE */}
        {viewState === "intro" && (
          <div className="py-8 space-y-12 animate-[fadeIn_0.5s_ease-out]" id="view-intro">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-indigo-400 text-xs font-black uppercase tracking-widest block">Capabilities Map Manual</span>
              <h2 className="text-3xl font-display font-black text-white">Platform Module Ecosystem</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Explore every intelligent segment designed to orchestrate your career from initial polytechnic diagnostics to verified corporate hiring.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {introFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="glass-panel p-6 border border-white/6 flex flex-col justify-between hover:border-indigo-500/20 hover:scale-[1.02] transition-all duration-300 relative group"
                  >
                    <div className="space-y-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center ${item.accent} border border-white/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]`}>
                        <Icon className="w-5.5 h-5.5" />
                      </div>
                      <h4 className="text-xs uppercase tracking-wider font-black font-display text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/5 mt-4 text-[10px] text-slate-500 font-semibold italic flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.example}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-8">
              <button
                onClick={() => setViewState("signup")}
                className="px-6 py-3.5 rounded-xl glass-button-primary text-white font-bold text-xs cursor-pointer tracking-wider"
              >
                Create Your Free Account <ArrowRight className="w-4 h-4 inline-block ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: SIGN IN GATEWAY */}
        {viewState === "login" && (
          <div className="py-16 animate-[fadeIn_0.5s_ease-out] flex justify-center" id="view-login">
            <div className="w-full max-w-md glass-panel-heavy p-8 rounded-3xl shadow-2xl space-y-6 relative border border-white/15 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent opacity-60 pointer-events-none"></div>

              <div className="text-center space-y-2 relative z-10">
                <Logo size="md" variant="vertical" className="mx-auto" />
                <p className="text-slate-400 text-xs font-medium pt-2">
                  Configure credentials or access active simulation spaces.
                </p>
              </div>

              {/* Quick Role Selection Tip */}
              <div className="p-4 bg-indigo-500/5 border border-indigo-500/15 rounded-2xl text-[10px] text-indigo-300 text-center font-bold leading-relaxed tracking-wide">
                Tip: Cycle roles below to preview different ecosystem dashboards (Student, Recruiter, or Admin).
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-medium relative z-10">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">Email address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="w-full glass-input pl-10 pr-3 py-2.5 text-xs rounded-xl text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">Account Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full glass-input pl-10 pr-10 py-2.5 text-xs rounded-xl text-slate-200 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">Select Ecosystem Role Workspace</label>
                  <select
                    value={loginForm.role}
                    onChange={(e) => {
                      const selectedRole = e.target.value as "student" | "employer" | "admin";
                      let selectedEmail = "amit.patel@vocational.edu";
                      if (selectedRole === "employer") selectedEmail = "sarah@cyberdyne.io";
                      if (selectedRole === "admin") selectedEmail = "vikram@ruralreach.org";
                      setLoginForm({ role: selectedRole, email: selectedEmail, password: "password123" });
                    }}
                    className="w-full glass-input px-3 py-2.5 rounded-xl text-slate-300 focus:outline-none bg-slate-950/80 cursor-pointer"
                  >
                    <option value="student">Student Sandbox Profile (Amit Patel)</option>
                    <option value="employer">Employer / Business (Sarah Connor)</option>
                    <option value="admin">System Administrator (Vikram Dev)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 py-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded bg-slate-950 border-white/10 text-indigo-500 focus:ring-0" defaultChecked />
                    <span>Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Simulated authorization link dispatched to: " + loginForm.email)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl glass-button-primary text-white font-black text-xs cursor-pointer tracking-wider"
                >
                  Authorize & Initialize Workspace
                </button>
              </form>

              <div className="text-center text-[11px] text-slate-500 relative z-10 border-t border-white/5 pt-5">
                Don't have an account?{" "}
                <button onClick={() => setViewState("signup")} className="text-indigo-400 hover:underline font-bold">
                  Register For Free
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: REGISTER / SIGN UP */}
        {viewState === "signup" && (
          <div className="py-12 animate-[fadeIn_0.5s_ease-out] flex justify-center" id="view-signup">
            <div className="w-full max-w-2xl glass-panel-heavy p-8 rounded-3xl shadow-2xl space-y-6 border border-white/15 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent opacity-60 pointer-events-none"></div>

              <div className="text-center space-y-2 relative z-10">
                <Logo size="md" variant="vertical" className="mx-auto" />
                <p className="text-slate-400 text-xs font-medium pt-2">
                  Access verified psychometric diagnostics and custom training roadmaps instantly.
                </p>
              </div>

              <form onSubmit={handleSignUpSubmit} className="space-y-4 text-xs font-medium relative z-10">
                {/* Name Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">First Name</label>
                    <input
                      type="text"
                      required
                      value={signUpForm.firstName}
                      onChange={(e) => setSignUpForm({ ...signUpForm, firstName: e.target.value })}
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-slate-200"
                      placeholder="Amit"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">Last Name</label>
                    <input
                      type="text"
                      required
                      value={signUpForm.lastName}
                      onChange={(e) => setSignUpForm({ ...signUpForm, lastName: e.target.value })}
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-slate-200"
                      placeholder="Patel"
                    />
                  </div>
                </div>

                {/* Email and Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">Email address</label>
                    <input
                      type="email"
                      required
                      value={signUpForm.email}
                      onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-slate-200"
                      placeholder="amit@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">Account Password</label>
                    <input
                      type="password"
                      required
                      value={signUpForm.password}
                      onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-slate-200"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={signUpForm.confirmPassword}
                      onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-slate-200"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">Gender</label>
                      <select
                        value={signUpForm.gender}
                        onChange={(e) => setSignUpForm({ ...signUpForm, gender: e.target.value })}
                        className="w-full glass-input px-3 py-2.5 rounded-xl text-slate-300 bg-slate-950/80 cursor-pointer"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">Date of Birth</label>
                      <input
                        type="date"
                        required
                        value={signUpForm.dob}
                        onChange={(e) => setSignUpForm({ ...signUpForm, dob: e.target.value })}
                        className="w-full glass-input px-3 py-2.5 rounded-xl text-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Geography Address */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">Country</label>
                    <input
                      type="text"
                      required
                      value={signUpForm.country}
                      onChange={(e) => setSignUpForm({ ...signUpForm, country: e.target.value })}
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-slate-200"
                      placeholder="India"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">State / Province</label>
                    <input
                      type="text"
                      required
                      value={signUpForm.state}
                      onChange={(e) => setSignUpForm({ ...signUpForm, state: e.target.value })}
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-slate-200"
                      placeholder="Gujarat"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">City / District</label>
                    <input
                      type="text"
                      required
                      value={signUpForm.city}
                      onChange={(e) => setSignUpForm({ ...signUpForm, city: e.target.value })}
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-slate-200"
                      placeholder="Anand"
                    />
                  </div>
                </div>

                {/* Academic Background */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">Current Education</label>
                    <input
                      type="text"
                      required
                      value={signUpForm.education}
                      onChange={(e) => setSignUpForm({ ...signUpForm, education: e.target.value })}
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-bold tracking-wide">Active Career Interest</label>
                    <input
                      type="text"
                      required
                      value={signUpForm.careerInterest}
                      onChange={(e) => setSignUpForm({ ...signUpForm, careerInterest: e.target.value })}
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer text-slate-400 text-[11px] leading-relaxed select-none">
                    <input
                      type="checkbox"
                      required
                      checked={signUpForm.acceptTerms}
                      onChange={(e) => setSignUpForm({ ...signUpForm, acceptTerms: e.target.checked })}
                      className="mt-0.5 rounded bg-slate-950 border-white/10 text-indigo-500 focus:ring-0"
                    />
                    <span>
                      I declare that the academic credentials and diagnostic answers supplied are accurate, and agree to the Career DNA terms and privacy guidelines.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl glass-button-primary text-white font-black text-xs cursor-pointer tracking-wider mt-4"
                >
                  Create Account & Initialize Workspace
                </button>
              </form>

              <div className="text-center text-[11px] text-slate-500 border-t border-white/5 pt-5">
                Already registered?{" "}
                <button onClick={() => setViewState("login")} className="text-indigo-400 hover:underline font-bold">
                  Sign In Workspace
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full px-6 py-10 border-t border-white/5 text-center text-xs text-slate-500 relative z-10 font-bold uppercase tracking-widest space-y-2.5">
        <div>© 2026 Career DNA Web • Lifetime Career Operating System</div>
        <div className="text-[10px] text-indigo-400/70 font-bold tracking-widest">
          Securely verified by decentralised trust architectures
        </div>
      </footer>
    </div>
  );
}
