import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export function WhySunil() {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-4 text-white"
          >
            The developer difference.
          </motion.h2>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto">
            Why hire a bloated agency when you can work directly with a dedicated full-stack engineer?
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/[0.08] bg-slate-900/30 backdrop-blur-md overflow-hidden"
        >
          <div className="grid grid-cols-3 border-b border-white/[0.08] p-4 sm:p-6 md:p-8 bg-white/[0.01] text-xs sm:text-sm md:text-base font-mono">
            <div className="font-medium text-neutral-500 flex items-center">Scope</div>
            <div className="font-bold text-center text-white flex items-center justify-center">
              Traditional Agency
            </div>
            <div className="font-bold text-center text-violet-400 text-xs sm:text-lg flex items-center justify-center">
              SUNIL GEHLOT (Full-Stack)
            </div>
          </div>

          {[
            {
              feature: "Communication Layer",
              old: "Middlemen & PM delays",
              new: "Direct developer slack & daily updates",
            },
            { 
              feature: "Core Stack Quality", 
              old: "Bloated templates & messy builders", 
              new: "Clean, type-safe Next.js & React" 
            },
            {
              feature: "Timeline Commitments",
              old: "Vague estimates & missed deadlines",
              new: "Milestones, staging builds & clear dates",
            },
            {
              feature: "Code Maintenance",
              old: "Vendor lock-in, unreadable code",
              new: "Self-contained, clean documentation",
            },
            {
              feature: "Pricing Model",
              old: "Hidden fees & markup bloat",
              new: "Fixed pricing, honest transparent hours",
            },
          ].map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 border-b border-white/[0.04] p-4 sm:p-6 md:p-8 items-center hover:bg-white/[0.01] transition-colors text-xs sm:text-sm md:text-base font-sans"
            >
              <div className="font-medium pr-1.5 text-neutral-300">{row.feature}</div>
              <div className="text-center flex flex-col items-center gap-1.5 text-neutral-500">
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500/40" />
                <span className="text-[10px] sm:text-xs leading-tight">{row.old}</span>
              </div>
              <div className="text-center flex flex-col items-center gap-1.5 text-white">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                <span className="text-[10px] sm:text-xs font-semibold leading-tight text-neutral-200">{row.new}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
