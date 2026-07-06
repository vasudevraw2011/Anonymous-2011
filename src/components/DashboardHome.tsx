import React, { useState } from "react";
import { CareerProfile } from "../types";
import {
  User,
  GraduationCap,
  Briefcase,
  Sparkles,
  Award,
  Trash,
  Plus,
  CheckCircle,
  Clock,
  Check,
  ListTodo,
  GraduationCap as CourseIcon,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Sliders,
  Compass,
  ArrowUpRight
} from "lucide-react";

interface DashboardHomeProps {
  profile: CareerProfile;
  onChangeProfile: (profile: CareerProfile) => void;
  onNavigate: (tab: string) => void;
}

export default function DashboardHome({ profile, onChangeProfile, onNavigate }: DashboardHomeProps) {
  const [newSkill, setNewSkill] = useState("");
  const [goals, setGoals] = useState([
    { id: "g1", text: "Complete the Career Suitability Diagnostic", done: true },
    { id: "g2", text: "Add 3 custom skills tag in profile", done: false },
    { id: "g3", text: "Compile high-integrity ATS Resume in Markdown", done: false },
    { id: "g4", text: "Review employment heat maps in target city", done: false }
  ]);
  const [newGoalText, setNewGoalText] = useState("");

  const handleAddField = (field: keyof CareerProfile, value: any) => {
    onChangeProfile({
      ...profile,
      [field]: value,
    });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      onChangeProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    onChangeProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    });
  };

  const handleToggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalText.trim()) {
      setGoals([...goals, { id: `g-${Date.now()}`, text: newGoalText.trim(), done: false }]);
      setNewGoalText("");
    }
  };

  // Metrics calculators
  const skillsCount = profile.skills.length;
  const progressPercentage = Math.min(100, Math.round(
    ((profile.name ? 10 : 0) +
     (profile.education ? 10 : 0) +
     (profile.experience ? 10 : 0) +
     (skillsCount * 10) +
     (profile.targetRole ? 10 : 0) +
     (goals.filter(g => g.done).length * 10))
  ));

  return (
    <div className="space-y-8 animate-fadeIn" id="dashboard-home-root">
      
      {/* Top grid of main KPI Scores - Apple iOS 26 Liquid Glass Super Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="dashboard-kpi-grid">
        
        {/* Welcome Dashboard and Progress Card */}
        <div className="md:col-span-2 relative overflow-hidden rounded-3xl glass-panel p-6 shadow-xl border border-black/5 dark:border-white/10 flex flex-col justify-between group transition-all duration-300">
          {/* Liquid Reflection Gradients */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-sky-500/5 to-purple-500/10 opacity-70 pointer-events-none"></div>
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none rounded-t-3xl"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/20 text-indigo-600 dark:text-indigo-300 text-[10px] font-black uppercase tracking-wider shadow-[0_4px_12px_rgba(99,102,241,0.12)]">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 animate-pulse" /> Career DNA Workspace
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                iOS 26 Liquid Core
              </span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-display font-black bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 dark:from-white dark:via-slate-100 dark:to-indigo-100 bg-clip-text text-transparent leading-tight tracking-tight">
                Welcome, {profile.name || "Explorer"}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-medium">
                Your profile is updating in real time. Feed high-integrity tags to compile custom-fit micro-sprints and unlock regional recruiter access.
              </p>
            </div>
          </div>

          <div className="pt-6 space-y-2 relative z-10 font-medium">
            <div className="flex justify-between items-end text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-bold">Profile Integrity Rating</span>
              <span className="bg-gradient-to-r from-indigo-600 to-sky-600 dark:from-indigo-400 dark:to-sky-400 bg-clip-text text-transparent font-black text-sm">
                {progressPercentage}% Completed
              </span>
            </div>
            {/* iOS 26 High Sheen Battery-style Frosted Progress Container */}
            <div className="w-full bg-slate-200/80 dark:bg-[#040812]/75 rounded-full p-0.5 h-3.5 border border-black/5 dark:border-white/8 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex items-center overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 h-2 rounded-full transition-all duration-700 ease-out relative shadow-[0_0_12px_rgba(56,189,248,0.4)]" 
                style={{ width: `${progressPercentage}%` }}
              >
                {/* Dynamic Shine Wave inside Progress Bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Match Score Widget */}
        <div className="relative overflow-hidden rounded-3xl glass-panel p-6 shadow-xl border border-black/5 dark:border-white/10 flex flex-col justify-between group transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none rounded-t-3xl"></div>
          
          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest block">Role Fit Matrix</span>
              <Compass className="w-4 h-4 text-indigo-500 dark:text-indigo-400 animate-spin-slow" />
            </div>
            
            {/* Glossy numeric circular aura */}
            <div className="py-2 flex items-baseline gap-1">
              <span className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white drop-shadow-[0_2px_15px_rgba(99,102,241,0.4)]">
                94%
              </span>
              <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400">match</span>
            </div>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Synchronized mapping across cognitive, technical readiness, and cultural value indices.
            </p>
          </div>
          
          <button 
            onClick={() => onNavigate("dna")} 
            className="relative z-10 mt-4 text-left text-[10px] font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors uppercase tracking-widest flex items-center gap-1 cursor-pointer"
          >
            Explore Suitability <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Skill Gap Readiness Score Widget */}
        <div className="relative overflow-hidden rounded-3xl glass-panel p-6 shadow-xl border border-black/5 dark:border-white/10 flex flex-col justify-between group transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none rounded-t-3xl"></div>
          
          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest block">Skills Passport Index</span>
              <Award className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            </div>
            
            <div className="py-2 flex items-baseline gap-1">
              <span className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white drop-shadow-[0_2px_15px_rgba(16,185,129,0.4)]">
                78%
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">ready</span>
            </div>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Based on active corporate requirements match against your registered tech skills.
            </p>
          </div>
          
          <button 
            onClick={() => onNavigate("gap")} 
            className="relative z-10 mt-4 text-left text-[10px] font-black text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors uppercase tracking-widest flex items-center gap-1 cursor-pointer"
          >
            Audit Skill Gaps <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 columns: Goals, recommended courses, and quick actions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Sprints & Goals Checklist - iOS Reminders Styling */}
          <div className="relative overflow-hidden rounded-3xl glass-panel p-6 shadow-lg border border-black/5 dark:border-white/8 space-y-4 group">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"></div>
            
            <h3 className="text-xs uppercase tracking-widest font-black text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200/50 dark:border-white/5 pb-3">
              <ListTodo className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400" /> My Upcoming Sprints & Goals
            </h3>
            
            <div className="space-y-3">
              {goals.map(g => (
                <button
                  key={g.id}
                  onClick={() => handleToggleGoal(g.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs flex items-center justify-between transition-all duration-300 cursor-pointer ${
                    g.done
                      ? "bg-indigo-500/5 border-indigo-500/10 text-slate-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] line-through"
                      : "bg-white/40 dark:bg-white/[0.03] border-slate-200/50 dark:border-white/5 text-slate-800 dark:text-slate-200 hover:border-black/10 hover:dark:border-white/12 hover:bg-white/60 dark:hover:bg-white/[0.05] hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Apple Style Circular Check Button */}
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      g.done 
                        ? "bg-gradient-to-tr from-indigo-500 to-indigo-600 border-indigo-400 text-white shadow-[0_2px_8px_rgba(99,102,241,0.4)]" 
                        : "border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-black/20 hover:border-indigo-500"
                    }`}>
                      {g.done && <Check className="w-3.5 h-3.5" />}
                    </span>
                    <span className={`font-medium tracking-wide ${g.done ? "line-through opacity-50" : ""}`}>{g.text}</span>
                  </div>
                  {g.done ? (
                    <span className="text-[9px] uppercase tracking-widest bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 font-bold px-2 py-0.5 rounded">Completed</span>
                  ) : (
                    <span className="text-[9px] uppercase tracking-widest bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-bold px-2 py-0.5 rounded">Active Sprint</span>
                  )}
                </button>
              ))}
            </div>

            {/* Frosted Input pill with dynamic action button */}
            <form onSubmit={handleAddGoal} className="flex gap-3 pt-3">
              <input
                type="text"
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                className="flex-1 glass-input px-4 py-3 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none rounded-2xl border border-black/5 dark:border-white/8 shadow-inner"
                placeholder="Schedule new career goal or micro-sprint..."
              />
              <button
                type="submit"
                className="px-5 py-3 glass-button-primary text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-lg hover:scale-103 active:scale-97"
              >
                <Plus className="w-4 h-4" /> Add Goal
              </button>
            </form>
          </div>

          {/* Recommended Learning Paths & Jobs - iOS Smart Stacks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recommended Learning Paths */}
            <div className="relative overflow-hidden rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/8 space-y-4">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"></div>
              
              <h4 className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 tracking-widest flex items-center gap-1.5 border-b border-slate-200/50 dark:border-white/5 pb-2.5">
                <CourseIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400 animate-pulse" /> Recommended Courses
              </h4>
              <div className="space-y-3 font-medium text-xs">
                
                <div className="p-3.5 bg-white/50 dark:bg-white/[0.02] rounded-2xl border border-black/5 dark:border-white/5 hover:border-indigo-500/20 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300 group">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] px-2 py-0.5 rounded-full uppercase font-black bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 tracking-wider">
                      Front-End
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">4 weeks</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mt-2 tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors">
                    Vite React Workspace Architectures
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">Provider: Coursera Academy • Free</span>
                </div>

                <div className="p-3.5 bg-white/50 dark:bg-white/[0.02] rounded-2xl border border-black/5 dark:border-white/5 hover:border-indigo-500/20 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300 group">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] px-2 py-0.5 rounded-full uppercase font-black bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 tracking-wider">
                      Node REST API
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">3 weeks</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mt-2 tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors">
                    Advanced Express proxy backend pipelines
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">Provider: Google Skills Boost • Free</span>
                </div>

              </div>
            </div>

            {/* Simulated Job Vacancies */}
            <div className="relative overflow-hidden rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/8 space-y-4">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"></div>
              
              <h4 className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 tracking-widest flex items-center gap-1.5 border-b border-slate-200/50 dark:border-white/5 pb-2.5">
                <Briefcase className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Target Job Matching
              </h4>
              <div className="space-y-3 font-medium text-xs">
                
                <div className="p-3.5 bg-white/50 dark:bg-white/[0.02] rounded-2xl border border-black/5 dark:border-white/5 hover:border-emerald-500/20 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300 group relative">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] px-2 py-0.5 rounded-full uppercase font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 tracking-wider">
                      Full-time Remote
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mt-2 tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors">
                    Junior React Frontend Developer
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">Cyberdyne Systems • Est. $75k - $95k</span>
                </div>

                <div className="p-3.5 bg-white/50 dark:bg-white/[0.02] rounded-2xl border border-black/5 dark:border-white/5 hover:border-emerald-500/20 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300 group relative">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] px-2 py-0.5 rounded-full uppercase font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 tracking-wider">
                      Regional Smart IoT
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mt-2 tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors">
                    Agri-Tech Smart Farm Integrator
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">RuralReach IoT Labs • Est. ₹8L - ₹12L</span>
                </div>

              </div>
            </div>
          </div>

          {/* Interactive Profile Editor - iOS Settings Canvas styling */}
          <div className="relative overflow-hidden rounded-3xl glass-panel p-6 shadow-lg border border-black/5 dark:border-white/8 space-y-6">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"></div>
            
            <div className="border-b border-slate-200/50 dark:border-white/5 pb-4">
              <h2 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-widest">
                <User className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400" /> Edit Your Career Profile Parameters
              </h2>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-medium leading-relaxed">
                Your credentials fuel the AI Career DNA suite. Keep these variables current for high-accuracy roadmaps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleAddField("name", e.target.value)}
                  className="w-full glass-input rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-slate-200 focus:outline-none border border-black/5 dark:border-white/8 transition-colors"
                  placeholder="e.g., Amit Patel"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Target Career Role</label>
                <input
                  type="text"
                  value={profile.targetRole}
                  onChange={(e) => handleAddField("targetRole", e.target.value)}
                  className="w-full glass-input rounded-2xl px-4 py-3 text-xs text-indigo-700 dark:text-indigo-300 focus:outline-none border border-black/5 dark:border-white/8 transition-colors font-semibold"
                  placeholder="e.g., Junior Full-Stack Web Developer"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Education Background</label>
              <input
                type="text"
                value={profile.education}
                onChange={(e) => handleAddField("education", e.target.value)}
                className="w-full glass-input rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-slate-200 focus:outline-none border border-black/5 dark:border-white/8 transition-colors"
                placeholder="e.g., Diploma in Information Technology (Rural Polytechnic)"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Previous Experience & Built Projects</label>
              <textarea
                value={profile.experience}
                onChange={(e) => handleAddField("experience", e.target.value)}
                rows={3}
                className="w-full glass-input rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-slate-200 focus:outline-none border border-black/5 dark:border-white/8 transition-colors resize-none leading-relaxed"
                placeholder="List projects, vocational work, school tasks, or work experience..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">My Interests & Passion</label>
                <input
                  type="text"
                  value={profile.interests}
                  onChange={(e) => handleAddField("interests", e.target.value)}
                  className="w-full glass-input rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-slate-200 focus:outline-none border border-black/5 dark:border-white/8 transition-colors"
                  placeholder="e.g., Smart tech, agriculture, web tools"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Personality Traits</label>
                <input
                  type="text"
                  value={profile.personality}
                  onChange={(e) => handleAddField("personality", e.target.value)}
                  className="w-full glass-input rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-slate-200 focus:outline-none border border-black/5 dark:border-white/8 transition-colors"
                  placeholder="e.g., Analytical, empathetic, hardworking"
                />
              </div>
            </div>

            {/* Tag-based Skill Manager - Beautiful iOS 26 dynamic liquid pills */}
            <div className="pt-2">
              <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2.5">My Skill Tags</label>
              <div className="flex flex-wrap gap-2.5 mb-4">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-950/40 border border-indigo-500/20 dark:border-white/10 text-xs text-indigo-700 dark:text-slate-200 font-medium backdrop-blur-md shadow-md transition-transform duration-200 hover:scale-105"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-rose-500 dark:text-slate-500 hover:dark:text-rose-400 transition-colors focus:outline-none cursor-pointer"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                {profile.skills.length === 0 && (
                  <span className="text-xs text-slate-500 italic font-medium">No skill tags added yet. Insert some below!</span>
                )}
              </div>

              <form onSubmit={handleAddSkill} className="flex gap-3 max-w-md">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 glass-input rounded-2xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none border border-black/5 dark:border-white/8 transition-colors"
                  placeholder="Add skill (e.g., React, Git, IoT)"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 glass-button-primary text-white rounded-2xl text-xs font-bold flex items-center gap-1 cursor-pointer hover:scale-103 active:scale-97 transition-transform"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Right 1 column: Recent Activities & achievements */}
        <div className="space-y-6">
          
          {/* Achievements Passport Badges - iOS Wallet Style Cards */}
          <div className="relative overflow-hidden rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/8 space-y-4">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"></div>
            
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-b border-slate-200/50 dark:border-white/5 pb-2.5">
              <Award className="w-4.5 h-4.5 text-emerald-500 dark:text-emerald-400" /> Digital Passport Badges
            </h3>
            
            <div className="grid grid-cols-2 gap-3 text-center text-[10px] font-bold">
              
              {/* Double-layer Glass badging */}
              <div className="relative overflow-hidden p-3.5 bg-emerald-500/5 dark:bg-gradient-to-br dark:from-white/[0.04] dark:to-transparent rounded-2xl border border-emerald-500/20 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 space-y-1.5 shadow-[0_8px_20px_rgba(16,185,129,0.06)] dark:shadow-[0_8px_20px_rgba(16,185,129,0.15)] group transition-transform duration-300 hover:scale-105 hover:border-emerald-500/40">
                <div className="absolute top-0 inset-x-0 h-[0.5px] bg-white/20"></div>
                <span className="text-2xl block drop-shadow-[0_4px_8px_rgba(16,185,129,0.3)]">🛡️</span>
                <span className="block tracking-wide">Git Essentials</span>
              </div>
              
              <div className="relative overflow-hidden p-3.5 bg-emerald-500/5 dark:bg-gradient-to-br dark:from-white/[0.04] dark:to-transparent rounded-2xl border border-emerald-500/20 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 space-y-1.5 shadow-[0_8px_20px_rgba(16,185,129,0.06)] dark:shadow-[0_8px_20px_rgba(16,185,129,0.15)] group transition-transform duration-300 hover:scale-105 hover:border-emerald-500/40">
                <div className="absolute top-0 inset-x-0 h-[0.5px] bg-white/20"></div>
                <span className="text-2xl block drop-shadow-[0_4px_8px_rgba(16,185,129,0.3)]">⚡</span>
                <span className="block tracking-wide">JS Algorithms</span>
              </div>
              
              <div className="relative overflow-hidden p-3.5 bg-slate-100 dark:bg-white/[0.01] rounded-2xl border border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-600 space-y-1.5 opacity-60">
                <span className="text-2xl block grayscale opacity-45">🔥</span>
                <span className="block tracking-wide">React Core</span>
                <span className="text-[8px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400/75 bg-indigo-500/10 py-0.5 rounded-full block max-w-[50px] mx-auto">Pending</span>
              </div>
              
              <div className="relative overflow-hidden p-3.5 bg-slate-100 dark:bg-white/[0.01] rounded-2xl border border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-600 space-y-1.5 opacity-60">
                <span className="text-2xl block grayscale opacity-45">🚀</span>
                <span className="block tracking-wide">Node Engineer</span>
                <span className="text-[8px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400/75 bg-indigo-500/10 py-0.5 rounded-full block max-w-[50px] mx-auto">Pending</span>
              </div>

            </div>
          </div>

          {/* Active Diagnostic Status Panel - Apple Action Sheet Card */}
          <div className="relative overflow-hidden rounded-3xl glass-panel p-5 border border-indigo-500/20 space-y-4 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/35 to-transparent pointer-events-none"></div>
            
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px] flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> Active Suitability Diagnostic
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
              Verify your cognitive indices across problem solving, analytical agility, and interpersonal teamwork dimensions today.
            </p>
            
            <button
              onClick={() => onNavigate("assessment")}
              className="w-full py-3 bg-indigo-500/10 hover:bg-indigo-500/20 dark:bg-indigo-500/15 dark:hover:bg-indigo-500/25 border border-indigo-500/25 text-indigo-600 dark:text-indigo-300 font-black text-xs rounded-2xl transition-all duration-300 cursor-pointer text-center block shadow-[0_4px_12px_rgba(99,102,241,0.06)] dark:shadow-[0_4px_12px_rgba(99,102,241,0.15)] hover:scale-102 active:scale-98 tracking-wider"
            >
              Take 20-Question Diagnostic
            </button>
          </div>

          {/* Recent Activity Log list - Apple Logs console aesthetic */}
          <div className="relative overflow-hidden rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/8 space-y-4 shadow-md">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"></div>
            
            <h4 className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 tracking-widest border-b border-slate-200/50 dark:border-white/5 pb-2.5">
              Recent Activity Logs
            </h4>
            <div className="space-y-3.5 text-[10px] font-mono text-slate-500">
              
              <div className="flex gap-2.5 items-start">
                <Clock className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400/80 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-slate-800 dark:text-slate-300 leading-tight font-medium">Career profile parameters synchronized</p>
                  <span className="text-slate-400 dark:text-slate-600 font-bold">July 03, 2026 • 09:59 AM</span>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-500 dark:text-emerald-400/80 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-slate-800 dark:text-slate-300 leading-tight font-medium">State Vocational Academy badge parsed</p>
                  <span className="text-slate-400 dark:text-slate-600 font-bold">June 25, 2026 • 02:40 PM</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
