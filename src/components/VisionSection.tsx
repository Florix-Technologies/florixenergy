import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Eye, Target } from "lucide-react";

const VisionSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const rightY = useTransform(scrollYProgress, [0, 1], [100, -60]);

  return (
    <section id="vision" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-widest uppercase mb-4 block">
            Our Purpose
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
            Driving <span className="gradient-text">Tomorrow</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-primary/20 border border-primary/20 overflow-hidden">
          <motion.div
            style={{ y: leftY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background p-10 group relative overflow-hidden"
          >
            <div className="scanning-bar" />
            <div className="w-14 h-14 bg-primary/5 flex items-center justify-center mb-8 border border-primary/10 group-hover:bg-primary/10 transition-colors">
              <Eye size={28} className="text-primary" />
            </div>
            <h3 className="text-2xl font-display font-bold gradient-text mb-6 uppercase tracking-wider">Vision</h3>
            <p className="text-muted-foreground font-body leading-relaxed text-lg">
A world where infrastructure doesn't just serve communities — it fuels them.
We envision cities where every road generates power, every building breathes clean energy, and every citizen contributes to a sustainable future simply by going about their day. At Florix, we are not waiting for that world — we are building it.
            </p>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          </motion.div>

          <motion.div
            style={{ y: rightY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-background p-10 group relative overflow-hidden"
          >
            <div className="scanning-bar" />
            <div className="w-14 h-14 bg-secondary/5 flex items-center justify-center mb-8 border border-secondary/10 group-hover:bg-secondary/10 transition-colors">
              <Target size={28} className="text-secondary" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-6 uppercase tracking-wider">Mission</h3>
            <ul className="space-y-4">
              {[
                "Develop innovative decentralized energy solutions",
                "Integrate renewable energy into everyday infrastructure",
                "Support green building initiatives and smart cities",
                "Combine engineering excellence with sustainability",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="status-dot mt-2 shrink-0" />
                  <span className="text-muted-foreground leading-relaxed font-body">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
