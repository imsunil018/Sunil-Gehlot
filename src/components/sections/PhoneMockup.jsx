import { motion } from "framer-motion";
import { SiX, SiInstagram, SiYoutube, SiGithub } from "react-icons/si";

export function PhoneMockup() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1 flex justify-center perspective-[1000px]"
        >
          {/* Phone Frame */}
          <motion.div
            whileHover={{ rotateY: 5, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full max-w-[320px] h-[600px] sm:h-[650px] bg-black rounded-[48px] border-[8px] border-neutral-900 shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.1)] relative overflow-hidden flex flex-col items-center pt-12 pb-6 px-4"
          >
            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl z-20" />

            {/* Phone Screen Content */}
            <div className="w-full h-full bg-gradient-to-b from-neutral-900 to-black rounded-[32px] overflow-y-auto scrollbar-hide relative z-10 p-4">
              <div className="flex flex-col items-center mt-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-accent p-1 mb-4">
                  <div className="w-full h-full rounded-full bg-black overflow-hidden border-2 border-black">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold font-serif">Sarah Jenkins</h3>
                <p className="text-sm text-neutral-400 mt-1 mb-6 text-center">
                  Design Director @ Nexus. Creating digital experiences.
                </p>

                <div className="flex gap-4 mb-8">
                  {[SiX, SiInstagram, SiYoutube, SiGithub].map((Icon, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  ))}
                </div>

                <div className="w-full flex flex-col gap-3">
                  {[
                    "My Portfolio",
                    "Latest YouTube Video",
                    "Book a Consultation",
                    "Subscribe to Newsletter",
                  ].map((link, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-center font-medium backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer text-sm"
                    >
                      {link}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
            Look stunning on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              every device.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
            Your Sunil Gehlot profile automatically adapts to any screen size. With
            our premium glassmorphism themes and fluid animations, you'll always
            leave a lasting impression.
          </p>

          <ul className="space-y-4">
            {[
              "Lightning fast loading times",
              "Zero configuration required",
              "Fully customizable themes",
              "Custom domains included",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-white/80">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
