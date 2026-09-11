import { Source_Serif_4, IBM_Plex_Sans } from "next/font/google";
import { ContactForm } from "../_components/ContactForm";
import { SocialLinks } from "../_components/social-links";

const serif = Source_Serif_4({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-serif",
});

const sans = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-sans",
});

const contactDetails = [
    {
        label: "Email",
        value: "support@fixitnow.com",
        href: "mailto:support@fixitnow.com",
    },
    { label: "Phone", value: "+880-123456789", href: "tel:+880123456789" },
    {
        label: "Address",
        value: "Mayor Gali, East Nasirabad, Chittagong",
        href: "https://maps.google.com/Mayor+Gali,+East+Nasirabad,+Chittagong",
    },
];

export default function ContactPage() {
    return (
        <main
            className={`${serif.variable} ${sans.variable} font-sans min-h-screen dark:bg-[#2E6FA0] dark:text-white`}
        >
            <div className="mx-auto grid max-w-5xl gap-16 px-6 py-24 md:grid-cols-2 md:gap-12 md:py-32">
                {/* Left column */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">
                            Tell us what
                            <br />
                            you&apos;re building.
                        </h1>
                        <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[#1C1B19]/70">
                            We reply within one business day, from a real person on the team —
                            not a queue.
                        </p>
                    </div>

                    <ul className="mt-16 divide-y divide-[#1C1B19]/10 border-t border-[#1C1B19]/10">
                        {contactDetails.map((item) => (
                            <li
                                key={item.label}
                                className="flex items-baseline justify-between gap-4 py-4"
                            >
                                <span className="text-sm light:text-[#1C1B19]/50">
                                    {item.label}
                                </span>
                                <a
                                    href={item.href}
                                    className="text-right text-[15px] decoration-[#1C1B19]/20 underline-offset-4 transition hover:decoration-[#2F5D50]"
                                >
                                    {item.value}
                                </a>
                            </li>

                        ))}
                        <div className="mt-8 flex items-center justify-between">
                            <span className="text-sm text-[#1C1B19]/50">Follow</span>
                            <SocialLinks />
                        </div>

                    </ul>
                </div>

                {/* Right column */}
                <div className="border rounded-2xl border-[#1C1B19]/12 dark:bg-[#0C2C55] p-8 sm:p-10">
                    <ContactForm />
                </div>
            </div>
        </main>
    );
}
