import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Network, Leaf, BarChart3, Shield, Building2, Zap, Globe, TreePine, Sun, Waypoints } from "lucide-react";
import SectionDivider from "./SectionDivider";

/* ─── Stats Data ─── */
const stats = [
  { value: "95%", numericValue: 95, suffix: "%", label: "Efficiency Gain", icon: BarChart3 },
  { value: "0", numericValue: 0, suffix: "", label: "Carbon Emissions", icon: Leaf },
  { value: "24/7", numericValue: null, suffix: "", label: "Smart Monitoring", icon: Shield },
  { value: "∞", numericValue: null, suffix: "", label: "Scalability", icon: Network },
];

const initiativeIcons = [
  { icon: Globe, label: "Net-Zero" },
  { icon: TreePine, label: "Vrikshit Bharat" },
  { icon: Building2, label: "Smart Cities" },
  { icon: Zap, label: "Electric Mobility" },
  { icon: Sun, label: "Renewables" },
  { icon: Waypoints, label: "AMRUT" },
];

/* ─── Animated Counter Hook ─── */
const useCountUp = (target: number, duration = 2000, startCounting: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    if (target === 0) { setCount(0); return; }
    let startTime: number | null = null;
    let animationFrame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) animationFrame = requestAnimationFrame(step);
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, startCounting]);
  return count;
};

