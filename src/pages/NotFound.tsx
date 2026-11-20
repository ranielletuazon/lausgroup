import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound() {
    // Pages people often look for
    const LINKS = [
        { label: "Automotive", href: "/automotive" },
        { label: "Motorbikes", href: "/motorbikes" },
        { label: "Affiliates", href: "/affiliates" },
        { label: "News and Events", href: "/news-and-events" },
    ];

    return (
        <>
            <Header />
            <main className="w-full max-w-full bg-neutral-100 font-['Barlow'] text-neutral-900">
                <section className="container mx-auto flex flex-col items-center px-4 py-20 text-center lg:py-32">
                    <p className="font-['Barlow_Condensed'] text-8xl font-bold leading-none text-red-600 lg:text-9xl">
                        404
                    </p>
                    <h1 className="mt-4 font-['Barlow_Condensed'] text-4xl font-bold uppercase md:text-5xl">
                        Page Not Found
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
                        Sorry, the page you are looking for may have been moved
                        or no longer exists.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <a
                            href="/"
                            className="inline-block rounded-sm bg-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                        >
                            Back to Home
                        </a>
                        <a
                            href="/contact"
                            className="inline-block rounded-sm border-2 border-neutral-900 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                        >
                            Contact Us
                        </a>
                    </div>

                    {/* Other pages */}
                    <div className="mt-12 border-t border-neutral-300 pt-8">
                        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                            {LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="font-semibold text-neutral-800 underline-offset-4 transition-colors hover:text-red-600 hover:underline"
                                    >
                                        {link.label}
                                    </a>
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
