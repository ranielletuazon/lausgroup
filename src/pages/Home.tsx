import type { CSSProperties } from "react";
import { Layers, MessageSquareQuote, Wallet, Wrench } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
    automotiveBrands,
    trucksBuses,
    motorbikes,
    affiliates,
    foodGroup,
    mediaGroup,
} from "../assets/data";
import HeroBanner from "../components/HeroBanner";

import heroBanner from "../assets/images/herobanner.jpg";
import heroBanner2 from "../assets/images/herobanner2.jpg";
import heroBanner3 from "../assets/images/herobanner3.jpg";
import home1 from "../assets/images/home1.jpg";
import home2 from "../assets/images/home2.jpg";
import home3 from "../assets/images/home3.jpg";

// Add a second image here and the hero becomes a carousel automatically.
const heroSlides = [
    { src: heroBanner, alt: "Carworld Pampanga - The Home of Mitsubishi" },
    { src: heroBanner3, alt: "Carworld Pampanga - The Home of Mitsubishi" },
    { src: heroBanner2, alt: "Carworld Pampanga - The Home of Mitsubishi" },
    // { src: heroBanner2, alt: "..." },
];

// Every brand section, in display order. Backgrounds alternate automatically.
const brandSections = [
    { id: "automotive", title: "Automotive", brands: automotiveBrands },
    { id: "trucks-buses", title: "Trucks and Buses", brands: trucksBuses },
    { id: "motorbikes", title: "Motorbike", brands: motorbikes },
    {
        id: "affiliates",
        title: "Affiliates",
        brands: affiliates,
    },
    {
        id: "food",
        title: "Food group",
        brands: foodGroup,
    },
    {
        id: "media",
        title: "Media group",
        description: "Television, radio and print.",
        brands: mediaGroup,
    },
];

const promos = [
    {
        image: home1,
        alt: "Mitsubishi Strada Athlete Black Series",
        title: "Strada Athlete Black Series",
        body: "See it at Carworld, the home of Mitsubishi in Pampanga.",
        cta: "Visit Mitsubishi Carworld",
        to: "https://mitsubishicarworld.com.ph/",
        external: true,
    },
    {
        image: home2,
        alt: "Corporate Guarantee - We Value Our Commitment",
        title: "Corporate Guarantee",
        body: "Protect your vehicle with our non-life insurance affiliate.",
        cta: "Visit Corporate Guarantee",
        to: "https://corporateguarantee.com.ph/",
        external: true,
    },
];

const reasons = [
    {
        icon: Wallet,
        title: "Financing made easy",
        body: "Fast approval and quick turnaround time. Flexible financing from all LausGroup dealerships.",
        cite: "",
    },
    {
        icon: Layers,
        title: "Wide range of brands",
        body: "Diverse lifestyles and premium brands under one roof, backed by a wide brand roster and dependable customer service.",
        cite: "",
    },
    {
        icon: MessageSquareQuote,
        title: "Trusted by thousands",
        body: "“I had a great experience. Excellent customer service and attention to detail. I highly recommend this dealership.”",
        cite: "Sandra Villareal, Hyundai La Union",
    },
    {
        icon: Wrench,
        title: "Car service and maintenance",
        body: "A well-trained team and state-of-the-art equipment, so your vehicle comes back worry-free.",
        cite: "",
    },
];

// Shared class strings (kept here so the JSX below stays readable)
const display = "font-['Barlow_Condensed']";
const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";
const btnBase = `inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition-colors ${focusRing}`;
const btnPrimary = `${btnBase} bg-red-600 text-white hover:bg-red-700`;
const btnOutlineLight = `${btnBase} border border-white/60 text-white hover:bg-white hover:text-black`;

/**
 * Centering a short last row inside a CSS grid.
 *
 * The brand grid has DOUBLE the visible columns (4 / 6 / 8 / 10) and every tile
 * spans 2 of them, so a row of 5 tiles is 10 columns wide. For the first tile of a
 * short last row we set an explicit start column that leaves equal space on both sides.
 *
 * These are the visible columns per row at: base, sm, md, lg.
 * If you change the column counts in the <ul> classes, change them here too.
 */
const COLUMNS_PER_BREAKPOINT = [2, 3, 4, 5];

const centerLastRow = (index: number, total: number): CSSProperties => {
    const vars: Record<string, string | number> = {};
    COLUMNS_PER_BREAKPOINT.forEach((cols, b) => {
        const leftover = total % cols; // tiles in the short last row (0 = full row)
        const isFirstOfShortRow = leftover !== 0 && index === total - leftover;
        vars[`--cs${b}`] = isFirstOfShortRow ? cols - leftover + 1 : "auto";
    });
    return vars as CSSProperties;
};

