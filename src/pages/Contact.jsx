import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Linkedin,
  Mail,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
  MessageSquare,
  Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/use-seo";

const contactMethods = [
  {
    label: "Email",
    value: "imsunil018@gmail.com",
    href: "mailto:imsunil018@gmail.com",
    icon: Mail,
    external: false,
    color: "#a78bfa", // violet
    note: "Best for detailed project briefs",
  },
  {
    label: "LinkedIn",
    value: "in/imsunil018",
    href: "https://www.linkedin.com/in/imsunil018",
    icon: Linkedin,
    external: true,
    color: "#60A5FA", // blue
    note: "Connect for professional inquiries",
  },
];

const nextSteps = [
  {
    icon: Send,
    title: "You send a message",
    description: "Fill the form or ping me on any channel.",
  },
  {
    icon: Clock,
    title: "I read it within 24h",
    description: "Usually much faster — I check regularly.",
  },
  {
    icon: MessageSquare,
    title: "We scope the project",
    description: "A short call or a few messages to align on goals and timeline.",
  },
  {
    icon: Zap,
    title: "We get started",
    description: "Clear deliverables, honest timeline, no surprises.",
  },
];

const projectTypes = [
  { value: "Web App / Dashboard", label: "Web App / Dashboard" },
  { value: "MVP / Prototype", label: "MVP / Prototype" },
  { value: "UI Design & Prototype", label: "UI Design & Prototype" },
  { value: "Technical Consulting", label: "Technical Consulting" },
  { value: "custom", label: "Custom Project Type (specify below)" }
];

const budgetRanges = [
  { value: "Less than $500", label: "Less than $500" },
  { value: "$500 – $1,500", label: "$500 – $1,500" },
  { value: "$1,500 – $5,000", label: "$1,500 – $5,000" },
  { value: "$5,000+", label: "$5,000+" },
  { value: "custom", label: "Custom Budget / Let's discuss (specify below)" }
];

