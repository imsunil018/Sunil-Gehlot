import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, BarChart3, Radio, Play, Pause, Trash2 } from "lucide-react";

const LOG_TEMPLATES = [
  "GET /api/v1/projects - 200 OK (24ms)",
  "Redis cache hit for :projects_list",
  "Connection pool initialized: 15 active",
  "POST /api/v1/contact - 201 Created (42ms)",
  "Render complete: React Server Components",
  "Database query optimized: index scan on 'projects'",
  "Worker thread pool running healthy",
  "Client handshake successful: SSL TLS v1.3",
  "Sub-100ms response achieved for page bundle",
  "Vite dev HMR compile complete in 18ms",
  "GET /api/v1/skills - 304 Not Modified",
  "Active WebSocket connection established",
];

const metricsData = [
  { label: "Frontend Speed Index", val: "98%", percentage: 98, color: "from-violet-500 to-fuchsia-500" },
  { label: "Backend API Latency", val: "Sub-45ms", percentage: 94, color: "from-cyan-500 to-blue-500" },
  { label: "Uptime SLA Score", val: "99.99%", percentage: 99, color: "from-emerald-500 to-teal-500" },
  { label: "UX Conversion Rate", val: "+24% Lift", percentage: 88, color: "from-rose-500 to-pink-500" }
];