export default function Home() {
    return (
        <>
            <Header />
            <main className="w-full max-w-full text-neutral-900">
                {/* Hero + tagline */}
                <section aria-label="Welcome">
                    <HeroBanner slides={heroSlides} />

                    <div className="border-t-4 border-red-600 bg-black text-white">
                        <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-8 text-center md:flex-row md:justify-center md:py-9 md:text-left">
                            <p
                                className={`${display} text-3xl font-bold italic leading-tight md:text-4xl`}
                            >
                                A Passion for Cars &amp; Customer Care.
                            </p>
                        </div>
                    </div>
                </section>

                {brandSections.map((section, i) => {
                    const muted = i % 2 === 1;

                    // Only show brands that have a logo. Filtering here (not later) means
                    // the last-row centering counts just the tiles that are visible.
                    const brands = section.brands.filter((brand) => brand.logo);
                    if (brands.length === 0) return null;

                    return (
                        <section
                            key={section.id}
                            aria-labelledby={`brands-${section.id}`}
                            className={muted ? "bg-neutral-50" : "bg-white"}
                        >
                            <div className="container mx-auto px-4 py-14 md:py-16">
                                <div className="text-center">
                                    <h3
                                        id={`brands-${section.id}`}
                                        className={`${display} text-3xl font-bold md:text-4xl uppercase`}
                                    >
                                        {section.title}
                                    </h3>
                                </div>

                                {/* 4 / 6 / 8 / 10 grid columns = 2 / 3 / 4 / 5 tiles per row */}
                                <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                                    {brands.map((brand, index) => (
                                        <li
                                            key={brand.brandName}
                                            style={centerLastRow(
                                                index,
                                                brands.length,
                                            )}
                                            className={`col-span-2 flex aspect-square items-center justify-center rounded-md p-5 ring-1 ring-neutral-200 [grid-column-start:var(--cs0)] sm:[grid-column-start:var(--cs1)] md:[grid-column-start:var(--cs2)] lg:[grid-column-start:var(--cs3)] ${
                                                muted
                                                    ? "bg-white"
                                                    : "bg-neutral-50"
                                            }`}
                                        >
                                            <img
                                                src={brand.logo}
                                                alt={brand.brandName}
                                                loading="lazy"
                                                className="max-h-full max-w-full object-contain mix-blend-multiply"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    );
                })}

                {/* Promotions */}
                <section
                    aria-label="Featured"
                    className="bg-neutral-50 py-16 md:py-24"
                >
                    <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2">
                        {promos.map((promo) => (
                            <article
                                key={promo.title}
                                className="flex flex-col overflow-hidden rounded-md bg-white ring-1 ring-neutral-200"
                            >
                                <img
                                    src={promo.image}
                                    alt={promo.alt}
                                    loading="lazy"
                                    className="aspect-[4/5] w-full bg-neutral-100 object-cover"
                                />
                                <div className="flex flex-1 flex-col justify-between gap-4 p-6 sm:flex-row sm:items-end">
                                    <div>
                                        <h3
                                            className={`${display} text-2xl font-bold`}
                                        >
                                            {promo.title}
                                        </h3>
                                        <p className="mt-1 max-w-sm text-neutral-600">
                                            {promo.body}
                                        </p>
                                    </div>
                                    <a
                                        href={promo.to}
                                        target="_blank"
                                        className={`shrink-0 font-semibold text-red-600 underline underline-offset-4 hover:text-red-700 ${focusRing}`}
                                    >
                                        {promo.cta}
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Why choose us */}
                <section
                    className="relative bg-cover bg-center text-white"
                    style={{ backgroundImage: `url(${home3})` }}
                >
                    {/* Adjust this overlay if your photo is already dark */}
                    <div
                        className="absolute inset-0 bg-black/55"
                        aria-hidden="true"
                    />

                    <div className="container relative mx-auto px-4 py-16 md:py-24">
                        <h2
                            className={`${display} text-center text-4xl font-bold leading-none md:text-5xl`}
                        >
                            Why choose us
                        </h2>

                        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                            {reasons.map(
                                ({ icon: Icon, title, body, cite }) => (
                                    <div
                                        key={title}
                                        className="flex flex-col gap-3 border-l-2 border-white/25 pl-6"
                                    >
                                        <Icon
                                            className="h-9 w-9 text-red-500"
                                            strokeWidth={1.5}
                                            aria-hidden="true"
                                        />
                                        <h3
                                            className={`${display} text-2xl font-bold`}
                                        >
                                            {title}
                                        </h3>
                                        <p
                                            className={`leading-relaxed text-neutral-200 ${
                                                cite ? "italic" : ""
                                            }`}
                                        >
                                            {body}
                                        </p>
                                        {cite && (
                                            <p className="text-sm text-neutral-300">
                                                {cite}
                                            </p>
                                        )}
                                    </div>
                                ),
                            )}
                        </div>

                        <div className="mt-14 flex flex-col items-center gap-5 border-t border-white/25 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
                            <p className={`${display} text-2xl font-semibold`}>
                                Talk to a LausGroup dealership today.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <a
                                    href="/contact?type=test-drive"
                                    className={btnPrimary}
                                >
                                    TEST DRIVE
                                </a>
                                <a
                                    href="/contact?type=quotation"
                                    className={btnOutlineLight}
                                >
                                    REQUEST FOR A VEHICLE QUOTATION
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
