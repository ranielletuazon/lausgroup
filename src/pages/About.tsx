import { ArrowRight, Building2, Target, UserRound } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
    // The About us pages, shown as cards
    const PAGES = [
        {
            label: "Company Profile",
            href: "/about-us/company-profile",
            description: "Our history, businesses and the people behind them.",
            icon: Building2,
        },
        {
            label: "Mission and Vision",
            href: "/about-us/mission-vision",
            description: "What drives the group and the values we work by.",
            icon: Target,
        },
        {
            label: "About the Founder",
            href: "/about-us/about-the-founder",
            description: "The story of Levy P. Laus and how it all began.",
            icon: UserRound,
        },
    ];

    return (
        <>
            <Header />
            <main className="w-full max-w-full bg-neutral-100 text-neutral-900">
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
                                <li aria-current="page" className="text-white">
                                    About us
                                </li>
                            </ol>
                        </nav>

                        <h1 className="mt-8 text-4xl font-bold uppercase leading-none md:text-6xl">
                            About us
                        </h1>
                    </div>
                </section>

                {/* The pages */}
                <section className="container mx-auto px-4 py-10 md:py-14">
                    <ul className="grid gap-6 md:grid-cols-3">
                        {PAGES.map((page) => (
                            <li key={page.href}>
                                <a
                                    href={page.href}
                                    className="group flex h-full flex-col rounded-md bg-white p-6 shadow-sm ring-1 ring-neutral-200 transition-shadow hover:shadow-xl hover:ring-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 md:p-8"
                                >
                                    <span className="grid h-12 w-12 place-items-center rounded-full bg-red-600 text-white">
                                        <page.icon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    <h2 className="mt-5 text-2xl font-bold transition-colors group-hover:text-red-600">
                                        {page.label}
                                    </h2>
                                    <p className="mt-2 flex-1 leading-relaxed text-neutral-600">
                                        {page.description}
                                    </p>
                                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-red-600">
                                        View page
                                        <ArrowRight
                                            className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            <Footer />
        </>
    );
}