export default function Contact() {
  useSEO({
    title: "Contact — Sunil Gehlot | Full-Stack Developer",
    description: "Get in touch with Sunil Gehlot to discuss your dashboard, MVP development, or professional full-stack freelance inquiries. Responsive worldwide.",
    keywords: "contact Sunil Gehlot, hire developer India, React freelancer contact, Nextjs developer contact, hire fullstack coder, remote web developer email",
    canonicalPath: "/contact",
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageLen, setMessageLen] = useState(0);

  // States for custom values and dropdown triggers
  const [projectType, setProjectType] = useState("");
  const [customProjectType, setCustomProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [customBudget, setCustomBudget] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const nameVal = e.target.elements.name.value;
    const emailVal = e.target.elements.email.value;
    const subjectVal = e.target.elements.subject.value;
    const messageVal = e.target.elements.message.value;

    const finalProjectType = projectType === "custom" ? customProjectType : projectType;
    const finalBudget = budget === "custom" ? customBudget : budget;

    const payload = {
      name: nameVal,
      email: emailVal,
      subject: subjectVal || "New Portfolio Message",
      project_category: finalProjectType || "Not specified",
      budget_scale: finalBudget || "Not specified",
      message: messageVal,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        toast({
          title: "Message sent successfully!",
          description: "Thanks for reaching out. I'll get back to you within 24 hours.",
        });
        e.target.reset();
        setProjectType("");
        setCustomProjectType("");
        setBudget("");
        setCustomBudget("");
        setMessageLen(0);
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: result.message || "Something went wrong.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to the form server. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-neutral-200 font-sans">
      <Nav />

      <main className="flex-grow pt-32 pb-24">
        {/* Header Section */}
        <section className="relative pb-16 overflow-hidden">
          {/* Subtle Vercel-like top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-violet-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">
                Contact
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-[1.1] text-white">
                Let's build something{" "}
                <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
                  together
                </span>
              </h1>
              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                Have a project in mind or need technical support? Fill in the details
                below, and let's get started.
              </p>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full border border-emerald-500/10 bg-emerald-500/[0.04]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-emerald-400 tracking-wide uppercase">
                  Replies within 24 hours
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Form and info sections */}
        <section className="pb-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              
              {/* Left Column - Contact Channels & Stages */}
              <motion.div
                className="lg:col-span-2 space-y-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Contact Channels */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                    Reach me on
                  </p>
                  <div className="space-y-3">
                    {contactMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <a
                          key={method.label}
                          href={method.href}
                          target={method.external ? "_blank" : undefined}
                          rel={method.external ? "noopener noreferrer" : undefined}
                          data-testid={`contact-method-${method.label.toLowerCase()}`}
                          className="flex items-center gap-3.5 p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/40 hover:border-neutral-700 transition-all duration-200 group"
                        >
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 border border-neutral-855"
                            style={{ background: method.color + "08", borderColor: method.color + "22" }}
                          >
                            <Icon className="w-4 h-4" style={{ color: method.color }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-neutral-200 group-hover:text-white transition-colors">
                              {method.value}
                            </p>
                            <p className="text-[10px] text-neutral-500 mt-0.5">
                              {method.note}
                            </p>
                          </div>
                        </a>
                      );
                    })}

                    {/* Location Card */}
                    <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/40 cursor-default select-none">
                      <div className="w-9 h-9 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-neutral-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-300">
                          India · Remote worldwide
                        </p>
                        <p className="text-[10px] text-neutral-500 mt-0.5">
                          IST (UTC+5:30)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workflow Pipeline */}
                <div className="space-y-5">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest select-none">
                    What happens next
                  </p>
                  <div className="space-y-5">
                    {nextSteps.map((step, i) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.title} className="flex gap-3.5 select-none">
                          <div className="flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                              <span className="text-[10px] font-semibold text-neutral-400">
                                {i + 1}
                              </span>
                            </div>
                            {i < nextSteps.length - 1 && (
                              <div className="w-px flex-1 bg-neutral-800 mt-1.5" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-200 mb-0.5">
                              {step.title}
                            </p>
                            <p className="text-[11px] text-neutral-500 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form wrapper card */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="rounded-2xl border border-neutral-800 bg-[#080808]/80 p-6 sm:p-8 shadow-[0_24px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
                  {/* Subtle top glow highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />

                  <div className="mb-7">
                    <h2 className="text-lg font-bold text-white mb-1">
                      Send a message
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Submit your project details below and I'll get back to you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="name"
                          className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider"
                        >
                          Name <span className="text-violet-400">*</span>
                        </Label>
                        <Input
                          id="name"
                          required
                          placeholder="Your name"
                          className="bg-neutral-950 border-neutral-800 focus:border-neutral-600 focus:ring-1 focus:ring-neutral-700 rounded-xl h-11 text-xs text-neutral-200 placeholder-neutral-600 font-sans"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="email"
                          className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider"
                        >
                          Email <span className="text-violet-400">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="bg-neutral-950 border-neutral-800 focus:border-neutral-600 focus:ring-1 focus:ring-neutral-700 rounded-xl h-11 text-xs text-neutral-200 placeholder-neutral-600 font-sans"
                        />
                      </div>
                    </div>

                    {/* Project type + Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* Project Type */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="project-type"
                          className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider"
                        >
                          Project type
                        </Label>
                        <div className="relative">
                          <select
                            id="project-type"
                            value={projectType}
                            onChange={(e) => setProjectType(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl border border-neutral-800 bg-neutral-950 text-xs text-neutral-300 focus:outline-none focus:border-neutral-600 transition-colors cursor-pointer font-sans appearance-none"
                          >
                            <option value="" className="bg-neutral-950 text-neutral-500">Select project type</option>
                            {projectTypes.map((t) => (
                              <option key={t.value} value={t.value} className="bg-neutral-950 text-neutral-300">
                                {t.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>

                        <AnimatePresence>
                          {projectType === "custom" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pt-2"
                            >
                              <Input
                                type="text"
                                placeholder="Please specify your project type..."
                                value={customProjectType}
                                onChange={(e) => setCustomProjectType(e.target.value)}
                                className="bg-neutral-950 border-neutral-800 focus:border-neutral-600 rounded-xl h-11 text-xs text-neutral-200 placeholder-neutral-600 font-sans"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Budget Scale */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="budget"
                          className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider"
                        >
                          Budget range
                        </Label>
                        <div className="relative">
                          <select
                            id="budget"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl border border-neutral-800 bg-neutral-950 text-xs text-neutral-300 focus:outline-none focus:border-neutral-600 transition-colors cursor-pointer font-sans appearance-none"
                          >
                            <option value="" className="bg-neutral-950 text-neutral-500">Select budget range</option>
                            {budgetRanges.map((b) => (
                              <option key={b.value} value={b.value} className="bg-neutral-950 text-neutral-300">
                                {b.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>

                        <AnimatePresence>
                          {budget === "custom" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pt-2"
                            >
                              <Input
                                type="text"
                                placeholder="Please specify your budget/expectations..."
                                value={customBudget}
                                onChange={(e) => setCustomBudget(e.target.value)}
                                className="bg-neutral-950 border-neutral-800 focus:border-neutral-600 rounded-xl h-11 text-xs text-neutral-200 placeholder-neutral-600 font-sans"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="subject"
                        className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider"
                      >
                        Subject <span className="text-violet-400">*</span>
                      </Label>
                      <Input
                        id="subject"
                        required
                        placeholder="What is this regarding?"
                        className="bg-neutral-950 border-neutral-800 focus:border-neutral-600 rounded-xl h-11 text-xs text-neutral-200 placeholder-neutral-600 font-sans"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="message"
                          className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider"
                        >
                          Message <span className="text-violet-400">*</span>
                        </Label>
                        <span className="text-[10px] text-neutral-600 font-sans">
                          {messageLen}/1000
                        </span>
                      </div>
                      <Textarea
                        id="message"
                        required
                        maxLength={1000}
                        placeholder="Tell me about your project, target audience, and key requirements..."
                        className="min-h-[120px] bg-neutral-950 border-neutral-800 focus:border-neutral-600 rounded-xl resize-none text-xs text-neutral-200 placeholder-neutral-600 leading-relaxed font-sans"
                        onChange={(e) => setMessageLen(e.target.value.length)}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full rounded-xl h-11 text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-md cursor-pointer font-sans"
                      disabled={isSubmitting}
                      data-testid="contact-submit"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-1.5">
                          Send message <Send className="w-3.5 h-3.5 ml-1" />
                        </span>
                      )}
                    </Button>

                    <p className="text-center text-[10px] text-neutral-650 font-sans mt-3">
                      Direct replies. No automated marketing lists.
                    </p>
                  </form>
                </div>

                {/* Trust Badges */}
                <div className="mt-4 grid grid-cols-3 gap-3 font-sans">
                  {[
                    { icon: CheckCircle2, text: "Replies < 24h" },
                    { icon: Clock, text: "Global hours" },
                    { icon: Zap, text: "Free scoping" },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-800 bg-neutral-950/20 cursor-default select-none"
                    >
                      <Icon className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                      <span className="text-[10px] font-medium text-neutral-500">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
