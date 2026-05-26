import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2, Globe } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Handle standard zero-CORS redirection validation
    useEffect(() => {
        const hasSuccess = window.location.hash.includes("success=true") || window.location.search.includes("success=true");
        if (hasSuccess) {
            setIsSent(true);
            toast.success("Transmission complete! Message delivered to consultancy@urbanbuild.co.in.");
            
            // Clean browser address bar parameters
            const cleanUrl = window.location.href
                .replace("?success=true", "")
                .replace("&success=true", "");
            window.history.replaceState({}, document.title, cleanUrl);

            setTimeout(() => {
                setIsSent(false);
            }, 6000);
        }
    }, []);

    const contactDetails = [
        {
            icon: MapPin,
            title: "HEADQUARTERS",
            value: "Bhaniyawala Tiraha, Jolly Grant, Dehradun 248401, UK, India",
            link: "https://maps.google.com/?q=Bhaniyawala+Tiraha,+Jolly+Grant,+Dehradun+248401",
            color: "from-blue-500 to-indigo-600",
        },
        {
            icon: Phone,
            title: "DIRECT LINE",
            value: "+91 82917 22917",
            link: "tel:+918291722917",
            color: "from-teal-500 to-cyan-600",
        },
        {
            icon: Mail,
            title: "PRIMARY EMAIL",
            value: "consultancy@urbanbuild.co.in",
            link: "mailto:consultancy@urbanbuild.co.in",
            color: "from-amber-500 to-orange-600",
        },
        {
            icon: Mail,
            title: "SUPPORT EMAIL",
            value: "urbanbuildinfra@gmail.com",
            link: "mailto:urbanbuildinfra@gmail.com",
            color: "from-amber-600 to-orange-700",
        },
        {
            icon: Clock,
            title: "BUSINESS HOURS",
            value: "Monday – Saturday: 9:00 AM – 6:00 PM",
            link: "#",
            color: "from-purple-500 to-violet-600",
        },
    ];

    const handleSubmit = () => {
        setIsSubmitting(true);
    };

    return (
        <section className="relative bg-background min-h-screen w-full flex flex-col justify-center overflow-y-auto pt-24 md:pt-28 pb-16 selection:bg-accent selection:text-background">
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Technical Grid Background */}
                <motion.div
                    animate={{
                        backgroundPosition: ["0px 0px", "60px 60px"],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: `
                          linear-gradient(var(--accent) 1px, transparent 1px),
                          linear-gradient(90deg, var(--accent) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Soft ambient glowing gradients */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-12 md:mb-16"
                >
                    <span 
                        className="text-accent text-3xl lg:text-4xl mb-1 block"
                        style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                        Connect with us
                    </span>
                    <h2 className="font-space text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground mb-4 uppercase">
                        CONTACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 italic font-light">US</span>
                    </h2>
                    <div className="h-1 w-20 bg-accent rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)] mb-4" />
                    <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed max-w-xl">
                        Have an infrastructure project, inquiry, or partnership opportunity? 
                        Send us a message or visit our corporate headquarters in Dehradun.
                    </p>
                </motion.div>

                {/* Main Grid Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
                    
                    {/* Left Column: Office details & map */}
                    <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8 justify-between">
                        <div className="space-y-4">
                            <h3 className="text-xs font-black tracking-[0.25em] text-accent uppercase flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-accent" />
                                Contact Information
                            </h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                {contactDetails.map((detail, index) => {
                                    const Icon = detail.icon;
                                    return (
                                        <motion.a
                                            key={detail.title}
                                            href={detail.link}
                                            target={detail.link !== "#" ? "_blank" : undefined}
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="group flex gap-4 p-4 rounded-[20px] border border-border/50 bg-card hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 shadow-md"
                                        >
                                            <div className={`p-3 rounded-[14px] bg-gradient-to-br ${detail.color} text-white shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="text-[8px] font-black tracking-widest text-muted-foreground uppercase opacity-75 mb-0.5">
                                                    {detail.title}
                                                </span>
                                                <span className="text-xs md:text-sm text-foreground/90 font-light leading-relaxed group-hover:text-accent transition-colors duration-300">
                                                    {detail.value}
                                                </span>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Custom Embedded Map Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="relative flex-1 min-h-[250px] rounded-[24px] overflow-hidden border border-border/50 shadow-lg group hover:border-accent/30 transition-all duration-500"
                        >
                            <iframe
                                title="UrbanBuild Location Map"
                                src="https://maps.google.com/maps?q=Bhaniyawala%20Tiraha,%20Jolly%20Grant,%20Dehradun%20248401&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                className="absolute inset-0 w-full h-full border-0 grayscale dark:invert dark:opacity-85 group-hover:grayscale-0 dark:group-hover:invert-0 transition-all duration-700"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            {/* Ambient dark map technical overlay */}
                            <div className="absolute inset-0 bg-accent/5 pointer-events-none mix-blend-color" />
                        </motion.div>
                    </div>

                    {/* Right Column: Premium Contact Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative h-full flex flex-col p-6 md:p-8 rounded-[28px] border border-border/50 bg-card shadow-xl backdrop-blur-xl"
                        >
                            <div className="absolute top-4 right-6 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                                <span className="text-[8px] font-black tracking-widest text-muted-foreground uppercase">Secure Link</span>
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                Send a Message
                            </h3>

                            <form 
                                action="https://formsubmit.co/consultancy@urbanbuild.co.in" 
                                method="POST" 
                                onSubmit={handleSubmit} 
                                className="flex-1 flex flex-col gap-5"
                            >
                                {/* FormSubmit Configuration Fields */}
                                <input type="hidden" name="_next" value={window.location.origin + "/#/contact?success=true"} />
                                <input type="hidden" name="_subject" value="New UB™ Contact Form Inquiry" />
                                <input type="hidden" name="_template" value="table" />

                                {/* Name Input */}
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="name" className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                        Your Name <span className="text-accent">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        disabled={isSubmitting || isSent}
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-sm font-light leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300 disabled:opacity-50"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="email" className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                        Email Address <span className="text-accent">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        disabled={isSubmitting || isSent}
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        placeholder="yourname@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-sm font-light leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300 disabled:opacity-50"
                                    />
                                </div>

                                {/* Subject Input */}
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="subject" className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                        Subject <span className="text-accent">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        disabled={isSubmitting || isSent}
                                        value={formState.subject}
                                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                        placeholder="Consultancy, Infrastructure inquiry, etc."
                                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-sm font-light leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300 disabled:opacity-50"
                                    />
                                </div>

                                {/* Message Input */}
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <label htmlFor="message" className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                        Message <span className="text-accent">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        disabled={isSubmitting || isSent}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        placeholder="Describe your project or inquiry details..."
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-sm font-light leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300 disabled:opacity-50 resize-none min-h-[120px]"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || isSent}
                                    className={`mt-4 w-full py-3.5 rounded-xl text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 shadow-md flex items-center justify-center gap-2 select-none ${isSent
                                        ? "bg-emerald-500 text-white shadow-emerald-500/20"
                                        : isSubmitting
                                            ? "bg-accent/80 text-background cursor-wait"
                                            : "bg-accent text-background hover:bg-background hover:text-accent border border-accent hover:border-accent shadow-accent/10"
                                    }`}
                                >
                                    {isSent ? (
                                        <>
                                            <CheckCircle2 className="w-4 h-4 animate-bounce" />
                                            TRANSMITTED SUCCESSFULLY
                                        </>
                                    ) : isSubmitting ? (
                                        <>
                                            <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin shrink-0" />
                                            TRANSMITTING DATA...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            TRANSMIT MESSAGE
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
