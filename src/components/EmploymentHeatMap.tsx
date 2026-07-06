import React, { useState } from "react";
import { MOCK_HEAT_MAP } from "../data";
import { HeatMapNode } from "../types";
import { MapPin, TrendingUp, DollarSign, Activity, ShieldAlert } from "lucide-react";

export default function EmploymentHeatMap() {
  const [selectedNode, setSelectedNode] = useState<HeatMapNode>(MOCK_HEAT_MAP[1]); // Default to Bangalore
  const [searchFilter, setSearchFilter] = useState("");

  const filteredNodes = MOCK_HEAT_MAP.filter(node => 
    node.cityName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    node.highDemandSkills.some(skill => skill.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fadeIn" id="heatmap-root">
      
      {/* Title block */}
      <div className="glass-panel rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2" id="heatmap-title">
          <Activity className="w-5.5 h-5.5 text-indigo-500 dark:text-indigo-400 animate-pulse" /> Real-Time Employment Heat Map
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium leading-relaxed">
          Monitor global tech clusters, remote employment nodes, local salary trends, and immediate vacancies. Tap on any map locator to unpack active skill demands.
        </p>
      </div>

      {/* Main dashboard splits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Interactive SVG Map (Left 2 columns) */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-3 border-b border-black/5 dark:border-white/5">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Geographical Hiring Coordinates (Live Tracking)</span>
            
            {/* Search filter input */}
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by city or skill..."
              className="glass-input rounded-lg px-3 py-1 text-xs text-slate-800 dark:text-slate-200 focus:outline-none font-medium transition-all"
              id="input-heatmap-search"
            />
          </div>

          {/* Map canvas frame */}
          <div className="relative bg-slate-100 dark:bg-slate-950/60 backdrop-blur-md rounded-lg border border-black/5 dark:border-white/5 h-80 flex items-center justify-center overflow-hidden">
            {/* Decorative Grid Lines / Coordinates */}
            <div className="absolute inset-0 grid grid-cols-12 gap-1 opacity-[0.03]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-slate-500 h-full"></div>
              ))}
            </div>
            
            {/* Abstract World Outline Map using simple CSS vectors */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg viewBox="0 0 1000 500" className="w-full h-full text-slate-400 fill-current">
                <path d="M150,150 Q250,120 350,170 T500,120 T650,200 T800,150 T900,190 T950,300 T850,400 T700,420 T550,380 T350,410 T150,350 Z" />
                <circle cx="200" cy="220" r="40" />
                <circle cx="500" cy="180" r="50" />
                <circle cx="700" cy="350" r="45" />
              </svg>
            </div>

            {/* Glowing Hotspots */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer group"
                  style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                >
                  {/* Glowing Radar Halo */}
                  <span className={`absolute inline-flex h-6 w-6 rounded-full opacity-75 animate-ping ${
                    isSelected ? "bg-indigo-400" : "bg-indigo-500/30"
                  }`}></span>
                  
                  {/* Center Dot */}
                  <span className={`relative flex items-center justify-center rounded-full h-4.5 w-4.5 border transition-all ${
                    isSelected 
                      ? "bg-indigo-500 border-white shadow-lg shadow-indigo-500/50 scale-125" 
                      : "bg-slate-300 dark:bg-slate-900 border-indigo-400/80 hover:bg-indigo-600 hover:border-white"
                  }`}>
                    <MapPin className={`w-2.5 h-2.5 ${isSelected ? "text-white" : "text-indigo-550 dark:text-indigo-400 group-hover:text-white"}`} />
                  </span>

                  {/* Tiny label on hover */}
                  <span className="absolute left-6 top-0 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-black/5 dark:border-white/5 shadow-xl whitespace-nowrap z-30">
                    {node.cityName}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-4 justify-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Active Hub</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 border border-black/5 dark:border-white/5"></span> Inactive Cluster</span>
          </div>
        </div>

        {/* City Info widget panel (Right 1 column) */}
        <div className="glass-panel rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-black/5 dark:border-white/5 pb-3 flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-500 dark:text-indigo-400 tracking-wider">Hiring Hotspot Details</span>
              <h3 className="text-base font-bold text-slate-800 dark:text-white mt-1">{selectedNode.cityName}</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200/50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/5">
              Rank {selectedNode.overallRating} ★
            </span>
          </div>

          <div className="space-y-4 font-medium">
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-bold">Remote Job Openings</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                {selectedNode.remoteOpenings} Vacancies
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-bold">Hiring Industry Growth</span>
              <span className="text-indigo-600 dark:text-indigo-300 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> {selectedNode.industryGrowth}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-bold">Average Compensation</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold flex items-center">
                <DollarSign className="w-3.5 h-3.5 text-slate-500" /> {selectedNode.salaryTrend}
              </span>
            </div>

            <div className="space-y-2 pt-4 border-t border-black/5 dark:border-white/5">
              <span className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">High Demand Skills Today</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.highDemandSkills.map((skill, index) => (
                  <span key={index} className="px-2 py-0.5 rounded bg-black/5 dark:bg-slate-950/60 text-indigo-600 dark:text-indigo-300 border border-black/5 dark:border-white/5 text-[10px] font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-black/5 dark:border-white/5 text-[10px] text-slate-600 dark:text-slate-400 leading-normal flex gap-2 font-medium">
            <ShieldAlert className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5" />
            <span>
              Automation risk index for these core specialties remains low (&lt;8%). Preparing in these skills optimizes long-term employment longevity.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
