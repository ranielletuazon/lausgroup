import Header from "../components/Header";
import Footer from "../components/Footer";

import mv1 from "../assets/images/mv1.jpg";
import mv2 from "../assets/images/mv2.jpg";
import mv3 from "../assets/images/mv3.jpg";
const missionVisionImage = mv1;
const coreValuesImage = mv2;
const ethicsStatementImage = mv3;

// Shown in this order: left to right on large screens, top to bottom on smaller ones.
const panels = [
    {
        id: "mission-vision",
        name: "Mission and vision",
        image: missionVisionImage,
        alt: "LausGroup mission and vision: God willing, we shall transform the LausGroup from a good to a great company",
    },
    {
        id: "core-values",
        name: "Core values",
        image: coreValuesImage,
        alt: "LausGroup core values: customer satisfaction, honesty and integrity, hardwork and productivity, efficiency, and social responsibility",
    },
    {
        id: "ethics-statement",
        name: "Ethics statement",
        image: ethicsStatementImage,
        alt: "LausGroup ethics statement: Live up, Abide, Uphold, Seek, Give, Reject, Observe, Uplift and Pursue",
    },
];

export default function MissionVision() {
    return (
        <>
            <Header />
            <main className="w-full max-w-full font-['Barlow'] text-neutral-900">
                {/* Page header */}
                <section className="relative overflow-hidden border-b-4 border-red-600 bg-neutral-950 bg-[linear-gradient(115deg,transparent_62%,rgba(220,38,38,0.2)_62%,rgba(220,38,38,0.2)_70%,transparent_70%)] text-white">
                    <div className="container mx-auto px-4 pb-14 pt-10 md:pb-20 md:pt-14">
                        <nav aria-label="Breadcrumb">
                            <ol className="flex flex-wrap items-center gap-2 text-sm text-neutral-400">
                                <li>
                                    <a
                                        href="/"
                                        className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li>
                                    <a
                                        href="/about-us"
                                        className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                    >
                                        About us
                                    </a>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li aria-current="page" className="text-white">
                                    Mission &amp; Vision
                                </li>
                            </ol>
                        </nav>

                        <h1 className="mt-8 font-['Barlow_Condensed'] text-5xl font-bold leading-none md:text-7xl">
                            Mission &amp; Vision
                        </h1>
                    </div>
                </section>

                {/* The three images (each has its own title) */}
                <section
                    aria-label="Mission and vision, core values and ethics statement"
                    className="bg-neutral-50 py-14 md:py-20"
                >
                    <ul className="container mx-auto grid gap-8 px-4 lg:grid-cols-3">
                        {panels.map((panel) => (
                            <li key={panel.id}>
                                {panel.image ? (
                                    <a
                                        href={panel.image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Open the ${panel.name.toLowerCase()} image in full size`}
                                        className="block overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-neutral-200 transition-shadow duration-300 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 motion-reduce:transition-none"
                                    >
                                        <img
                                            src={panel.image}
                                            alt={panel.alt}
                                            loading="lazy"
                                            decoding="async"
                                            className="block h-auto w-full"
                                        />
                                    </a>
                                ) : (
                                    <div className="grid aspect-[1/2] place-items-center rounded-md border-2 border-dashed border-neutral-300 bg-white p-6 text-center text-neutral-500">
                                        {panel.name} image goes here. Import it
                                        at the top of this file.
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            <Footer />
        </>
    );
}
