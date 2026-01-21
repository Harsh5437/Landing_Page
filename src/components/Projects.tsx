import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Skyline Tower",
      category: "Commercial",
      location: "Downtown Metro",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      title: "Harbor View Residences",
      category: "Residential",
      location: "Coastal District",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      title: "Central Station Renovation",
      category: "Infrastructure",
      location: "City Center",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      title: "Green Valley Complex",
      category: "Sustainable",
      location: "Eco Park District",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      title: "Metro Bridge Expansion",
      category: "Infrastructure",
      location: "River Crossing",
      image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      title: "The Atrium",
      category: "Commercial",
      location: "Business Park",
      image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ];

  return (
    <section id="projects" className="bg-secondary py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <div className="accent-bar mb-6" />
            <h2 className="heading-section mb-4 text-primary">Featured Projects</h2>
            <p className="body-large max-w-xl text-muted-foreground">
              A showcase of our finest work across residential, commercial, and infrastructure development.
            </p>
          </div>
          <button className="btn-primary rounded-sm text-sm">
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group cursor-pointer overflow-hidden rounded-sm bg-background ${
                project.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="mb-2 inline-block rounded-sm bg-steel/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                    {project.category}
                  </span>
                  <h3 className="heading-card text-white">{project.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{project.location}</p>
                </div>
                {/* Hover Arrow */}
                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
