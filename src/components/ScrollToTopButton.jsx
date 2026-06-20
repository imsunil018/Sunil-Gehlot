import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-50 p-3.5 rounded-full border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-md text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-violet-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          title="Scroll to Top"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform text-neutral-300 group-hover:text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
