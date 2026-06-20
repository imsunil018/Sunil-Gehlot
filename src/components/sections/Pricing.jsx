import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with your digital presence.",
    features: [
      "Unlimited basic links",
      "Standard themes",
      "Basic analytics (7 days)",
      "Sunil Gehlot branding",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    description: "For creators who want to stand out and analyze traffic.",
    features: [
      "Everything in Free",
      "Premium glassmorphism themes",
      "Advanced analytics (1 year)",
      "Custom domain support",
      "Remove Sunil Gehlot branding",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/mo",
    description: "For agencies and teams managing multiple identities.",
    features: [
      "Everything in Pro",
      "Manage up to 5 profiles",
      "Team collaboration",
      "Custom CSS/JS",
      "API Access",
      "Dedicated success manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-4"
          >
            Simple, transparent pricing.
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Invest in your digital presence. Upgrade when you're ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-[2rem] backdrop-blur-xl ${
                plan.popular
                  ? "bg-white/10 border-primary/50 shadow-[0_0_50px_rgba(139,92,246,0.15)] md:-mt-8 md:mb-8"
                  : "bg-card border-white/10"
              } border flex flex-col h-full`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-bold uppercase tracking-wider text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-medium text-white/80 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-bold font-serif">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground h-10">
                  {plan.description}
                </p>
              </div>

              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className={`w-full rounded-full h-12 text-base font-medium transition-all ${
                  plan.popular
                    ? "bg-primary text-white hover:bg-primary/90 hover:scale-105"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                data-testid={`pricing-cta-${plan.name.toLowerCase()}`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
