import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Footprints, Wind, Zap, Users, ShieldCheck, Compass, Waves } from "lucide-react";
import SectionDivider from "./SectionDivider";
import forceImg from "@/assets/force-product.jpg";
import aerixImg from "@/assets/aerix-product.jpg";

const products = [
  {
    id: "force",
    name: "F.O.R.C.E.",
    fullName: "Footstep-Operated Renewable Conversion Engine",
    description:
      "Smart floor tiles that convert mechanical energy from human movement into usable electrical energy. Ideal for malls, stations, campuses, and sidewalks.",
    image: forceImg,
    features: [
      { icon: Zap, label: "Energy Generation", desc: "Converts footstep pressure into electricity" },
      { icon: Users, label: "Crowd Analysis", desc: "Monitors traffic patterns and density" },
      { icon: ShieldCheck, label: "Security", desc: "Detects unauthorized access" },
    ],
  },
  {
    id: "aerix",
    name: "AERIX",
    fullName: "Vertical Axis Wind Turbine",
    tagline: "Engineering Wind for a Sustainable Tomorrow",
    description:
      "Next-generation VAWT designed to integrate renewable wind energy into everyday infrastructure. Operates effectively in urban environments.",
    image: aerixImg,
    features: [
      { icon: Compass, label: "Aerodynamic Design", desc: "Optimized blade profiles for max extraction" },
      { icon: Waves, label: "Fluid Dynamics", desc: "Minimized turbulence and energy losses" },
      { icon: Wind, label: "Urban Ready", desc: "Works on rooftops and building edges" },
    ],
  },
];

const ProductsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const product = products[active];

  return (
    <>
      <SectionDivider type="to-dark" />
      <section id="products" className="section-padding relative" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <span className="text-xs font-mono text-primary tracking-widest uppercase mb-4 block">
              Our Products
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
              Built for the <span className="gradient-text">Future</span>
            </h2>
          </motion.div>

          {/* Product tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-4 mb-16"
          >
            {products.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`relative px-8 py-4 rounded-xl font-display text-sm tracking-wider uppercase transition-all duration-500 ${active === i
                  ? "bg-primary/15 border border-primary/40 text-primary"
                  : "border border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
                  }`}
              >
                {active === i && (
                  <motion.div
                    layoutId="product-tab-glow"
                    className="absolute inset-0 rounded-xl glow-border"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                  />
                )}
                <span className="relative z-10">{p.name}</span>
              </button>
            ))}
          </motion.div>

          {/* Product content */}
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div style={{ y: imageY }} className="relative group">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative rounded-2xl overflow-hidden border border-border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[4/3] object-cover transform group-hover:scale-[1.03] transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">{product.fullName}</span>
                </div>
              </div>
            </motion.div>

            <div>
              <h3 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-3">
                {product.name}
              </h3>
              {product.tagline && (
                <p className="text-sm font-body italic text-primary/60 mb-6">"{product.tagline}"</p>
              )}
              <p className="text-muted-foreground font-body leading-relaxed mb-10 text-lg">
                {product.description}
              </p>

              <div className="space-y-4">
                {product.features.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className="tech-border flex items-start gap-5 p-6 group hover:bg-primary/[0.02] cursor-default"
                  >
                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover:border-primary/30 transition-colors">
                      <f.icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-display font-semibold text-foreground mb-1 uppercase tracking-wider">
                        {f.label}
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{f.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProductsSection;
