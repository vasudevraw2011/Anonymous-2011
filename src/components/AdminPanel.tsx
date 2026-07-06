import React, { useState } from "react";
import { Users, BookOpen, Briefcase, Award, Shield, FileText, Settings, Sparkles, Trash2, PlusCircle, Check, AlertCircle, TrendingUp, DollarSign } from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "employer" | "admin";
  status: "active" | "pending";
}

interface AdminQuestion {
  id: number;
  category: string;
  questionText: string;
}

interface AdminJob {
  id: string;
  title: string;
  company: string;
  applicants: number;
  status: "open" | "closed";
}

interface AdminEmployer {
  id: string;
  name: string;
  companyName: string;
  status: "approved" | "pending";
}

export default function AdminPanel() {
  const [activeSubTab, setActiveSubTab] = useState<"users" | "questions" | "jobs" | "employers" | "skills" | "analytics">("analytics");

  // Admin Mock States
  const [users, setUsers] = useState<AdminUser[]>([
    { id: "u1", name: "Amit Patel", email: "amit.patel@vocational.edu", role: "student", status: "active" },
    { id: "u2", name: "Sarah Connor", email: "sarah@cyberdyne.io", role: "employer", status: "active" },
    { id: "u3", name: "Vikram Dev", email: "vikram@ruralreach.org", role: "admin", status: "active" },
    { id: "u4", name: "Ravi Teja", email: "ravi@agritech.co", role: "employer", status: "pending" },
    { id: "u5", name: "Priya Sharma", email: "priya@gmail.com", role: "student", status: "active" }
  ]);

  const [questions, setQuestions] = useState<AdminQuestion[]>([
    { id: 1, category: "Career Interests", questionText: "What type of project environment excites you the most when starting a new venture?" },
    { id: 2, category: "Problem Solving", questionText: "How do you handle a system bug or logic flow that fails to output correctly?" },
    { id: 3, category: "Communication", questionText: "What is your primary methodology to explain an abstract software architecture?" }
  ]);

  const [jobs, setJobs] = useState<AdminJob[]>([
    { id: "j1", title: "Junior React Developer", company: "Cyberdyne Systems", applicants: 12, status: "open" },
    { id: "j2", title: "Agri-Tech Smart Farm Engineer", company: "RuralReach IoT Labs", applicants: 8, status: "open" },
    { id: "j3", title: "Technical Support Analyst", company: "GlobalTech BPO", applicants: 4, status: "open" }
  ]);

  const [employers, setEmployers] = useState<AdminEmployer[]>([
    { id: "emp1", name: "Sarah Connor", companyName: "Cyberdyne Systems", status: "approved" },
    { id: "emp2", name: "Ravi Teja", companyName: "AgriTech Solutions", status: "pending" },
    { id: "emp3", name: "Devendra Singh", companyName: "Grameen Logistics Ltd", status: "pending" }
  ]);

  const [skills, setSkills] = useState<string[]>([
    "React", "TypeScript", "Node.js", "Python Basics", "Agri-Tech IoT", "Distributed Systems", "Data Structures"
  ]);

  // Form Inputs
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "student" as "student" | "employer" });
  const [newQuestion, setNewQuestion] = useState({ category: "Problem Solving", questionText: "" });
  const [newJob, setNewJob] = useState({ title: "", company: "" });
  const [newSkill, setNewSkill] = useState("");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.name && newUser.email) {
      const u: AdminUser = {
        id: `u-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "active"
      };
      setUsers([...users, u]);
      setNewUser({ name: "", email: "", role: "student" });
    }
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.questionText) {
      const q: AdminQuestion = {
        id: questions.length + 1,
        category: newQuestion.category,
        questionText: newQuestion.questionText
      };
      setQuestions([...questions, q]);
      setNewQuestion({ category: "Problem Solving", questionText: "" });
    }
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (newJob.title && newJob.company) {
      const j: AdminJob = {
        id: `j-${Date.now()}`,
        title: newJob.title,
        company: newJob.company,
        applicants: 0,
        status: "open"
      };
      setJobs([...jobs, j]);
      setNewJob({ title: "", company: "" });
    }
  };

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const handleApproveEmployer = (id: string) => {
    setEmployers(employers.map(emp => emp.id === id ? { ...emp, status: "approved" } : emp));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleExportData = () => {
    const dataToExport = { users, questions, jobs, employers, skills };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "career_dna_admin_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="admin-workspace-shell">
      {/* Banner */}
      <div className="glass-panel rounded-xl p-6 shadow-sm border border-white/5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-transparent opacity-60 pointer-events-none"></div>
        <div className="space-y-1 relative z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2" id="admin-header-title">
            <Shield className="w-5.5 h-5.5 text-rose-500 animate-pulse" /> Admin Command Center
          </h2>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Monitor and administer system variables, candidate profiles, active job listings, employer registry validation, and diagnostic metrics.
          </p>
        </div>
        <button
          onClick={handleExportData}
          className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 self-start md:self-auto"
          id="btn-admin-export"
        >
          <FileText className="w-3.5 h-3.5" /> Export DB Schema
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-2" id="admin-subtabs">
        {[
          { id: "analytics", label: "Analytics Overview", icon: TrendingUp },
          { id: "users", label: "Manage Users", icon: Users },
          { id: "questions", label: "Diagnostic Questions", icon: BookOpen },
          { id: "jobs", label: "System Jobs", icon: Briefcase },
          { id: "employers", label: "Employer Approvals", icon: Shield },
          { id: "skills", label: "Ontology Skills", icon: Award }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? "bg-rose-600/20 border border-rose-500/40 text-rose-200"
                  : "bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active Sub-tab Content Workspace */}
      <div className="space-y-6" id="admin-active-panel">
        
        {activeSubTab === "analytics" && (
          <div className="space-y-6 animate-fadeIn">
            {/* KPI Widgets */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Total Registered Users</span>
                <span className="text-2xl font-black text-white block">{users.length}</span>
                <span className="text-[9px] text-emerald-400 font-bold block">▲ +12% this month</span>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Active Question Count</span>
                <span className="text-2xl font-black text-white block">{questions.length}</span>
                <span className="text-[9px] text-slate-500 font-bold block">Aptitude-Verified</span>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">System Open Jobs</span>
                <span className="text-2xl font-black text-white block">{jobs.length}</span>
                <span className="text-[9px] text-sky-400 font-bold block">{jobs.filter(j => j.status === "open").length} Active Slots</span>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Verified Skill Passports</span>
                <span className="text-2xl font-black text-white block">340+</span>
                <span className="text-[9px] text-emerald-400 font-bold block">100% cryptographic ledger</span>
              </div>
            </div>

            {/* Quick Summary Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-panel p-5 rounded-xl space-y-3">
                <h4 className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5 border-b border-white/5 pb-2">
                  System Demographics
                </h4>
                <div className="space-y-2 text-xs font-semibold text-slate-300">
                  <div className="flex justify-between p-2 bg-white/5 rounded">
                    <span>Total Students</span>
                    <span className="text-indigo-400 font-bold">{users.filter(u => u.role === "student").length}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white/5 rounded">
                    <span>Active Employers</span>
                    <span className="text-emerald-400 font-bold">{employers.filter(e => e.status === "approved").length}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white/5 rounded">
                    <span>Pending Business Registrations</span>
                    <span className="text-amber-400 font-bold">{employers.filter(e => e.status === "pending").length}</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-xl space-y-3">
                <h4 className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5 border-b border-white/5 pb-2">
                  Telemetry Health Logs
                </h4>
                <div className="space-y-2 text-[10px] font-mono text-slate-500">
                  <div className="flex justify-between">
                    <span>[SYS] Server database listening on port 3000</span>
                    <span className="text-emerald-400">ONLINE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>[AI] Gemini 3.5-flash response model linked</span>
                    <span className="text-emerald-400">READY</span>
                  </div>
                  <div className="flex justify-between">
                    <span>[SEC] Cryptographic blockchain ledgers hashing</span>
                    <span className="text-emerald-400">SYNCED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === "users" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            {/* Users list (Left 2 columns) */}
            <div className="lg:col-span-2 glass-panel p-5 rounded-xl space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2">System Accounts</h3>
              <div className="space-y-2">
                {users.map(u => (
                  <div key={u.id} className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between text-xs font-medium">
                    <div>
                      <span className="font-bold text-slate-200 block">{u.name}</span>
                      <span className="text-slate-400 text-[10px] block">{u.email}</span>
                      <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded uppercase font-bold mt-1 ${
                        u.role === "admin" ? "bg-red-500/10 text-red-400" :
                        u.role === "employer" ? "bg-amber-500/10 text-amber-400" : "bg-indigo-500/10 text-indigo-400"
                      }`}>{u.role}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Create User Form (Right 1 column) */}
            <div className="glass-panel p-5 rounded-xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-rose-400" /> Create Account
              </h3>
              <form onSubmit={handleAddUser} className="space-y-3 font-medium text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full glass-input px-3 py-1.5 rounded focus:outline-none"
                    placeholder="e.g., Sarah Jenkins"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Email address</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full glass-input px-3 py-1.5 rounded focus:outline-none"
                    placeholder="e.g., sarah@jenkins.org"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">System Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                    className="w-full glass-input px-3 py-1.5 rounded focus:outline-none text-slate-300"
                  >
                    <option value="student">Student/Graduate</option>
                    <option value="employer">Employer</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-rose-600 hover:bg-rose-500 font-bold text-white rounded transition-colors cursor-pointer text-xs"
                >
                  Confirm Account Creation
                </button>
              </form>
            </div>
          </div>
        )}

        {activeSubTab === "questions" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            {/* List */}
            <div className="lg:col-span-2 glass-panel p-5 rounded-xl space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2">Active Assessments</h3>
              <div className="space-y-2">
                {questions.map(q => (
                  <div key={q.id} className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-start justify-between text-xs leading-normal font-medium gap-3">
                    <div>
                      <span className="inline-block px-1.5 py-0.5 text-[8px] bg-rose-500/10 text-rose-400 rounded font-bold uppercase tracking-wider mb-1">
                        {q.category}
                      </span>
                      <p className="text-slate-200">{q.questionText}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded shrink-0 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add question Form */}
            <div className="glass-panel p-5 rounded-xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-rose-400" /> Insert Assessment Question
              </h3>
              <form onSubmit={handleAddQuestion} className="space-y-3 font-medium text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Category Domain</label>
                  <select
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                    className="w-full glass-input px-3 py-1.5 rounded focus:outline-none text-slate-300"
                  >
                    <option value="Problem Solving">Problem Solving</option>
                    <option value="Communication">Communication</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Creativity">Creativity</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Question Description</label>
                  <textarea
                    required
                    rows={3}
                    value={newQuestion.questionText}
                    onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
                    className="w-full glass-input px-3 py-1.5 rounded focus:outline-none resize-none"
                    placeholder="Enter full question text details..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-rose-600 hover:bg-rose-500 font-bold text-white rounded transition-colors cursor-pointer text-xs"
                >
                  Deploy Question
                </button>
              </form>
            </div>
          </div>
        )}

        {activeSubTab === "jobs" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            <div className="lg:col-span-2 glass-panel p-5 rounded-xl space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2">Platform Active Jobs</h3>
              <div className="space-y-2">
                {jobs.map(j => (
                  <div key={j.id} className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between text-xs font-medium">
                    <div>
                      <span className="font-bold text-slate-200 block">{j.title}</span>
                      <span className="text-slate-400 text-[10px] block">{j.company}</span>
                      <span className="text-[9px] text-indigo-400 block mt-1">{j.applicants} Candidates Applied</span>
                    </div>
                    <button
                      onClick={() => handleDeleteJob(j.id)}
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-rose-400" /> Insert Vacancy
              </h3>
              <form onSubmit={handleAddJob} className="space-y-3 font-medium text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    className="w-full glass-input px-3 py-1.5 rounded focus:outline-none"
                    placeholder="e.g., Senior Node Developer"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Company Host</label>
                  <input
                    type="text"
                    required
                    value={newJob.company}
                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                    className="w-full glass-input px-3 py-1.5 rounded focus:outline-none"
                    placeholder="e.g., AgriTech Solutions"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-rose-600 hover:bg-rose-500 font-bold text-white rounded transition-colors cursor-pointer text-xs"
                >
                  Deploy Vacancy
                </button>
              </form>
            </div>
          </div>
        )}

        {activeSubTab === "employers" && (
          <div className="glass-panel p-5 rounded-xl space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2">Employer Verification Board</h3>
            <div className="space-y-2">
              {employers.map(emp => (
                <div key={emp.id} className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between text-xs font-semibold">
                  <div>
                    <span className="font-bold text-slate-200 block">{emp.name}</span>
                    <span className="text-slate-400 text-[10px] block">{emp.companyName}</span>
                    <span className={`inline-block text-[9px] px-2 py-0.5 rounded uppercase font-bold mt-1 ${
                      emp.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>{emp.status}</span>
                  </div>
                  {emp.status === "pending" && (
                    <button
                      onClick={() => handleApproveEmployer(emp.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 font-bold text-white rounded text-[10px] cursor-pointer flex items-center gap-1 transition-all"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve Employer
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === "skills" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            <div className="lg:col-span-2 glass-panel p-5 rounded-xl space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2">Platform Skill Ontology</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded bg-rose-500/5 text-rose-300 border border-rose-500/20 text-xs font-bold uppercase tracking-wider">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-rose-400" /> Register Skill Tag
              </h3>
              <form onSubmit={handleAddSkill} className="space-y-3 font-medium text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Skill Tag Title</label>
                  <input
                    type="text"
                    required
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="w-full glass-input px-3 py-1.5 rounded focus:outline-none"
                    placeholder="e.g., PyTorch Fine-Tuning"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-rose-600 hover:bg-rose-500 font-bold text-white rounded transition-colors cursor-pointer text-xs"
                >
                  Add Skill Tag
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
