import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Home, Truck, Leaf } from "lucide-react";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Home,
      title: "Residential Development",
      description: "Premium homes and residential complexes designed for modern living. From luxury apartments to family estates, we create spaces where life thrives.",
      features: ["Custom Home Design", "Multi-Family Units", "Smart Home Integration"]
    },
    {
      icon: Building2,
      title: "Commercial Construction",
      description: "State-of-the-art commercial spaces that drive business success. Office towers, retail centers, and mixed-use developments built for the future.",
      features: ["Office Buildings", "Retail Spaces", "Mixed-Use Projects"]
    },
    {
      icon: Truck,
      title: "Infrastructure",
      description: "Critical infrastructure that connects communities. Roads, bridges, utilities, and public facilities engineered for longevity and reliability.",
      features: ["Transportation", "Public Facilities", "Utility Networks"]
    },
    {
      icon: Leaf,
      title: "Sustainable Development",
      description: "Eco-conscious construction that minimizes environmental impact. LEED-certified buildings and green infrastructure for a sustainable future.",
      features: ["LEED Certification", "Green Building", "Renewable Energy"]
    }
  ];

  return (
    <section id="services" className="section-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-steel" />
          <h2 className="heading-section mb-6 text-white">What We Do</h2>
          <p className="body-large mx-auto max-w-2xl text-white/60">
            Comprehensive construction services tailored to meet the unique demands 
            of every project, delivered with precision and excellence.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-sm border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-steel/50 hover:bg-white/10"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-sm bg-steel/20 transition-colors group-hover:bg-steel">
                <service.icon className="h-7 w-7 text-steel transition-colors group-hover:text-white" />
              </div>
              <h3 className="heading-card mb-4 text-white">{service.title}</h3>
              <p className="mb-6 text-white/60">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-white/50">
                    <span className="h-1 w-1 rounded-full bg-steel" />
                    {feature}
                  </li>
                ))}
              </ul>
              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-steel transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
