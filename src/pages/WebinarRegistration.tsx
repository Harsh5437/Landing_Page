import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const defaultWebinarTitle = "Webinar on Multi-Hazard Resistant Construction in Hilly Regions";
const googleFormSubmitUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdjKcRm-Cr3vx-vQD7EumJIFJoAo3gVBRml4Fr751gqLQNoPg/formResponse";

const WebinarRegistration = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const webinarTitle = searchParams.get("title") || defaultWebinarTitle;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const organization = String(formData.get("organization") || "").trim();
        const designation = String(formData.get("designation") || "").trim();
        const mobile = String(formData.get("mobile") || "").trim();

        if (!name || !email || !organization || !designation || !mobile) {
            setError("Please complete all required fields.");
            return;
        }

        try {
            await fetch(googleFormSubmitUrl, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    "entry.1778681066": name,
                    "entry.1163387588": email,
                    "entry.603302237": organization,
                    "entry.2118865532": designation,
                    "entry.1935531442": mobile,
                }),
            });
            setIsSubmitted(true);
            window.setTimeout(() => navigate("/home"), 1400);
        } catch {
            setError("Registration could not be submitted. Please try again.");
        }
    };

    return (
        <main className="min-h-screen bg-background px-6 pb-20 pt-32 text-foreground">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8 border-b border-border/60 pb-8">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                        Webinar Registration
                    </span>
                    <h1 className="mt-3 font-space text-3xl font-black uppercase leading-tight md:text-5xl">
                        Reserve your seat
                    </h1>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {webinarTitle}
                    </p>
                </div>

                {isSubmitted ? (
                    <div className="border border-accent/40 bg-accent/[0.06] p-8 text-center">
                        <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-accent" />
                        <h2 className="font-space text-xl font-bold uppercase">Registration successful</h2>
                        <p className="mt-2 text-sm text-muted-foreground">Taking you back to the homepage...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 border border-border/70 bg-card/40 p-6 md:p-8">
                        <label className="block space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider">Full name *</span>
                            <input name="name" required className="h-11 w-full border border-input bg-background px-3 text-sm outline-none focus:border-accent" />
                        </label>
                        <label className="block space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider">Email address *</span>
                            <input type="email" name="email" required className="h-11 w-full border border-input bg-background px-3 text-sm outline-none focus:border-accent" />
                        </label>
                        <label className="block space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider">Organization *</span>
                            <input name="organization" required className="h-11 w-full border border-input bg-background px-3 text-sm outline-none focus:border-accent" />
                        </label>
                        <label className="block space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider">Designation *</span>
                            <input name="designation" required className="h-11 w-full border border-input bg-background px-3 text-sm outline-none focus:border-accent" />
                        </label>
                        <label className="block space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider">Mobile No. *</span>
                            <input type="tel" name="mobile" required inputMode="tel" pattern="[0-9+() -]{7,}" className="h-11 w-full border border-input bg-background px-3 text-sm outline-none focus:border-accent" />
                        </label>

                        {error && <p className="text-sm text-red-600">{error}</p>}

                        <button type="submit" className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent/80">
                            Register now
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
};

export default WebinarRegistration;