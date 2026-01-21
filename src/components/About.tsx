import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Users } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Eye,
      title: "Our Vision",
      description: "To be the most trusted name in urban development, setting new standards for quality, innovation, and sustainability in every project we undertake."
    },
    {
      icon: Target,
      title: "Our Mission",
      description: "Delivering exceptional construction solutions that transform communities, exceed expectations, and create lasting value for our clients and stakeholders."
    },
    {
      icon: Users,
      title: "Our Leadership",
      description: "A team of industry veterans with decades of combined experience, committed to excellence and driving the future of urban construction."
    }
  ];

  return (
    <section id="about" className="bg-secondary py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div ref={ref} className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-bar mb-6" />
            <h2 className="heading-section mb-6 text-primary">
              About URBANBUILD™
            </h2>
            <p className="body-large mb-8 text-muted-foreground">
              For over two decades, URBANBUILD™ has been at the forefront of 
              urban construction and development. We combine innovative engineering 
              with sustainable practices to create structures that stand the test of time.
            </p>
            <p className="text-muted-foreground">
              Our commitment to excellence, safety, and client satisfaction has made us 
              a leader in residential, commercial, and infrastructure development. 
              Every project we undertake reflects our dedication to quality craftsmanship 
              and forward-thinking design.
            </p>
          </motion.div>

          {/* Right - Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="premium-card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-accent">
                  <feature.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="heading-card mb-3 text-primary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
