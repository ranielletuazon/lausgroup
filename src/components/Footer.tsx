import { ArrowUp, MapPin } from "lucide-react";

import logo from "../assets/images/logos/lausgroupfull-logo.png";

const address =
    "Jose Abad Santos Avenue, City of San Fernando, Pampanga, Philippines 2000";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3486.7839113605814!2d120.68657351013337!3d15.046918965934477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f71496ef164b%3A0x1957cb34e1f83aa7!2sLausGroup%20of%20Companies!5e1!3m2!1sen!2sus!4v1794465696036!5m2!1sen!2sus";

// Plain <a> links. Update the hrefs to match your routes.
const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about-us" },
    { label: "News and events", href: "/news-and-events" },
    { label: "Careers", href: "/careers" },
    { label: "Contact us", href: "/contact" },
];

const brandLinks = [
    { label: "Automotive", href: "/automotive" },
    { label: "Motorbikes", href: "/motorbikes" },
    { label: "Affiliates", href: "/affiliates" },
];

// TODO: replace with the real LausGroup social pages
const svgProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-4 w-4",
    "aria-hidden": true,
} as const;

const socials = [
    {
        label: "LausGroup on YouTube",
        href: "https://www.youtube.com/",
        icon: (
            <svg {...svgProps}>
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
            </svg>
        ),
    },
    {
        label: "LausGroup on Instagram",
        href: "https://www.instagram.com/",
        icon: (
            <svg {...svgProps}>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.75" />
            </svg>
        ),
    },
    {
        label: "LausGroup on Facebook",
        href: "https://www.facebook.com/",
        icon: (
            <svg {...svgProps}>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
];

const display = "font-['Barlow_Condensed']";
const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500";
const linkClass = `text-neutral-400 transition-colors hover:text-white ${focusRing}`;
const socialButton = `grid h-10 w-10 place-items-center rounded-full bg-white/10 text-neutral-200 transition-colors hover:bg-red-600 hover:text-white ${focusRing}`;

export default function Footer() {
    const scrollToTop = () => {
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    };

    return (
        <footer className="border-t-4 border-red-600 bg-neutral-900 font-['Barlow'] text-neutral-400">
            <div className="container mx-auto px-4 py-14 md:py-16">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.6fr] lg:gap-10">
                    {/* Brand */}
                    <div>
                        <a
                            href="/"
                            aria-label="LausGroup home"
                            className={`inline-block ${focusRing}`}
                        >
                            <img
                                src={logo}
                                alt="LausGroup - A Passion for Cars & Customer Care"
                                className="h-12 w-auto"
                            />
                        </a>
                        <p
                            className={`${display} mt-5 text-2xl font-bold italic leading-tight text-white`}
                        >
                            A Passion for Cars &amp; Customer Care.
                        </p>

                        <ul className="mt-6 flex items-center gap-2">
                            {socials.map((s) => (
                                <li key={s.label}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className={socialButton}
                                    >
                                        {s.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Explore */}
                    <nav aria-labelledby="footer-explore">
                        <h2
                            id="footer-explore"
                            className={`${display} text-xl font-bold text-white`}
                        >
                            Explore
                        </h2>
                        <ul className="mt-4 space-y-3">
                            {exploreLinks.map((l) => (
                                <li key={l.href}>
                                    <a href={l.href} className={linkClass}>
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Brands and services */}
                    <nav aria-labelledby="footer-brands">
                        <h2
                            id="footer-brands"
                            className={`${display} text-xl font-bold text-white`}
                        >
                            Brands and Services
                        </h2>
                        <ul className="mt-4 space-y-3">
                            {brandLinks.map((l) => (
                                <li key={l.label}>
                                    <a href={l.href} className={linkClass}>
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Visit us */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h2
                            className={`${display} text-xl font-bold text-white`}
                        >
                            Visit Us
                        </h2>
                        <div className="mt-4 flex items-start gap-3">
                            <MapPin
                                className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
                                aria-hidden="true"
                            />
                            <address className="not-italic leading-relaxed text-neutral-300">
                                {address}
                            </address>
                        </div>

                        <div className="mt-4 overflow-hidden rounded-md ring-1 ring-white/10">
                            <iframe
                                src={mapEmbedUrl}
                                title="Map showing the LausGroup office in San Fernando, Pampanga"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                                className="h-44 w-full border-0 grayscale contrast-125"
                            />
                        </div>

                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-3 inline-block font-semibold text-red-500 underline underline-offset-4 hover:text-red-400 ${focusRing}`}
                        >
                            Get directions
                        </a>
                    </div>
                </div>
            </div>

            {/* Legal bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto flex flex-col gap-4 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} LausGroup of Companies. All
                        rights reserved.
                        <span className="mx-2" aria-hidden="true">
                            |
                        </span>
                        <a
                            href="/data-privacy-notice"
                            className={`underline underline-offset-4 hover:text-white ${focusRing}`}
                        >
                            Data Privacy Notice
                        </a>
                    </p>

                    <button
                        type="button"
                        onClick={scrollToTop}
                        className={`inline-flex items-center gap-2 self-start rounded-sm border border-white/20 px-4 py-2 font-semibold text-neutral-200 transition-colors hover:bg-white hover:text-black sm:self-auto ${focusRing}`}
                    >
                        <ArrowUp className="h-4 w-4" aria-hidden="true" />
                        Back to top
                    </button>
                </div>
            </div>
        </footer>
    );
}
