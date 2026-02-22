import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { X, Check, ArrowRight } from "lucide-react";

const centralized = [
  "Requires large land areas",
  "High capital costs",
  "Significant transmission losses",
  "Limited scalability",
  "Concentrated environmental impact",
];

const decentralized = [
  "Generated near point of use",
  "Reduced infrastructure costs",
  "Minimal transmission losses",
  "Modular & scalable",
  "Improved resilience & reliability",
];

const ComparisonSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.4], [-60, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section className="section-light section-padding relative overflow-hidden" ref={ref} style={{ backgroundColor: '#f5f2e9' }}>
      {/* Accent line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[hsl(155_100%_50%_/_0.15)]"
        style={{ opacity }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono text-[hsl(var(--light-primary-dark))] tracking-widest uppercase mb-4 block">
            Why Decentralized
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[hsl(var(--light-fg))]">
            The <span className="gradient-text">Smarter</span> Approach
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Centralized */}
          <motion.div
            style={{ x: leftX, opacity, background: 'rgb(var(--card-bg-rgb) / 1)' }}
            className="rounded-2xl border border-[hsl(var(--light-border))] p-10"
          >
            <h3 className="font-display text-sm font-semibold text-[hsl(var(--light-muted))] mb-8 uppercase tracking-[0.2em]">
              Centralized
            </h3>
            <div className="space-y-5">
              {centralized.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                    <X size={13} className="text-destructive" />
                  </div>
                  <span className="text-sm text-[hsl(var(--light-muted))]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decentralized */}
          <motion.div
            style={{ x: rightX, opacity, background: 'rgb(var(--card-bg-rgb) / 1)' }}
            className="rounded-2xl border border-[hsl(var(--light-border))] p-10 relative"
          >
            <h3 className="font-display text-sm font-semibold text-primary mb-8 uppercase tracking-[0.2em]">
              Decentralized — Florix
            </h3>
            <div className="space-y-5">
              {decentralized.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check size={13} className="text-primary" />
                  </div>
                  <span className="text-sm text-[hsl(var(--light-fg))] font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
