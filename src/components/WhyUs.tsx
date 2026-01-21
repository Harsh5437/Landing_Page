import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Award, Lightbulb, FileCheck, TrendingUp, Clock } from "lucide-react";

const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: Shield,
      title: "Trusted Partner",
      description: "A proven track record of delivering projects on time and within budget, earning the trust of clients across industries."
    },
    {
      icon: Award,
      title: "Uncompromising Quality",
      description: "Every project is built to the highest standards using premium materials and industry-leading construction techniques."
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description: "Leveraging cutting-edge technology and innovative methods to optimize efficiency and deliver superior results."
    },
    {
      icon: FileCheck,
      title: "Full Compliance",
      description: "Rigorous adherence to all safety regulations, building codes, and environmental standards without exception."
    },
    {
      icon: TrendingUp,
      title: "Scalable Solutions",
      description: "From boutique projects to large-scale developments, we scale our expertise to meet any challenge."
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "Meticulous project management ensures milestones are met and projects are completed as scheduled."
    }
  ];

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="accent-bar mb-6" />
          <h2 className="heading-section mb-6 text-primary">
            Why URBANBUILD™
          </h2>
          <p className="body-large max-w-2xl text-muted-foreground">
            When you choose URBANBUILD™, you're partnering with a team that 
            prioritizes your success at every stage of the project lifecycle.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative border-b border-border pb-6"
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-secondary transition-colors group-hover:bg-accent">
                  <reason.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent-foreground" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-primary">{reason.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
