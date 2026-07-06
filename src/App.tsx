import React, { useState, useEffect } from "react";
import { CareerProfile } from "./types";
import { DEFAULT_USER_PROFILE, TRANSLATIONS } from "./data";
import DashboardHome from "./components/DashboardHome";
import CareerDNA from "./components/CareerDNA";
import RoadmapGenerator from "./components/RoadmapGenerator";
import SkillGapDetection from "./components/SkillGapDetection";
import ResumeBuilder from "./components/ResumeBuilder";
import EmploymentHeatMap from "./components/EmploymentHeatMap";
import SkillPassport from "./components/SkillPassport";
import CareerMentor from "./components/CareerMentor";
import EmployerDashboard from "./components/EmployerDashboard";
import RuralSupport from "./components/RuralSupport";

// New Components
import LandingPage from "./components/LandingPage";
import CareerAssessment from "./components/CareerAssessment";
import AdminPanel from "./components/AdminPanel";
import Logo from "./components/Logo";

import {
  Home,
  BrainCircuit,
  Milestone,
  Award,
  FileText,
  Activity,
  ShieldCheck,
  Bot,
  Building,
  Globe,
  Menu,
  X,
  User,
  Sparkles,
  LogOut,
  Sun,
  Moon,
  Search,
  Settings,
  Shield
} from "lucide-react";

