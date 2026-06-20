import { motion } from "framer-motion";

export function LinksFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="mt-10 pb-8 flex flex-col items-center gap-1 text-center"
    >
      <p className="text-xs text-muted-foreground/50">
        &copy; {new Date().getFullYear()} Sunil Gehlot. All rights reserved.
      </p>
      <p className="text-xs text-muted-foreground/40">
        Created by{" "}
        <a
          href="https://x.com/imsunil018"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/60 hover:text-primary transition-colors"
          data-testid="footer-link-twitter"
        >
          @imsunil018
        </a>
      </p>
    </motion.footer>
  );
}
