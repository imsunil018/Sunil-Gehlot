import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 md:py-32 relative z-10 bg-[#06060e] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[500px] h-[200px] md:h-[300px] bg-violet-600/[0.08] rounded-full blur-[100px]" />
      </div>

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 40%, rgba(34,211,238,0.25) 60%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-5">
            Let's work together
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-5 tracking-tight leading-tight text-white">
            Got a project in mind?
          </h2>
          <p className="text-base sm:text-lg text-neutral-500 mb-8 md:mb-10 leading-relaxed">
            Open to freelance projects and full-time remote roles. If you have
            something worth building, I'd genuinely like to hear about it.
          </p>
          <Link
            href="/contact"
            data-testid="cta-get-in-touch"
            className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors group shadow-[0_0_40px_rgba(255,255,255,0.08)]"
          >
            Get in touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
