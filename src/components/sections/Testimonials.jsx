import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Switching to Sunil Gehlot was like upgrading from a flip phone to an iPhone. The design capabilities are unmatched and my audience noticed immediately.",
    author: "Elena Rodriguez",
    role: "Creative Director",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  },
  {
    quote:
      "Finally, a platform that respects aesthetics. It took me 5 minutes to set up a page that looks like I paid an agency thousands of dollars.",
    author: "Marcus Chen",
    role: "Photographer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  },
  {
    quote:
      "The analytics alone are worth the price. Being able to see exactly where my traffic comes from and how they interact has doubled my conversions.",
    author: "Sarah Jenkins",
    role: "Founder, Studio Nova",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-background relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-4"
          >
            Loved by creators.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-card border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 text-6xl font-serif text-white/5 opacity-50">
                "
              </div>
              <p className="text-lg text-white/80 leading-relaxed mb-8 relative z-10">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />
                <div>
                  <div className="font-bold text-white">{t.author}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
