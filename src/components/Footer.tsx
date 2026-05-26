import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MapPin, Phone, Mail, Linkedin, Globe, ArrowUpRight, MessageSquare, X, ZoomIn } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://images.dmca.com/Badges/DMCABadgeHelper.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const footerLinks = {
    quick: [
      { name: "About Us", path: "/about" },
      { name: "Our Services", path: "/services" },
      { name: "Projects Handled", path: "/projects" },
      { name: "Team", path: "/team" },
      { name: "Insights", path: "/insights" },
      { name: "News & Events", path: "/news" },
    ],
    services: ["Road & Bridge Design", "Building Design", "Environmental Assesment", "Economic Valuation", "Surveying & Mapping", "Civil Engineering Lab"]
  };

  return (
    <footer id="contact" className="dark relative bg-[#060c1d] border-t border-[#1A7EFF]/20 py-8 md:py-10 flex flex-col justify-center">
      {/* Technical Graph Lines - Primary Structural Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] dark:opacity-[0.03]">
        <motion.div
          animate={{
            backgroundPosition: ["0px 0px", "60px 60px"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
                linear-gradient(var(--accent) 1px, transparent 1px),
                linear-gradient(90deg, var(--accent) 1px, transparent 1px)
              `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-4 md:mb-6">

          {/* Brand Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6"
          >
            <div className="flex flex-col gap-3">
              <span className="text-2xl font-space font-black tracking-tighter text-foreground">
                URBAN<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 italic font-light">BUILD</span>™
              </span>
              <div className="h-1 w-16 bg-accent rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
            </div>

            <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
              Engineering Progress With Precision. We are dedicated to infrastructure
              excellence, technical capacity building, and sustainable urban solutions.
            </p>

            {/* Social Matrix & Admin Trigger */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/company/urbanbuild%E2%84%A2/", isExternal: true },
                  { icon: Globe, href: "https://urbanbuild.co.in", isExternal: true },
                  { icon: MessageSquare, href: "#", isExternal: false }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    onClick={!social.isExternal ? (e) => {
                      e.preventDefault();
                    } : undefined}
                    target={social.isExternal ? "_blank" : undefined}
                    rel={social.isExternal ? "noopener noreferrer" : undefined}
                    className="h-10 w-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-background hover:border-accent transition-all duration-500 group shadow-lg"
                  >
                    <social.icon className="h-4 w-4 transition-transform duration-500 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Infrastructure Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 md:space-y-6"
          >
            <h4 className="text-[10px] font-black tracking-[0.2em] text-accent uppercase">Platform Map</h4>
            <ul className="space-y-2.5">
              {footerLinks.quick.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2 group transition-all duration-300"
                  >
                    <span className="h-[1px] w-0 bg-accent group-hover:w-3 transition-all duration-500" />
                    <span className="text-xs font-medium">{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-y-0.5 transition-all duration-300 text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Technical Specializations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4 md:space-y-6"
          >
            <h4 className="text-[10px] font-black tracking-[0.2em] text-accent uppercase">Technical Expertise</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((service) => (
                <li key={service}>
                  <div className="text-muted-foreground flex items-center gap-2 select-none">
                    <span className="h-[1.5px] w-1.5 rounded-full bg-accent/50" />
                    <span className="text-xs font-medium">{service}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Global Operations Hub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 md:space-y-6"
          >
            <h4 className="text-[10px] font-black tracking-[0.2em] text-accent uppercase">Headquarters</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-card flex items-center justify-center shrink-0 border border-border/50 transition-colors">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Bhaniyawala Tiraha, Jolly Grant,<br />
                  Dehradun 248140, UK, India
                </p>
              </div>

              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-card flex items-center justify-center shrink-0 border border-border/50">
                  <Phone className="h-3.5 w-3.5 text-accent" />
                </div>
                <a href="tel:+918291722917" className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-1.5">
                  +91 82917 22917
                </a>
              </div>

              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-card flex items-center justify-center shrink-0 border border-border/50 mt-1">
                  <Mail className="h-3.5 w-3.5 text-accent" />
                </div>
                <div className="flex flex-col">
                  <a href="mailto:consultancy@urbanbuild.co.in" className="text-xs text-muted-foreground hover:text-foreground transition-colors break-all">
                    consultancy@urbanbuild.co.in <span className="text-[9px] font-mono text-accent font-bold">(Primary)</span>
                  </a>
                  <a href="mailto:urbanbuildinfra@gmail.com" className="text-[11px] text-muted-foreground/80 hover:text-foreground transition-colors break-all mt-0.5">
                    urbanbuildinfra@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Legal & Credits Matrix */}
        <div className="pt-3 md:pt-4 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-[8px] md:text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase">
              © {currentYear} URBANBUILD™ REGISTRY.
            </p>
            <p className="text-[7px] md:text-[8px] text-muted-foreground/60 tracking-[0.1em]">
              <span
                onClick={() => setEnlargedImage("/images/iso-certificate.jpg")}
                className="text-accent hover:text-accent/80 hover:underline cursor-pointer transition-all duration-300 inline-flex items-center gap-1 font-semibold"
              >
                ISO 9001:2015
                <ZoomIn className="w-2.5 h-2.5" />
              </span> CERTIFIED ORGANIZATION. ALL TECHNICAL RIGHTS RESERVED.
            </p>
          </div>

          <div className="flex gap-6">
            {["Privacy", "Terms", "Registry"].map((item) => (
              <a key={item} href="#" className="text-[8px] md:text-[9px] font-black tracking-widest text-muted-foreground hover:text-accent transition-colors uppercase">
                {item}
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-[8px] md:text-[9px] text-muted-foreground font-medium">
              Architected By <span className="text-foreground font-bold">Aetroniq Digital</span>
            </p>
            <p className="text-[7px] md:text-[8px] text-accent/60 font-black tracking-widest uppercase mt-0.5">
              Powered by Advanced UB™ Systems
            </p>
          </div>
        </div>
      </div>

      {/* Expanded Certificate Lightbox Modal */}
      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlargedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md cursor-zoom-out"
          >
            {/* Technical HUD Borders */}
            <div className="absolute inset-4 border border-white/5 pointer-events-none" />
            <div className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors cursor-pointer z-50">
              <button
                onClick={() => setEnlargedImage(null)}
                className="h-10 w-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#030712] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={enlargedImage}
                alt="ISO 9001:2015 Certificate"
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
export default Footer;