export function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [uptime, setUptime] = useState(99.991);
  const [isLogsPaused, setIsLogsPaused] = useState(false);
  const [logs, setLogs] = useState([
    "[06:00:01] System startup completed successfully.",
    "[06:00:03] PostgreSQL connected on port 5432.",
    "[06:00:05] GET /api/v1/profile - 200 OK (18ms)",
  ]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Spotlight mouse tracker
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Simulate updating uptime counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => +(prev + (Math.random() - 0.5) * 0.0001).toFixed(4));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  // Simulate server logs appending
  useEffect(() => {
    if (isLogsPaused) return;
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      setLogs((prev) => [...prev.slice(-5), `[${timeStr}] ${template}`]);
    }, 2800);
    return () => clearInterval(timer);
  }, [isLogsPaused]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-[430px] bg-slate-950/40 border border-white/[0.08] rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(139,92,246,0.08)] backdrop-blur-xl p-5 relative overflow-hidden text-left transition-all duration-300 hover:border-white/[0.15]"
    >
      {/* Interactive cursor spotlight background */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.12), transparent 75%)`,
        }}
      />

      {/* Glow highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-white/[0.06] pb-3.5 relative z-10">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-400 transition-colors cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors cursor-pointer" />
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] shadow-[0_0_12px_rgba(16,185,129,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-semibold text-emerald-400 font-mono tracking-wide uppercase">
            Live Node Online
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1 mb-5 p-1 rounded-lg bg-white/[0.03] border border-white/[0.04] relative z-10">
        {[
          { id: "overview", label: "Overview", icon: Cpu },
          { id: "logs", label: "Console", icon: Terminal },
          { id: "metrics", label: "Metrics", icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center justify-center gap-1.5 py-2 rounded-md text-[11px] font-semibold tracking-wide transition-all ${
                isActive ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabHighlight"
                  className="absolute inset-0 bg-white/[0.07] border border-white/5 rounded-md shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="min-h-[160px] relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              {/* Stat rows */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  whileHover={{ scale: 1.025, y: -2, borderColor: "rgba(139, 92, 246, 0.25)", backgroundColor: "rgba(139, 92, 246, 0.04)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="p-3 rounded-xl border border-white/[0.05] bg-white/[0.01] transition-all cursor-default"
                >
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                    Ping Latency
                  </div>
                  <div className="text-xl font-bold font-mono text-violet-400 mt-1 flex items-baseline gap-1">
                    24ms
                    <span className="text-[10px] font-normal text-emerald-400 animate-pulse">Stable</span>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.025, y: -2, borderColor: "rgba(34, 211, 238, 0.25)", backgroundColor: "rgba(34, 211, 238, 0.04)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="p-3 rounded-xl border border-white/[0.05] bg-white/[0.01] transition-all cursor-default"
                >
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                    System Uptime
                  </div>
                  <div className="text-xl font-bold font-mono text-cyan-400 mt-1">
                    {uptime}%
                  </div>
                </motion.div>
              </div>

              {/* Live SVG Graph */}
              <motion.div
                whileHover={{ borderColor: "rgba(139, 92, 246, 0.2)" }}
                className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.01] overflow-hidden transition-colors"
              >
                <div className="flex justify-between items-center text-[10px] text-white/40 uppercase tracking-widest font-mono">
                  <span>Server Throughput</span>
                  <span className="flex items-center gap-1 text-violet-400">
                    <Radio className="w-2.5 h-2.5 animate-pulse" /> Live updates
                  </span>
                </div>
                <svg viewBox="0 0 300 80" className="w-full h-16 overflow-visible mt-3">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(258, 86%, 68%)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="hsl(258, 86%, 68%)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="15" x2="300" y2="15" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <line x1="0" y1="65" x2="300" y2="65" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                  {/* Area Under Curve */}
                  <path
                    d="M 0 70 Q 25 35 50 60 T 100 20 T 150 65 T 200 15 T 250 55 T 300 40 L 300 80 L 0 80 Z"
                    fill="url(#chartGrad)"
                  />

                  {/* Main Line */}
                  <motion.path
                    d="M 0 70 Q 25 35 50 60 T 100 20 T 150 65 T 200 15 T 250 55 T 300 40"
                    fill="none"
                    stroke="hsl(258, 86%, 68%)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />

                  {/* Pulsing indicator */}
                  <circle cx="300" cy="40" r="3.5" fill="hsl(197, 68%, 58%)" />
                  <circle cx="300" cy="40" r="8" fill="hsl(197, 68%, 58%)" className="animate-ping" opacity="0.3" />
                </svg>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "logs" && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-2"
            >
              {/* Terminal controls */}
              <div className="flex items-center justify-between px-1 text-[10px] text-white/40">
                <span className="font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  sunil@node-dev:~$
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsLogsPaused(!isLogsPaused)}
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer select-none"
                  >
                    {isLogsPaused ? (
                      <>
                        <Play className="w-2.5 h-2.5 text-emerald-400" />
                        <span>Resume</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-2.5 h-2.5 text-amber-400" />
                        <span>Pause</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setLogs([])}
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400 transition-colors cursor-pointer select-none"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>

              {/* Logs Display */}
              <div className="p-3.5 rounded-xl border border-white/[0.05] bg-black/40 font-mono text-[10.5px] leading-relaxed text-slate-300 min-h-[140px] flex flex-col justify-end">
                <div className="flex flex-col gap-1.5">
                  {logs.length === 0 ? (
                    <div className="text-white/20 text-center py-8 font-mono select-none">
                      Console cleared. Logs paused.
                    </div>
                  ) : (
                    logs.map((log, i) => {
                      let colorClass = "text-white/60";
                      if (log.includes("200") || log.includes("connected")) colorClass = "text-emerald-400";
                      if (log.includes("compile") || log.includes("cache") || log.includes("optimized")) colorClass = "text-violet-400";
                      return (
                        <div key={i} className="truncate select-none">
                          <span className="text-white/30 mr-1.5">{">"}</span>
                          <span className={colorClass}>{log}</span>
                        </div>
                      );
                    })
                  )}
                  <div className="flex items-center gap-1 text-white/30 animate-pulse mt-0.5">
                    <span>$</span>
                    <span className="w-1.5 h-3.5 bg-white/50" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "metrics" && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18 }}
              className="space-y-3.5 p-1"
            >
              {metricsData.map((m) => (
                <div key={m.label} className="space-y-1 group/metric">
                  <div className="flex justify-between text-[11px] font-mono transition-colors">
                    <span className="text-white/50 group-hover/metric:text-white/70">{m.label}</span>
                    <span className="text-white/90 font-semibold group-hover/metric:text-white">{m.val}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/[0.02]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.percentage}%` }}
                      transition={{ duration: 0.85, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${m.color}`}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

