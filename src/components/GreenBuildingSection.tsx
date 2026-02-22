import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Building2, Sun, Monitor, TreePine, Award } from "lucide-react";
import SectionDivider from "./SectionDivider";

const features = [
  { icon: Building2, title: "Integrated Tiles", desc: "Energy-generating tiles embedded in floors, pavements, and building entrances" },
  { icon: Sun, title: "Compact Turbines", desc: "Vertical wind turbines designed for rooftops and building perimeters" },
  { icon: Monitor, title: "Smart Monitoring", desc: "Real-time dashboards tracking energy generation and consumption" },
  { icon: TreePine, title: "Carbon Reduction", desc: "Measurable reduction of building carbon footprints over time" },
  { icon: Award, title: "Green Certifications", desc: "Full support for sustainability standards and compliance" },
];

const GreenBuildingSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <>
      <SectionDivider type="to-light" />
      <section id="green" className="section-light section-padding relative overflow-hidden" ref={ref} style={{ backgroundColor: '#f5f2e9' }}>
        {/* Decorative circles */}
        <motion.div
          style={{ rotate }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-[hsl(155_100%_50%_/_0.04)]"
        />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[hsl(155_60%_95%_/_0.5)] to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <span className="text-xs font-mono text-[hsl(var(--light-primary-dark))] tracking-widest uppercase mb-4 block">
              Green Building Integration
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-[hsl(var(--light-fg))] mb-5">
              Buildings That <span className="gradient-text">Generate</span>
            </h2>
            <p className="text-[hsl(var(--light-muted))] max-w-2xl mx-auto font-body text-lg">
              Enabling buildings to become self-sustaining energy contributors rather than passive consumers.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                  className={`tech-border p-8 group cursor-default backdrop-blur-sm ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                  style={{ background: "rgb(var(--card-bg-rgb) / 0.9)" }}
              >
                <div className="w-12 h-12 bg-primary/5 flex items-center justify-center mb-6 border border-primary/10 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-500">
                  <f.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[hsl(var(--light-fg))] mb-3 uppercase tracking-wider">{f.title}</h3>
                <p className="text-sm text-[hsl(var(--light-muted))] leading-relaxed">{f.desc}</p>
                <div className="absolute top-0 right-0 w-8 h-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <f.icon size={32} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider type="to-dark" />
    </>
  );
};

export default GreenBuildingSection;
