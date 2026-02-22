import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="section-padding border-t border-border relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-5">
              {/* <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="font-display text-primary font-bold text-lg">F</span>
              </div> */}
              <img src="/logo.png" alt="Florix Logo" className="h-24 w-auto"/>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Florix Smart Infra Solutions — Engineering sustainable, decentralized energy systems for the next generation of urban environments.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground mb-5">
              Quick Links
            </h4>
            <div className="space-y-3">
              {[
                { label: "About", id: "about" },
                { label: "Products", id: "products" },
                { label: "Green Building", id: "green" },
                { label: "Vision", id: "vision" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(link.id);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    else window.location.hash = link.id;
                  }}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  {link.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground mb-5">
              Contact
            </h4>
            <div className="space-y-4">
              <a href="tel:+919986639994" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <div className="w-8 h-8 rounded bg-primary/5 flex items-center justify-center">
                  <span className="text-primary text-[10px]">PH</span>
                </div>
                +91 9986639994
              </a>
              <a href="mailto:info@florixtechnologies.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <div className="w-8 h-8 rounded bg-primary/5 flex items-center justify-center">
                  <Mail size={14} className="text-primary" />
                </div>
                florixenergy@gmail.com
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded bg-primary/5 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-primary" />
                </div>
                <div className="leading-relaxed">
                  <a href="https://www.google.com/maps/place/FLORIX+technologies/@12.9073605,77.5923445,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1565bcf9bfbb:0x7768b89099b1d9ad!8m2!3d12.9073605!4d77.5949194!16s%2Fg%2F11mspnnlmp?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D">Headquaters</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="energy-line mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © 2026 Florix Smart Infra Solutions. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Powering a greener tomorrow.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
