import Header from "../components/Header";
import Footer from "../components/Footer";
import { motorbikes } from "../assets/data";

export default function Motorbikes() {
    // The motorbike dealerships, sorted A to Z (a copy, so the original order stays the same elsewhere)
    const DEALERSHIPS = [...motorbikes].sort((a, b) =>
        a.brandName.localeCompare(b.brandName),
    );

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
                                    Motorbikes
                                </li>
                            </ol>
                        </nav>

                        <h1 className="mt-8 text-4xl font-bold uppercase leading-none md:text-6xl">
                            Motorbikes
                        </h1>
                    </div>
                </section>

                {/* The dealership tiles */}
                <section className="container mx-auto px-4 py-10 md:py-14">
                    {/* Tiles wrap onto new rows, and a short last row stays centered */}
                    <ul className="flex flex-wrap justify-center gap-3">
                        {DEALERSHIPS.map((dealership) => (
                            <li
                                key={dealership.href}
                                className="w-[calc(50%_-_0.375rem)] sm:w-[calc(33.333%_-_0.5rem)] md:w-[calc(25%_-_0.5625rem)] lg:w-[calc(16.666%_-_0.625rem)]"
                            >
                                <a
                                    href={dealership.href}
                                    className="group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-neutral-200 transition-shadow hover:shadow-lg hover:ring-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    {/* Logo (or the name when there's no logo) */}
                                    <span className="relative block aspect-[4/3]">
                                        {dealership.logo ? (
                                            <img
                                                src={dealership.logo}
                                                alt=""
                                                loading="lazy"
                                                className="absolute inset-0 h-full w-full object-contain p-4 mix-blend-multiply"
                                            />
                                        ) : (
                                            <span className="absolute inset-0 grid place-items-center p-4 text-center text-lg font-bold text-neutral-700">
                                                {dealership.brandName}
                                            </span>
                                        )}
                                    </span>

                                    {/* Name under the logo */}
                                    <span className="mt-auto border-t border-neutral-200 px-3 py-2.5 text-center text-sm font-semibold text-neutral-700 transition-colors group-hover:bg-red-600 group-hover:text-white">
                                        {dealership.brandName}
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