export default function App() {
  // Authentication & Session State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [userRole, setUserRole] = useState<"student" | "employer" | "admin">(() => {
    return (localStorage.getItem("userRole") as any) || "student";
  });
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("userEmail") || "amit.patel@vocational.edu";
  });
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "Amit Patel";
  });

  // System settings
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");

  const [activeTab, setActiveTab] = useState("home");
  const [profile, setProfile] = useState<CareerProfile>(() => {
    // Sync name if logged in
    const cachedProfile = { ...DEFAULT_USER_PROFILE };
    if (userName) cachedProfile.name = userName;
    return cachedProfile;
  });
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Handle Command Palette Keyboard shortcut: Ctrl + K or Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update profile name when user changes
  useEffect(() => {
    setProfile(prev => ({
      ...prev,
      name: userName
    }));
  }, [userName]);

  const handleProfileChange = (updatedProfile: CareerProfile) => {
    setProfile(updatedProfile);
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const handleLoginSuccess = (user: { name: string; role: "student" | "employer" | "admin"; email: string }) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userName", user.name);

    setIsLoggedIn(true);
    setUserRole(user.role);
    setUserEmail(user.email);
    setUserName(user.name);

    // Default target role based on role selected
    if (user.role === "employer") {
      setActiveTab("employer");
    } else if (user.role === "admin") {
      setActiveTab("admin");
    } else {
      setActiveTab("home");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
    setUserRole("student");
    setUserEmail("");
    setUserName("");
    setActiveTab("home");
  };

  // Build navigation items based on active role
  const getNavigationItems = () => {
    if (userRole === "admin") {
      return [
        { id: "admin", label: "Admin Control Center", icon: Shield },
        { id: "home", label: "Student Profile Sandbox", icon: Home },
        { id: "assessment", label: "Career Assessment", icon: BrainCircuit },
        { id: "employer", label: "Employer Workspace", icon: Building }
      ];
    }

    if (userRole === "employer") {
      return [
        { id: "employer", label: t.employerDashboard || "Employer AI Dashboard", icon: Building },
        { id: "heatmap", label: t.heatMap || "Employment Heat Map", icon: Activity },
        { id: "home", label: "Mock Student Sandbox", icon: Home }
      ];
    }

    // Default Student/Graduate navigation
    return [
      { id: "home", label: t.home || "Profile Workspace", icon: Home },
      { id: "dna", label: t.dnaAnalysis || "Career DNA Analysis", icon: BrainCircuit },
      { id: "assessment", label: "Career Assessment", icon: Sparkles },
      { id: "roadmap", label: t.roadmap || "Roadmap Generator", icon: Milestone },
      { id: "gap", label: t.skillGap || "Live Skill Gap Detection", icon: Award },
      { id: "resume", label: t.resumeBuilder || "AI Resume & Portfolio", icon: FileText },
      { id: "heatmap", label: t.heatMap || "Employment Heat Map", icon: Activity },
      { id: "passport", label: t.skillPassport || "Verified Skill Passport", icon: ShieldCheck },
      { id: "mentor", label: t.careerMentor || "AI Career Mentor", icon: Bot },
      { id: "rural", label: t.ruralSupport || "Rural Access Support", icon: Globe }
    ];
  };

  const navigationItems = getNavigationItems();

  const handleNavigation = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  // Filter command palette options
  const allPaletteOptions = [
    { id: "home", label: "Profile Workspace Dashboard", cat: "Skins" },
    { id: "dna", label: "Career DNA Decoder", cat: "AI Services" },
    { id: "assessment", label: "Career Suitability & Readiness Assessment", cat: "Diagnostics" },
    { id: "roadmap", label: "Verified Career Roadmap compiler", cat: "AI Services" },
    { id: "gap", label: "Live corporate Vacancies Skill Gap detector", cat: "AI Services" },
    { id: "resume", label: "ATS-optimized Resume & Cover Letter builder", cat: "AI Services" },
    { id: "heatmap", label: "Global Employment Heat Map and trends", cat: "Metrics" },
    { id: "passport", label: "Verified Skill Passport cryptography log", cat: "Diagnostics" },
    { id: "mentor", label: "Empathetic AI Career Mentor assistant", cat: "AI Services" },
    { id: "rural", label: "Rural Access government scholarship schemes", cat: "Region Support" },
    { id: "admin", label: "Admin Control Center", cat: "System" },
    { id: "employer", label: "Employer Recruiter Board", cat: "System" }
  ].filter(opt => {
    // Only show valid options matching queries
    return opt.label.toLowerCase().includes(paletteQuery.toLowerCase()) ||
           opt.cat.toLowerCase().includes(paletteQuery.toLowerCase());
  });

  // If user is not logged in, render the premium landing page directly!
  if (!isLoggedIn) {
    return <LandingPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col md:flex-row relative overflow-x-hidden transition-all duration-300 ${
      isDarkMode ? "dark bg-[#030712] text-slate-100" : "bg-[#f3f4f6] text-black"
    }`} id="app-workspace-shell">
      
      {/* 🔮 APPLE LIQUID GLASS MULTI-LAYERED BACKGROUND SYSTEM */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" id="liquid-glass-bg-system">
        
        {/* Layer 1: Grain Noise Surface */}
        <div className={`absolute inset-0 ${isDarkMode ? "glass-grain" : "glass-grain-light"} mix-blend-overlay`} />

        {/* Layer 2: Micro-Structured Geometric Grid Gridlines */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)]" 
            : "bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)]"
        } bg-[size:50px_50px] opacity-80`} />

        {/* Layer 3: Dynamic Liquid Fluid Gradients (Flowing & Pulsing) */}
        {isDarkMode ? (
          <>
            {/* Dark Theme Liquid Aurora Core */}
            <div className="absolute top-[-20%] left-[-15%] w-[75vw] h-[75vw] rounded-full bg-gradient-to-br from-indigo-600/14 via-violet-500/10 to-transparent blur-[140px] animate-drift-1" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-purple-600/12 via-pink-500/6 to-transparent blur-[140px] animate-drift-2" />
            <div className="absolute top-[35%] right-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-l from-emerald-500/6 via-cyan-500/8 to-transparent blur-[110px] animate-drift-3" />
            <div className="absolute bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/5 blur-[120px] animate-pulse-slow" />
          </>
        ) : (
          <>
            {/* Light Theme Pearlescent Aura Core */}
            <div className="absolute top-[-20%] left-[-15%] w-[75vw] h-[75vw] rounded-full bg-gradient-to-br from-rose-200/35 via-peach-100/30 to-transparent blur-[120px] animate-drift-1" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-indigo-200/40 via-sky-100/35 to-transparent blur-[130px] animate-drift-2" />
            <div className="absolute top-[35%] right-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-l from-emerald-100/25 via-teal-50/20 to-transparent blur-[100px] animate-drift-3" />
            <div className="absolute bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-amber-100/25 blur-[110px] animate-pulse-slow" />
          </>
        )}

        {/* Layer 4: Volumetric 3D Frosted Glass Orbs (Floating at different depths) */}
        <div className={`absolute top-[12%] left-[5%] w-48 h-48 rounded-full ${
          isDarkMode ? "liquid-glass-orb-dark" : "liquid-glass-orb-light"
        } animate-orb-float-1 opacity-70`} />
        
        <div className={`absolute bottom-[18%] right-[5%] w-64 h-64 rounded-full ${
          isDarkMode ? "liquid-glass-orb-dark" : "liquid-glass-orb-light"
        } animate-orb-float-2 opacity-60`} style={{ animationDelay: "-3s" }} />
        
        <div className={`absolute top-[55%] left-[45%] w-32 h-32 rounded-full ${
          isDarkMode ? "liquid-glass-orb-dark" : "liquid-glass-orb-light"
        } animate-orb-float-1 opacity-80`} style={{ animationDelay: "-6s" }} />

        {/* Layer 5: High Sheen Curved Glass Refraction Ribbons (Diagonal Light Bevels) */}
        <div className={`absolute -top-[10%] left-[25%] w-[2px] h-[120%] rotate-[25deg] origin-top bg-gradient-to-b ${
          isDarkMode 
            ? "from-transparent via-white/10 to-transparent" 
            : "from-transparent via-white/40 to-transparent"
        } opacity-70`} />
        
        <div className={`absolute top-[10%] left-[65%] w-[1px] h-[100%] rotate-[25deg] origin-top bg-gradient-to-b ${
          isDarkMode 
            ? "from-transparent via-indigo-400/10 to-transparent" 
            : "from-transparent via-indigo-400/20 to-transparent"
        } opacity-50`} />

        <div className={`absolute -bottom-[10%] left-[40%] w-[1.5px] h-[100%] rotate-[25deg] origin-top bg-gradient-to-b ${
          isDarkMode 
            ? "from-transparent via-purple-400/8 to-transparent" 
            : "from-transparent via-purple-400/15 to-transparent"
        } opacity-60`} />

      </div>

      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 select-none z-20 glass-panel-heavy m-4 border border-black/5 dark:border-white/5 shadow-xl">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-200/50 dark:border-white/5">
          <Logo size="sm" variant="horizontal" theme={isDarkMode ? "dark" : "light"} />
        </div>

        {/* Search Command Prompt Input */}
        <div className="px-4 py-3 border-b border-slate-200/50 dark:border-white/5">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-between border transition-all cursor-pointer ${
              isDarkMode ? "bg-white/5 border-white/5 text-slate-400 hover:border-white/15" : "bg-black/5 border-black/5 text-slate-600 hover:bg-black/10"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" /> Search (Ctrl+K)
            </span>
            <span className="opacity-60 text-[9px]">⌘K</span>
          </button>
        </div>

        {/* Navigation Rail */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? "glass-button-primary text-white font-black"
                    : isDarkMode
                      ? "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      : "text-slate-700 hover:bg-black/5 hover:text-black"
                }`}
                id={`nav-${item.id}`}
              >
                <IconComponent className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : isDarkMode ? "text-slate-400" : "text-slate-600"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Small Profile Info & Sign Out */}
        <div className={`p-4 border-t text-[11px] flex flex-col gap-3 border-slate-200/50 dark:border-white/5 ${
          isDarkMode ? "text-slate-400" : "text-slate-700"
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-400/20 text-indigo-500 font-bold uppercase text-[9px] shadow-sm">
              {profile.name ? profile.name.slice(0, 2) : "EX"}
            </div>
            <div className="truncate flex-1">
              <p className={`font-bold leading-none truncate ${isDarkMode ? "text-slate-300" : "text-black"}`}>{profile.name || "Career Explorer"}</p>
              <p className="text-[9px] text-indigo-500/80 mt-0.5 truncate">{profile.targetRole || "Junior Developer"}</p>
            </div>
            <span className="text-[9px] uppercase font-bold bg-indigo-500/10 text-indigo-500 px-1.5 py-0.5 rounded border border-indigo-400/20">
              {userRole}
            </span>
          </div>

          <button
            onClick={handleSignOut}
            className={`w-full text-left px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              isDarkMode ? "hover:bg-red-500/10 hover:text-red-400 text-slate-500" : "hover:bg-red-50 text-red-600 border border-slate-200/80"
            }`}
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out Workspace
          </button>
        </div>

      </aside>

      {/* Mobile Top Navigation Header */}
      <header className={`md:hidden p-4 flex items-center justify-between shrink-0 select-none sticky top-0 z-50 border-b ${
        isDarkMode ? "glass-panel border-white/5 bg-[#080c16]/95" : "bg-white border-slate-200"
      }`}>
        <Logo size="sm" variant="horizontal" theme={isDarkMode ? "dark" : "light"} />

        <div className="flex items-center gap-2">
          {/* Quick theme toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-1.5 rounded cursor-pointer ${isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-indigo-600"}`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1 focus:outline-none cursor-pointer ${isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
            id="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden fixed inset-0 top-[53px] z-40 p-4 space-y-1 overflow-y-auto ${
          isDarkMode ? "glass-panel-heavy bg-slate-950/95" : "bg-white border-b border-slate-200"
        }`}>
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full text-left px-3 py-3 rounded-lg text-xs font-bold flex items-center gap-3 transition-all ${
                  isSelected ? "glass-button-primary text-white font-black" : isDarkMode ? "text-slate-400 hover:bg-white/5" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={handleSignOut}
            className="w-full text-left px-3 py-3 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/5 flex items-center gap-3 border-t border-white/5 mt-3"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out Workspace</span>
          </button>
        </div>
      )}

      {/* Primary Workspace Stage */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 min-w-0 z-10" id="main-stage">
        
        {/* Top Mini Toolbar / Status Indicators */}
        <div className="hidden md:flex justify-between items-center select-none shrink-0" id="top-toolbar">
          <div className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Career Operating System</span>
            <span className="text-indigo-400">•</span>
            <span className={isDarkMode ? "text-indigo-300" : "text-indigo-600"}>Live Workspace Platform</span>
          </div>

          <div className="flex gap-4 items-center">
            {/* Dark/Light mode toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                isDarkMode ? "bg-white/5 border-white/5 text-amber-400 hover:bg-white/10" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
              title="Toggle Dark/Light Theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Display target role indicator */}
            <span className={`text-[10px] px-2.5 py-1 rounded-full border ${
              isDarkMode ? "bg-indigo-950/40 border-white/5 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-700 font-semibold"
            }`}>
              Active Focus: <strong className="text-indigo-500 font-semibold">{profile.targetRole || "Junior Developer"}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Secure Database Sync: Live
            </span>
          </div>
        </div>

        {/* Dynamic Workspace Container */}
        <div className="max-w-7xl mx-auto pb-12" id="module-container">
          {activeTab === "home" && (
            <DashboardHome
              profile={profile}
              onChangeProfile={handleProfileChange}
              onNavigate={handleNavigation}
            />
          )}

          {activeTab === "dna" && (
            <CareerDNA profile={profile} />
          )}

          {activeTab === "assessment" && (
            <CareerAssessment />
          )}

          {activeTab === "roadmap" && (
            <RoadmapGenerator profile={profile} />
          )}

          {activeTab === "gap" && (
            <SkillGapDetection profile={profile} />
          )}

          {activeTab === "resume" && (
            <ResumeBuilder profile={profile} />
          )}

          {activeTab === "heatmap" && (
            <EmploymentHeatMap />
          )}

          {activeTab === "passport" && (
            <SkillPassport />
          )}

          {activeTab === "mentor" && (
            <CareerMentor profile={profile} />
          )}

          {activeTab === "employer" && (
            <EmployerDashboard profile={profile} />
          )}

          {activeTab === "rural" && (
            <RuralSupport
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          )}

          {activeTab === "admin" && (
            <AdminPanel />
          )}
        </div>

      </main>

      {/* GLOBAL COMMAND PALETTE MODAL */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setCommandPaletteOpen(false)}></div>
          <div className="w-full max-w-lg glass-panel-heavy rounded-xl border border-white/10 shadow-2xl relative overflow-hidden z-10 flex flex-col max-h-[50vh]">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  value={paletteQuery}
                  onChange={(e) => setPaletteQuery(e.target.value)}
                  placeholder="Search pages, roadmaps, or diagnostic modules..."
                  className="w-full bg-transparent focus:outline-none text-slate-200 text-xs font-semibold placeholder-slate-500"
                />
              </div>
              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-[10px] font-mono"
              >
                ESC
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {allPaletteOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    handleNavigation(opt.id);
                    setCommandPaletteOpen(false);
                    setPaletteQuery("");
                  }}
                  className="w-full text-left p-2.5 rounded-lg text-xs font-semibold hover:bg-white/5 text-slate-300 flex justify-between items-center group transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-bold group-hover:text-indigo-400 transition-colors">{opt.label}</span>
                    <span className="text-[9px] text-slate-500">{opt.cat}</span>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Jump ➔</span>
                </button>
              ))}
              {allPaletteOptions.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500 font-medium leading-relaxed">
                  No matching workspace tools found. Try searching for "DNA", "Aptitude", "Gap", or "Employer".
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/5 bg-slate-950/40 text-[9px] text-slate-500 text-center font-bold uppercase tracking-wider">
              Search workspace tools or use keyboard arrow keys to navigate
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
