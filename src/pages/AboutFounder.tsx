import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";

import heroBanner from "../assets/images/aboutfounder1.jpg";

export default function AboutFounder() {
    // The photos of the banner at the top
    const HERO_SLIDES = [
        {
            src: heroBanner,
            alt: "Liberato “Levy” P. Laus in front of the LausGroup sign",
        },
        // { src: heroBanner2, alt: "..." },
    ];

    // His awards, oldest first
    const AWARDS = [
        {
            year: "1983",
            title: "Most Distinguished Alumnus in the field of business",
            from: "Don Bosco Academy",
        },
        {
            year: "1991",
            title: "Most Outstanding Kapampangan in the field of business with civic consciousness",
            from: "Province of Pampanga",
        },
        {
            year: "2005",
            title: "Presidential Medal of Merit",
            from: "Former President Gloria Macapagal Arroyo",
        },
        {
            year: "2007",
            title: "Outstanding Alumnus, on the academy's 50th anniversary",
            from: "Don Bosco Academy",
        },
        {
            year: "2007",
            title: "Blessed Philip Rinaldi Servant Leader",
            from: "Salesians of Don Bosco Philippines",
        },
        {
            year: "2008",
            title: "Most Distinguished Bedan",
            from: "San Beda College Alumni Association",
        },
        {
            year: "2008",
            title: "Outstanding Achievement Award",
            from: "Clark Development Corporation",
        },
        {
            year: "2009",
            title: "Outstanding Fernandino in the field of business and entrepreneurship",
            from: "City of San Fernando",
        },
        {
            year: "2016",
            title: "Distinguished Bosconian Alumnus",
            from: "Don Bosco Academy",
        },
    ];

    // His story, in order
    const STORY = [
        {
            label: "The beginning",
            title: "A man with an extraordinary mission",
            text: "Coming from humble beginnings, Laus was driven by a personal dream to transform his life not only by achieving success but by building a legacy. Armed with a vision, imbued with the value of hard work, challenged by innovation and change itself, and inspired by love for his hometown, now the City of San Fernando, Laus set out to cut a distinct path for himself.",
        },
        {
            label: "1978",
            title: "Three cars on display",
            text: "Already on an upward career trajectory in the banking industry, Laus left his corporate job as a bank manager to pursue his dream and mission. He put up a small and obscure automotive dealership, with three cars on display and a meager capital, in the backwater capital town and in a business environment threatened by both economic and political uncertainties at the time. That mother company has since grown into a highly diversified conglomerate now known as the Laus Group of Companies, the largest multi-brand dealership network in the Philippines, with over 45 dealerships from Metro Manila, Central and Northern Luzon.",
        },
        {
            label: "1991",
            title: "A baptism of fire",
            text: "When Mount Pinatubo erupted and lahar threatened to bury San Fernando and other parts of Pampanga, Laus used his leadership skill, organizational savvy and unmoved conviction to put together a disaster management group called the Save San Fernando Movement. It brought together government leaders, businessmen and other members of civil society to compel the government to build a protective dike that stopped the lahar in its tracks and saved the capital town from total disaster.",
        },
        {
            label: "Today",
            title: "A catalyst for countryside progress",
            text: "The LausGroup continues to transform the landscape of countryside business and expand its reach and influence across Northern and Central Luzon, holding as faithfully as ever to its role as a catalyst for countryside progress.",
        },
    ];

    return (
        <>
            <Header />
            <main className="w-full max-w-full font-['Barlow'] text-neutral-900">
                <HeroBanner slides={HERO_SLIDES} />

                {/* Title and introduction */}
                <section className="container mx-auto px-4 pb-14 pt-10 md:pb-20 md:pt-14">
                    <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
                        About us
                    </p>
                    <h1 className="mt-2 font-['Barlow_Condensed'] text-4xl font-bold uppercase leading-tight md:text-5xl">
                        About the Founder
                    </h1>
                    <p className="mt-8 max-w-4xl text-xl leading-relaxed text-neutral-800 lg:text-2xl">
                        Liberato “Levy” P. Laus was probably one of the most
                        accomplished and most awarded Filipino businessmen of
                        his generation, and undoubtedly the most familiar
                        champion of countryside development with a visionary
                        zeal.
                    </p>
                </section>

                {/* His story */}
                <section className="bg-neutral-100 py-12 lg:py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="font-['Barlow_Condensed'] text-4xl font-bold uppercase lg:text-5xl">
                            His Story
                        </h2>

                        <ol className="mt-10 space-y-10 border-l-2 border-neutral-300 pl-8 lg:ml-4">
                            {STORY.map((item) => (
                                <li key={item.label} className="relative">
                                    {/* Dot on the line */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute -left-[2.45rem] top-1.5 h-4 w-4 rounded-full border-4 border-neutral-100 bg-red-600"
                                    />
                                    <p className="text-sm font-bold uppercase tracking-widest text-red-600">
                                        {item.label}
                                    </p>
                                    <h3 className="mt-1 font-['Barlow_Condensed'] text-2xl font-bold uppercase lg:text-3xl">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 max-w-3xl leading-relaxed text-neutral-700 lg:text-lg">
                                        {item.text}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* Awards */}
                <section className="bg-neutral-900 py-12 text-white lg:py-20">
                    <div className="container mx-auto px-4">
                        <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
                            Recognition
                        </p>
                        <h2 className="mt-2 font-['Barlow_Condensed'] text-4xl font-bold uppercase lg:text-5xl">
                            Prestigious Awards
                        </h2>

                        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {AWARDS.map((award) => (
                                <li
                                    key={award.title}
                                    className="border-t-4 border-red-600 bg-white/5 p-6"
                                >
                                    <p className="font-['Barlow_Condensed'] text-3xl font-bold text-red-500">
                                        {award.year}
                                    </p>
                                    <h3 className="mt-2 text-lg font-semibold leading-snug">
                                        {award.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-neutral-400">
                                        {award.from}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
