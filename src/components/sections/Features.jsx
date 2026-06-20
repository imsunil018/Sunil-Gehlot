import { motion } from "framer-motion";
import { Link, BarChart3, Layout, Globe, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Link,
    title: "Smart Links",
    description:
      "Intelligent routing, A/B testing, and deep linking across all platforms. Send your audience exactly where they need to go.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Understand your audience with real-time insights, geographic data, and conversion tracking.",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Layout,
    title: "Portfolio Showcase",
    description:
      "Beautifully present your best work, case studies, and projects in a premium, distraction-free environment.",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Globe,
    title: "Personal Branding",
    description:
      "Custom domains, bespoke themes, and pixel-perfect typography to match your unique identity.",
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Users,
    title: "Social Hub",
    description:
      "Aggregate all your social feeds, newsletters, and communities into a single, cohesive feed.",
    color: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-400",
  },
  {
    icon: Zap,
    title: "Creator Tools",
    description:
      "Monetize your audience with built-in tipping, digital products, and exclusive content gates.",
    color: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-400",
  },
];

export function Features() {
  return (
    <section className="py-32 relative z-10 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-4"
          >
            Everything you need. <br className="hidden md:block" />
            <span className="text-muted-foreground">Nothing you don't.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-card border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
