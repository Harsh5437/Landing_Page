import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Linkedin, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="section-dark py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 block text-2xl font-black tracking-tight text-white">
              URBANBUILD<span className="text-steel">™</span>
            </span>
            <p className="mb-6 text-sm leading-relaxed text-white/60">
              Engineering progress with precision. Building tomorrow's cities with 
              today's innovation and unwavering commitment to excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/10 text-white/70 transition-all hover:bg-steel hover:text-white">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/10 text-white/70 transition-all hover:bg-steel hover:text-white">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/10 text-white/70 transition-all hover:bg-steel hover:text-white">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["About Us", "Our Services", "Projects", "Sustainability", "Careers"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/60 transition-colors hover:text-steel">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-3">
              {["Residential", "Commercial", "Infrastructure", "Sustainable Dev", "Renovations"].map((service) => (
                <li key={service}>
                  <a href="#" className="text-sm text-white/60 transition-colors hover:text-steel">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-steel" />
                <span className="text-sm text-white/60">
                  JollyGrant, Dehradun, UttaraKhand.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-steel" />
                <span className="text-sm text-white/60">+91 </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-steel" />
                <span className="text-sm text-white/60">info@urbanbuild.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-white/40">
              © {currentYear} URBANBUILD™. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-white/40 transition-colors hover:text-white/70">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-white/40 transition-colors hover:text-white/70">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-white/40 transition-colors hover:text-white/70">
                Cookie Settings
              </a>
            </div>
            <p className="text-xs text-white/40">
              © Designed & Developed By Aetroniq Digital.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
