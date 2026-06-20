import { motion } from "framer-motion";

const stats = [
  { value: "10M+", label: "Links Managed" },
  { value: "500K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "100+", label: "Countries" },
];

export function Stats() {
  return (
    <section className="py-24 border-y border-white/5 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
