import { ArrowUp, MapPin } from "lucide-react";

import logo from "../assets/images/logos/lausgroupfull-logo.png";

export default function Footer() {
    const ADDRESS =
        "Jose Abad Santos Avenue, City of San Fernando, Pampanga, Philippines 2000";

    // Opens Google Maps with directions to the address
    // const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

    // The small map shown in the footer
    const MAP_EMBED_URL =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3486.7839113605814!2d120.68657351013337!3d15.046918965934477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f71496ef164b%3A0x1957cb34e1f83aa7!2sLausGroup%20of%20Companies!5e1!3m2!1sen!2sus!4v1794465696036!5m2!1sen!2sus";

    // The "Explore" column
    const EXPLORE_LINKS = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us" },
        { label: "News and Events", href: "/news-and-events" },
        { label: "Careers", href: "https://careers.lausgroup.com.ph/" },
        { label: "Contact Us", href: "/contact" },
    ];

    // The "Brands and Services" column
    const BRAND_LINKS = [
        { label: "Automotive", href: "/automotive" },
        { label: "Motorbikes", href: "/motorbikes" },
        { label: "Affiliates", href: "/affiliates" },
    ];

    // TODO: replace with the real LausGroup social pages
    // icon: the shape of the logo (a 24x24 outline path)
    const SOCIALS = [
        {
            label: "LausGroup on YouTube",
            href: "https://www.youtube.com/",
            icon: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17 M10 15l5-3-5-3z",
        },
        {
            label: "LausGroup on Instagram",
            href: "https://www.instagram.com/",
            icon: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5z M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M17.5 6.5h.01",
        },
        {
            label: "LausGroup on Facebook",
            href: "https://www.facebook.com/",
            icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
        },
    ];

    // Scrolls back to the top of the page (no animation if the visitor turned motion off)
    const scrollToTop = () => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    };

    return (
        <footer className="border-t-4 border-red-600 bg-neutral-900 font-['Barlow'] text-neutral-400">
            <div className="container mx-auto px-4 py-14 md:py-16">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.6fr] lg:gap-10">
                    {/* Logo, tagline and socials */}
                    <div>
                        <a
                            href="/"
                            aria-label="LausGroup home"
                            className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                        >
                            <img
                                src={logo}
                                alt="LausGroup - A Passion for Cars & Customer Care"
                                className="h-12 w-auto"
                            />
                        </a>
                        <p className="mt-5 font-['Barlow_Condensed'] text-2xl font-bold italic leading-tight text-white">
                            A Passion for Cars &amp; Customer Care.
                        </p>

                        <ul className="mt-6 flex items-center gap-2">
                            {SOCIALS.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-neutral-200 transition-colors hover:bg-red-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={1.75}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                            className="h-4 w-4"
                                        >
                                            <path d={social.icon} />
                                        </svg>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Explore */}
                    <nav aria-label="Explore">
                        <h2 className="font-['Barlow_Condensed'] text-xl font-bold text-white">
                            Explore
                        </h2>
                        <ul className="mt-4 space-y-3">
                            {EXPLORE_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-neutral-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Brands and services */}
                    <nav aria-label="Brands and Services">
                        <h2 className="font-['Barlow_Condensed'] text-xl font-bold text-white">
                            Brands and Services
                        </h2>
                        <ul className="mt-4 space-y-3">
                            {BRAND_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-neutral-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Address and map */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h2 className="font-['Barlow_Condensed'] text-xl font-bold text-white">
                            Visit Us
                        </h2>
                        <div className="mt-4 flex items-start gap-3">
                            <MapPin
                                className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
                                aria-hidden="true"
                            />
                            <address className="not-italic leading-relaxed text-neutral-300">
                                {ADDRESS}
                            </address>
                        </div>

                        <div className="mt-4 overflow-hidden rounded-md ring-1 ring-white/10">
                            <iframe
                                src={MAP_EMBED_URL}
                                title="Map showing the LausGroup office in San Fernando, Pampanga"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                                className="h-44 w-full border-0 grayscale contrast-125"
                            />
                        </div>

                        {/* <a
                            href={MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block font-semibold text-red-500 underline underline-offset-4 hover:text-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                        >
                            Get directions
                        </a> */}
                    </div>
                </div>
            </div>

            {/* Copyright and back to top */}
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
                            className="underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                        >
                            Data Privacy Notice
                        </a>
                    </p>

                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="inline-flex cursor-pointer items-center gap-2 self-start rounded-sm border border-white/20 px-4 py-2 font-semibold text-neutral-200 transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 sm:self-auto"
                    >
                        <ArrowUp className="h-4 w-4" aria-hidden="true" />
                        Back to top
                    </button>
                </div>
            </div>
        </footer>
    );
}