/* ─── Staggered Paragraph Reveal ─── */
const StaggerParagraph = ({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  // Split into sentences for staggered reveal
  const sentences = text.split(/(?<=\.)\s+/);

  return (
    <p ref={ref} className={className} style={style}>
      {sentences.map((sentence, i) => (
        <motion.span
          key={i}
          style={{ display: "inline" }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
        >
          {sentence}{i < sentences.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </p>
  );
};

/* ─── Stat Card with Counter ─── */
const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(stat.numericValue ?? 0, 2000, isInView);
  const displayValue = stat.numericValue !== null ? `${count}${stat.suffix}` : stat.value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
      whileHover={{
        y: -4,
        boxShadow: "0 8px 40px hsl(220 20% 12% / 0.08), 0 0 20px hsl(155 100% 50% / 0.06)",
        borderColor: "hsl(155 100% 50% / 0.25)",
      }}
      className="group relative overflow-hidden cursor-default"
      style={{
        background: "rgb(var(--card-bg-rgb) / 1)",
        border: "1px solid hsl(var(--light-card-border))",
        borderRadius: "16px",
        padding: "36px 28px",
        boxShadow: "0 4px 30px hsl(220 20% 12% / 0.04), 0 1px 3px hsl(220 20% 12% / 0.06)",
        transition: "box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[hsl(var(--primary))] rounded-tl-[16px] opacity-30" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[hsl(var(--primary))] rounded-br-[16px] opacity-30" />

      {/* Background icon */}
      <div className="absolute top-3 right-3 opacity-[0.06] group-hover:opacity-[0.15] transition-opacity duration-500">
        <stat.icon size={48} />
      </div>

      <div className="relative z-10">
        <div
          className="font-display font-bold mb-2 transition-colors duration-300 group-hover:text-[hsl(var(--primary))]"
          style={{
            fontSize: "clamp(32px, 4vw, 44px)",
            color: "hsl(var(--light-fg))",
            lineHeight: 1,
          }}
        >
          {displayValue}
        </div>
        <div
          className="font-mono uppercase"
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "hsl(var(--light-muted))",
          }}
        >
          {stat.label}
        </div>
      </div>

      {/* Glowing underline accent */}
      <div
        className="absolute bottom-0 left-0 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{
          height: "2px",
          background: "var(--gradient-primary)",
          boxShadow: "0 0 8px hsl(155 100% 50% / 0.4)",
        }}
      />
    </motion.div>
  );
};

/* ─── Section Divider: animated gradient line with pulsing center dot ─── */
const GlowDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex items-center justify-center py-2" style={{ maxWidth: "600px", margin: "0 auto" }}>
      {/* Left line — expands from center */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          flex: 1, height: "1px",
          background: "linear-gradient(90deg, transparent, hsl(155 100% 50% / 0.3))",
          transformOrigin: "right",
        }}
      />
      {/* Center dot — soft slow pulse */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: "hsl(var(--primary))",
          boxShadow: "0 0 12px hsl(155 100% 50% / 0.5), 0 0 24px hsl(155 100% 50% / 0.2)",
          margin: "0 12px", flexShrink: 0,
        }}
      />
      {/* Right line — expands from center */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          flex: 1, height: "1px",
          background: "linear-gradient(90deg, hsl(155 100% 50% / 0.3), transparent)",
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

/* ─── Glass Card Wrapper with hover interactions ─── */
const GlassCard = ({
  children,
  accentLine = false,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  accentLine?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div
    className={`relative overflow-hidden ${className}`}
    whileHover={{
      y: -4,
      boxShadow: "0 12px 60px hsl(220 20% 12% / 0.08), 0 4px 12px hsl(220 20% 12% / 0.05), 0 0 0 1px hsl(155 100% 50% / 0.12)",
    }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    style={{
      background: "rgb(var(--card-bg-rgb) / 0.95)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid hsl(var(--light-card-border))",
      borderRadius: "20px",
      padding: "60px",
      boxShadow:
        "0 8px 50px hsl(220 20% 12% / 0.05), 0 2px 8px hsl(220 20% 12% / 0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
      ...style,
    }}
  >
    {/* Top gradient accent line */}
    {accentLine && (
      <div style={{
        position: "absolute", top: 0, left: "24px", right: "24px", height: "3px",
        borderRadius: "0 0 4px 4px",
        background: "var(--gradient-primary)",
        opacity: 0.7,
      }} />
    )}

    {children}
  </motion.div>
);

/* ═══════════════════════════════════════════
   ABOUT SECTION COMPONENT
   ═══════════════════════════════════════════ */
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Parallax: background moves slower than foreground */
  const bgGridX = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const statsY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  /* Soft radial breathing glow */
  const bgGlowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.04, 0.08, 0.1, 0.08, 0.04]);

  /* shared motion props for card reveals */
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 40 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: "-80px" } as const,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  });

  return (
    <>
      <SectionDivider type="to-light" />
      <section
        id="about"
        ref={sectionRef}
        className="section-light relative overflow-hidden"
        style={{ padding: 0, backgroundColor: '#f5f2e9' }}
      >
        {/* ═══════════ BACKGROUND LAYERS (with parallax) ═══════════ */}

        {/* Parallax radial glow — top-right */}
        <motion.div style={{ y: bgGlowY }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div style={{
            position: "absolute", top: "-100px", right: "-60px",
            width: "800px", height: "800px", borderRadius: "50%",
            background: "radial-gradient(circle, hsl(155 100% 50% / 0.08) 0%, hsl(190 100% 45% / 0.04) 40%, transparent 70%)",
            filter: "blur(60px)",
          }} />
        </motion.div>

        {/* Glow — bottom-left */}
        <div className="absolute pointer-events-none" aria-hidden="true" style={{
          bottom: "-80px", left: "-60px", width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, hsl(155 60% 50% / 0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }} />

        {/* Breathing radial glow behind content */}
        <motion.div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            top: "35%", left: "50%", transform: "translateX(-50%)",
            width: "700px", height: "700px", borderRadius: "50%",
            background: "radial-gradient(circle, hsl(155 100% 50% / 0.06) 0%, transparent 55%)",
            filter: "blur(80px)",
            opacity: bgGlowOpacity,
          }}
        />

        {/* Isometric surface grid — slow parallax horizontal shift */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            x: bgGridX,
            backgroundImage:
              "linear-gradient(hsl(155 100% 50% / 0.025) 1px, transparent 1px), linear-gradient(90deg, hsl(155 100% 50% / 0.025) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Subtle energy flow lines */}
        <div className="absolute pointer-events-none" aria-hidden="true" style={{
          top: "20%", left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent 0%, hsl(155 100% 50% / 0.06) 20%, hsl(190 100% 45% / 0.04) 50%, hsl(155 100% 50% / 0.06) 80%, transparent 100%)",
        }} />
        <div className="absolute pointer-events-none" aria-hidden="true" style={{
          top: "55%", left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent 0%, hsl(190 100% 45% / 0.05) 30%, hsl(155 100% 50% / 0.04) 60%, transparent 100%)",
        }} />
        <div className="absolute pointer-events-none" aria-hidden="true" style={{
          top: "80%", left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent 0%, hsl(155 100% 50% / 0.04) 40%, transparent 100%)",
        }} />

        {/* ═══════════ CONTENT ═══════════ */}
        <div className="relative z-10">

          {/* ── Section Header with enhanced headline animation ── */}
          <div className="px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-6">
            <div className="max-w-7xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-xl font-mono tracking-widest uppercase mb-4 block text-[hsl(var(--light-primary-dark))]"
              >
                About Florix
              </motion.span>
              <motion.h2
                className="text-4xl md:text-6xl font-display font-bold leading-[1.1] text-[hsl(var(--light-fg))]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {/* "Redefining" — fade up from bottom */}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  style={{ display: "inline-block", marginRight: "0.3em" }}
                >
                  Redefining
                </motion.span>
                {/* "Infrastructure" — gradient wipe reveal */}
                <motion.span
                  className="gradient-text"
                  variants={{
                    hidden: {
                      opacity: 0,
                      clipPath: "inset(0 100% 0 0)",
                    },
                    visible: {
                      opacity: 1,
                      clipPath: "inset(0 0% 0 0)",
                    },
                  }}
                  transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
                  style={{ display: "inline-block", position: "relative" }}
                >
                  Infrastructure
                  {/* Subtle one-time glow pulse after reveal */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 gradient-text pointer-events-none"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: [0, 0.4, 0] },
                    }}
                    transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                    style={{
                      display: "inline-block",
                      filter: "blur(8px)",
                    }}
                  >
                    Infrastructure
                  </motion.span>
                </motion.span>
              </motion.h2>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="px-6 md:px-12 lg:px-20 py-6">
            <GlowDivider />
          </div>

          {/* ═══════════════════════════════════════
              VISION — Glass Card
              ═══════════════════════════════════════ */}
          <div className="px-6 md:px-12 lg:px-20 py-10">
            <motion.div className="max-w-4xl mx-auto" {...reveal()}>
              <GlassCard accentLine>
                <div className="relative z-10">
                  {/* Decorative circles */}
                  <div className="absolute top-12 right-20 w-24 h-24 border-2 border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                  <div className="absolute bottom-32 left-10 w-16 h-16 border border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                  <div className="absolute top-1/2 right-8 w-32 h-32 border-2 border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                  <h3 className="font-display font-bold gradient-text mb-6" style={{
                    fontSize: "clamp(24px, 3vw, 36px)",
                    lineHeight: 1.2,
                  }}>
                    Transforming Urban Spaces into Energy-Positive Ecosystems
                  </h3>
                  <StaggerParagraph
                    text="At Florix Energy, we envision a world where urban infrastructure does more than serve it powers, sustains, and transforms cities into energy-positive ecosystems. Roads, walkways, buildings, and public spaces are no longer passive - they are active contributors to clean energy generation, carbon reduction, and a greener future."
                    className="font-body mb-8 text-[hsl(var(--light-muted))]"
                    style={{ fontSize: "17px", lineHeight: "1.9" }}
                  />
                  <StaggerParagraph
                    text="Our mission is to empower cities, communities, and governments to embrace sustainability through innovative, decentralized, and renewable energy solutions. By embedding energy generation directly into urban infrastructure, we create environments that are self-sustaining, resilient, and aligned with national and global sustainability goals."
                    className="font-body text-[hsl(var(--light-muted))]"
                    style={{ fontSize: "17px", lineHeight: "1.9" }}
                  />
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <div className="px-6 md:px-12 lg:px-20 py-4">
            <GlowDivider />
          </div>

          {/* ═══════════════════════════════════════
              GOVERNMENT INITIATIVES — Two-Column
              ═══════════════════════════════════════ */}
          <div className="px-6 md:px-12 lg:px-20 py-10">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="grid lg:grid-cols-[1fr_340px] gap-10 items-start"
                {...reveal()}
              >
                {/* Left: Text */}
                <GlassCard accentLine>
                  <div className="relative z-10">
                    {/* Decorative circles */}
                    <div className="absolute top-8 right-16 w-20 h-20 border-2 border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                    <div className="absolute bottom-20 left-8 w-28 h-28 border border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                    <div className="absolute top-1/3 right-6 w-14 h-14 border-2 border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                    <h3 className="font-display font-bold gradient-text mb-6" style={{
                      fontSize: "clamp(24px, 3vw, 36px)",
                      lineHeight: 1.2,
                    }}>
                      Supporting India's Sustainability Goals
                    </h3>
                    <StaggerParagraph
                      text="Florix Energy is committed to helping India achieve its ambitious Net-Zero Carbon Emissions targets, contributing directly to initiatives such as Vrikshit Bharat, which promotes large-scale afforestation, urban greening, and ecological restoration. Our efforts also align with programs like Smart Cities Mission, National Electric Mobility Mission, and Urban Renewable Energy Schemes, ensuring that cities can leverage clean energy while improving the quality of life for citizens. By supporting Atal Mission for Rejuvenation and Urban Transformation (AMRUT) and other green infrastructure initiatives, we drive measurable environmental impact and strengthen the foundation for sustainable urban development."
                      className="font-body text-[hsl(var(--light-muted))]"
                      style={{ fontSize: "17px", lineHeight: "1.9" }}
                    />
                  </div>
                </GlassCard>

                {/* Right: 2×3 Initiative Icon Grid */}
                <div className="hidden lg:grid grid-cols-2 gap-4">
                  {initiativeIcons.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.75 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                      whileHover={{
                        y: -8,
                        boxShadow: "0 12px 40px hsl(155 100% 50% / 0.12), 0 0 0 1px hsl(155 100% 50% / 0.2)",
                      }}
                      className="flex flex-col items-center justify-center gap-3 cursor-default relative overflow-hidden"
                      style={{
                        background: "rgb(var(--card-bg-rgb) / 0.95)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid hsl(var(--light-card-border))",
                        borderRadius: "16px",
                        padding: "28px 16px",
                        boxShadow: "0 4px 20px hsl(220 20% 12% / 0.04)",
                        transition: "box-shadow 0.35s ease, transform 0.35s ease",
                      }}
                    >
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[hsl(var(--primary))] rounded-tl-[16px] opacity-25" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[hsl(var(--primary))] rounded-br-[16px] opacity-25" />

                      {/* Faint inner grid texture */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                        backgroundImage:
                          "linear-gradient(hsl(155 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(155 100% 50%) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }} />

                      <div style={{
                        width: "48px", height: "48px", borderRadius: "12px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "hsl(var(--light-accent-bg))",
                        boxShadow: "inset 0 0 12px hsl(155 100% 50% / 0.06)",
                      }}>
                        <item.icon size={22} strokeWidth={1.5} className="text-[hsl(var(--light-primary-dark))]" />
                      </div>
                      <span className="font-mono text-[hsl(var(--light-muted))]" style={{
                        fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center",
                      }}>
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="px-6 md:px-12 lg:px-20 py-4">
            <GlowDivider />
          </div>

          {/* ═══════════════════════════════════════
              PHILOSOPHY — Enhanced Section
              ═══════════════════════════════════════ */}
          <div className="px-6 md:px-12 lg:px-20 py-10">
            <motion.div className="max-w-5xl mx-auto" {...reveal()}>
              <GlassCard style={{ padding: "80px 60px", position: "relative" }}>

                {/* Vertical gradient accent bars on sides */}
                <div style={{
                  position: "absolute", top: "40px", bottom: "40px", left: 0, width: "3px",
                  borderRadius: "0 3px 3px 0",
                  background: "linear-gradient(180deg, transparent, hsl(155 100% 50% / 0.4), hsl(190 100% 45% / 0.3), transparent)",
                }} />
                <div style={{
                  position: "absolute", top: "40px", bottom: "40px", right: 0, width: "3px",
                  borderRadius: "3px 0 0 3px",
                  background: "linear-gradient(180deg, transparent, hsl(190 100% 45% / 0.3), hsl(155 100% 50% / 0.4), transparent)",
                }} />

                {/* Soft radial glow behind heading */}
                <div className="absolute pointer-events-none" aria-hidden="true" style={{
                  top: "10%", left: "50%", transform: "translateX(-50%)",
                  width: "500px", height: "300px", borderRadius: "50%",
                  background: "radial-gradient(circle, hsl(155 100% 50% / 0.06) 0%, transparent 60%)",
                  filter: "blur(40px)",
                }} />

                <div className="relative z-10">
                  {/* Decorative circles */}
                  <div className="absolute top-16 right-24 w-28 h-28 border-2 border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                  <div className="absolute bottom-40 left-12 w-20 h-20 border border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                  <div className="absolute top-2/3 right-12 w-24 h-24 border-2 border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                  {/* Headline */}
                  <div className="text-center" style={{ marginBottom: "40px" }}>
                    <p
                      className="font-display font-bold gradient-text"
                      style={{
                        fontSize: "clamp(30px, 4.5vw, 48px)",
                        lineHeight: 1.25,
                        letterSpacing: "0.015em",
                        maxWidth: "850px",
                        margin: "0 auto",
                      }}
                    >
                      Our philosophy is simple yet revolutionary: every surface is an opportunity.
                    </p>

                    {/* Animated gradient underline divider */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                      style={{
                        height: "2px", maxWidth: "200px", margin: "28px auto 0",
                        background: "var(--gradient-primary)",
                        boxShadow: "0 0 10px hsl(155 100% 50% / 0.3)",
                        transformOrigin: "center",
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div style={{ maxWidth: "780px", margin: "0 auto" }}>
                    <StaggerParagraph
                      text="Every building, every floor, every road can be transformed into a source of decentralized, clean energy, generated exactly where it's needed. This approach eliminates transmission losses, reduces dependency on centralized grids, and ensures energy efficiency, making urban environments smarter and more sustainable."
                      className="font-body text-center text-[hsl(var(--light-muted))]"
                      style={{ fontSize: "17px", lineHeight: "1.9" }}
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <div className="px-6 md:px-12 lg:px-20 py-4">
            <GlowDivider />
          </div>

          {/* ═══════════════════════════════════════
              SUSTAINABILITY & ECOSYSTEMS
              ═══════════════════════════════════════ */}
          <div className="px-6 md:px-12 lg:px-20 py-10">
            <motion.div
              className="max-w-4xl mx-auto"
              {...reveal()}
            >
              <GlassCard accentLine>
                <div className="relative z-10">
                  {/* Decorative circles */}
                  <div className="absolute top-10 right-14 w-18 h-18 border-2 border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                  <div className="absolute bottom-24 left-6 w-24 h-24 border border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                  <div className="absolute top-1/2 right-10 w-20 h-20 border-2 border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                  <h3 className="font-display font-bold gradient-text mb-6" style={{
                    fontSize: "clamp(24px, 3vw, 36px)",
                    lineHeight: 1.2,
                  }}>
                    Building Smart, Resilient Urban Ecosystems
                  </h3>
                  <StaggerParagraph
                    text="At Florix Energy, we believe that sustainability is not just a goal-it's a movement. By integrating renewable energy and green infrastructure principles into everyday city planning, we foster responsible energy generation, environmental stewardship, and community empowerment. Our work enables cities to achieve net-zero goals, actively participate in Vrikshit Bharat and other environmental initiatives, and transition towards energy independence and ecological balance."
                    className="font-body text-[hsl(var(--light-muted))] mb-10"
                    style={{ fontSize: "17px", lineHeight: "1.9" }}
                  />
                  <StaggerParagraph
                    text="We envision smart urban ecosystems where infrastructure is more than just functional. Energy is produced where it is consumed, urban spaces are eco-conscious and resilient, and citizens benefit from cleaner air, reduced emissions, and sustainable growth. Through innovation, research, and collaboration with governments and urban planners, we strive to ensure every urban space contributes positively to the planet."
                    className="font-body text-[hsl(var(--light-muted))]"
                    style={{ fontSize: "17px", lineHeight: "1.9" }}
                  />
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <div className="px-6 md:px-12 lg:px-20 py-4">
            <GlowDivider />
          </div>

          {/* ═══════════════════════════════════════
              CLOSING — Accented Card
              ═══════════════════════════════════════ */}
          <div className="px-6 md:px-12 lg:px-20 py-10">
            <motion.div className="max-w-4xl mx-auto" {...reveal()}>
              <GlassCard
                accentLine
                style={{
                  background: "hsl(var(--light-accent-bg) / 0.5)",
                  border: "1px solid hsl(155 80% 80% / 0.3)",
                }}
              >
                <div className="relative z-10">
                  {/* Decorative circles */}
                  <div className="absolute top-12 right-20 w-26 h-26 border-2 border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                  <div className="absolute bottom-16 left-8 w-16 h-16 border border-[hsl(155_100%_50%)] rounded-full opacity-80 pointer-events-none" />
                  <div className="absolute top-2/5 right-6 w-32 h-32 border-2 border-[hsl(155_100%_50%)] rounded-full opacity-80     pointer-events-none" />
                  <h3 className="font-display font-bold gradient-text mb-6" style={{
                    fontSize: "clamp(24px, 3vw, 36px)",
                    lineHeight: 1.2,
                  }}>
                    Pioneers of Sustainable Urban Transformation
                  </h3>
                  <StaggerParagraph
                    text="Florix Energy is more than a technology company. We are pioneers of sustainable urban transformation, enabling cities to grow intelligently, responsibly, and sustainably. Our work reinforces the belief that smart, renewable, and decentralized urban infrastructure is key to a greener India and a sustainable planet."
                    className="font-body text-[hsl(var(--light-fg))] mb-10"
                    style={{ fontSize: "17px", lineHeight: "1.9", opacity: 0.85 }}
                  />
                  <StaggerParagraph
                    text="By championing initiatives like Net-Zero Cities, Vrikshit Bharat, Smart Cities Mission, AMRUT, National Electric Mobility Mission, and other green schemes, Florix Energy is shaping the urban landscape of tomorrow - one that is clean, smart, and resilient for generations to come."
                    className="font-body text-[hsl(var(--light-fg))]"
                    style={{ fontSize: "17px", lineHeight: "1.9", opacity: 0.85 }}
                  />
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <div className="px-6 md:px-12 lg:px-20 py-4">
            <GlowDivider />
          </div>

          {/* ═══════════════════════════════════════
              IMPACT STATS — Animated Grid
              ═══════════════════════════════════════ */}
          <div className="px-6 md:px-12 lg:px-20 pt-10 pb-24 md:pb-32">
            <div className="max-w-7xl mx-auto">
              <motion.div style={{ y: statsY }} className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                  <StatCard key={stat.label} stat={stat} index={i} />
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default AboutSection;