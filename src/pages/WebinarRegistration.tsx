import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Calendar, Clock, User, Mail, ShieldAlert, Award } from "lucide-react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { track } from "@vercel/analytics";

const defaultWebinarTitle = "Inspection, Condition Assessment and Rehabilitation Measures for Bridges";
const googleFormSubmitUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeGiLiOFuNxBnVWDusXXQtKjp0vIzxdHYxoXZfj-TwR7NsZbA/formResponse";
const queriesEmail = "consultancy@urbanbuild.co.in";

interface StoredRegistration {
    email: string;
    mobile: string;
    name: string;
    timestamp: string;
}

const WebinarRegistration = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const webinarTitle = searchParams.get("title") || defaultWebinarTitle;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim().toLowerCase();
        const organization = String(formData.get("organization") || "").trim();
        const designation = String(formData.get("designation") || "").trim();
        const mobile = String(formData.get("mobile") || "").trim().replace(/[\s-]/g, "");

        if (!name || !email || !organization || !designation || !mobile) {
            setError("Please fill in all required fields.");
            return;
        }

        // Strict duplicate check (email & mobile)
        const storageKey = "urbanbuild_webinar_bridge_attendees";
        let existingList: StoredRegistration[] = [];
        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) existingList = JSON.parse(raw);
        } catch {
            existingList = [];
        }

        const isDuplicateEmail = existingList.some(item => item.email.toLowerCase() === email);
        const isDuplicateMobile = existingList.some(item => item.mobile === mobile);

        if (isDuplicateEmail || isDuplicateMobile) {
            setError(`You have already registered for this webinar with this ${isDuplicateEmail ? "email address" : "mobile number"}. For queries or updates, please reach out to ${queriesEmail}.`);
            return;
        }

        setIsSubmitting(true);

        try {
            await fetch(googleFormSubmitUrl, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    "entry.254845038": name,
                    "entry.897685313": email,
                    "entry.1523692885": organization,
                    "entry.1072939727": designation,
                    "entry.1489617453": mobile,
                }),
            });

            track('webinar_registered', {
                title: webinarTitle,
                organization: organization,
            });

            try {
                existingList.push({
                    email,
                    mobile,
                    name,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem(storageKey, JSON.stringify(existingList));
            } catch {
                // Ignore storage issues in private browsing
            }

            setIsSubmitted(true);
            window.setTimeout(() => navigate("/"), 2400);
        } catch {
            setError("Registration could not be submitted right now. Please try again or email us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-24 transition-colors duration-300">
            {/* Full Width Container */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                
                {/* Breadcrumbs & Navigation */}
                <div className="mb-6 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/news" className="hover:text-accent transition-colors">News &amp; Events</Link>
                    <span>/</span>
                    <span className="text-foreground">Webinar Registration</span>
                </div>

                {/* Hero / Header Section */}
                <div className="border-b border-border/60 pb-10 mb-12">
                    <h1 className="font-sans leading-snug text-foreground max-w-5xl">
                        <span className="text-2xl md:text-4xl block font-bold text-accent tracking-wide uppercase">
                            TECHNICAL WEBINAR
                        </span>
                        <span className="text-lg md:text-2xl block mt-1.5 font-medium text-foreground tracking-normal">
                            URBANBUILD in association with Indian Buildings Congress (IBC) - Uttarakhand Chapter
                        </span>
                    </h1>
                    <p className="mt-4 text-base md:text-xl font-sans font-bold text-black dark:text-white leading-normal">
                        <span className="text-accent font-bold">Topic:</span> {webinarTitle}
                    </p>

                    {/* Metadata Strip */}
                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-4 border border-border/60 bg-card/40 rounded-sm">
                            <div className="flex items-center gap-2 text-accent text-xs font-mono mb-1">
                                <Calendar className="h-4 w-4" />
                                <span>DATE</span>
                            </div>
                            <p className="font-space font-bold text-sm text-foreground">Friday, 6 Nov 2026</p>
                        </div>
                        <div className="p-4 border border-border/60 bg-card/40 rounded-sm">
                            <div className="flex items-center gap-2 text-accent text-xs font-mono mb-1">
                                <Clock className="h-4 w-4" />
                                <span>TIME</span>
                            </div>
                            <p className="font-space font-bold text-sm text-foreground">05:00 PM (IST)</p>
                        </div>
                        <div className="p-4 border border-border/60 bg-card/40 rounded-sm">
                            <div className="flex items-center gap-2 text-accent text-xs font-mono mb-1">
                                <User className="h-4 w-4" />
                                <span>RESOURCE PERSON</span>
                            </div>
                            <p className="font-space font-bold text-sm text-foreground truncate">Er. Ganesh Kumar Sahu</p>
                            <p className="text-[11px] text-muted-foreground">Advisor, CSIR-CRRI</p>
                        </div>
                        <div className="p-4 border border-border/60 bg-card/40 rounded-sm">
                            <div className="flex items-center gap-2 text-accent text-xs font-mono mb-1">
                                <Award className="h-4 w-4" />
                                <span>FEE</span>
                            </div>
                            <p className="font-space font-bold text-sm text-emerald-500">Free Registration</p>
                            <p className="text-[11px] text-muted-foreground">Prior booking mandatory</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout - Centered Focused Registration */}
                <div className="max-w-3xl mx-auto space-y-6">
                    {isSubmitted ? (
                        <div className="border border-emerald-500/40 bg-emerald-500/[0.06] p-10 text-center rounded-sm space-y-4">
                            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                            <h3 className="font-space text-2xl font-bold uppercase text-foreground">
                                Registration Confirmed!
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                                Thank you for registering. Your details have been successfully recorded. You will receive session access details prior to the webinar.
                            </p>
                            <p className="text-[11px] font-mono text-accent">
                                Redirecting you to the homepage...
                            </p>
                        </div>
                    ) : (
                        <div className="border border-border/80 bg-card/70 p-6 md:p-10 rounded-sm shadow-xl backdrop-blur-sm">
                            <div className="border-b border-border/60 pb-4 mb-6">
                                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                                    OFFICIAL REGISTRATION
                                </span>
                                <h3 className="font-space text-xl md:text-2xl font-bold uppercase text-foreground mt-1">
                                    Reserve Your Seat
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Registration is free, but prior registration is mandatory. Single entry per participant.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="block space-y-1.5">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">Full Name *</span>
                                        <input
                                            name="name"
                                            required
                                            placeholder="e.g. Er. Rahul Sharma"
                                            className="h-11 w-full border border-input bg-background px-3.5 text-sm outline-none focus:border-accent transition-colors"
                                        />
                                    </label>

                                    <label className="block space-y-1.5">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">Mobile Number *</span>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            required
                                            inputMode="tel"
                                            pattern="[0-9+() -]{10,}"
                                            placeholder="e.g. +91 9876543210"
                                            className="h-11 w-full border border-input bg-background px-3.5 text-sm outline-none focus:border-accent transition-colors"
                                        />
                                    </label>
                                </div>

                                <label className="block space-y-1.5">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">Email Address *</span>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="name@organization.com"
                                        className="h-11 w-full border border-input bg-background px-3.5 text-sm outline-none focus:border-accent transition-colors"
                                    />
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="block space-y-1.5">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">Organization / Department *</span>
                                        <input
                                            name="organization"
                                            required
                                            placeholder="e.g. State PWD / NHAI / Consultant"
                                            className="h-11 w-full border border-input bg-background px-3.5 text-sm outline-none focus:border-accent transition-colors"
                                        />
                                    </label>

                                    <label className="block space-y-1.5">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">Designation *</span>
                                        <input
                                            name="designation"
                                            required
                                            placeholder="e.g. Executive Engineer / Project Manager"
                                            className="h-11 w-full border border-input bg-background px-3.5 text-sm outline-none focus:border-accent transition-colors"
                                        />
                                    </label>
                                </div>

                                {error && (
                                    <div className="flex items-start gap-2.5 p-3.5 bg-red-500/10 border border-red-500/30 rounded text-red-500 text-xs leading-relaxed">
                                        <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-background transition-all hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg hover:shadow-accent/20"
                                >
                                    {isSubmitting ? "Submitting Registration..." : "Complete Registration"}
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                <p className="text-[11px] text-center text-muted-foreground pt-1">
                                    Duplicate registrations with the same email or mobile number are strictly prevented.
                                </p>
                            </form>
                        </div>
                    )}

                    {/* Queries & Contact */}
                    <div className="p-5 border border-accent/30 bg-accent/[0.04] rounded-sm text-center">
                        <p className="text-xs text-muted-foreground">
                            For any queries regarding the webinar or registration, please contact:{" "}
                            <a href={`mailto:${queriesEmail}`} className="text-accent underline font-mono font-bold">
                                {queriesEmail}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WebinarRegistration;