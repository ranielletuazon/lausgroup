import { useLocation } from "react-router-dom";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotFound from "./NotFound";
import { foodGroup } from "../assets/data";

export default function FoodGroupPage() {
    // The path in the address bar: localhost/max-restaurant -> "/max-restaurant"
    const { pathname } = useLocation();

    // The restaurant whose href matches this page
    const restaurant = foodGroup.find((item) => item.href === pathname);

    // Unknown slug: show the 404 page
    if (!restaurant) return <NotFound />;

    // This restaurant's page content, from foodgroups.json (empty when not written yet)
    const branches = restaurant.branches ?? [];
    const description = restaurant.description ?? [];
    const mapEmbed = restaurant.mapEmbed ?? "";
    const bannerUrl = restaurant.bannerUrl;

    // The other restaurants, for the strip at the bottom
    const OTHER_RESTAURANTS = foodGroup.filter(
        (item) => item.href !== restaurant.href && item.logo,
    );

    return (
        <>
            <Header />
            <main className="w-full max-w-full bg-neutral-100 font-['Barlow'] text-neutral-900">
                {/* ===== Banner with the name on top (dark band when there's no banner) ===== */}
                <section className="relative overflow-hidden border-b-4 border-red-600 bg-neutral-950 text-white">
                    {bannerUrl && (
                        <>
                            <img
                                src={bannerUrl}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* Darkens the photo so the text stays readable */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10"
                            />
                        </>
                    )}

                    <div
                        className={`container relative mx-auto flex flex-col justify-end px-4 pb-10 pt-10 md:pb-14 ${
                            bannerUrl ? "min-h-80 md:min-h-[28rem]" : ""
                        }`}
                    >
                        <nav aria-label="Breadcrumb">
                            <ol className="flex flex-wrap items-center gap-2 text-sm text-neutral-300">
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
                                        href="/affiliates"
                                        className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                    >
                                        Food group
                                    </a>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li aria-current="page" className="text-white">
                                    {restaurant.brandName}
                                </li>
                            </ol>
                        </nav>

                        <p className="mt-6 inline-block self-start rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                            {restaurant.category}
                        </p>
                        <h1 className="mt-4 font-['Barlow_Condensed'] text-5xl font-bold uppercase leading-none drop-shadow md:text-7xl">
                            {restaurant.brandName}
                        </h1>
                        {branches.length > 0 && (
                            <p className="mt-3 text-lg text-neutral-200">
                                {branches.length}{" "}
                                {branches.length === 1 ? "branch" : "branches"}{" "}
                                in Central Luzon
                            </p>
                        )}
                    </div>
                </section>

                {/* ===== Logo and description ===== */}
                <section className="container mx-auto px-4 py-10 md:py-14">
                    <div className="grid items-center gap-8 rounded-md bg-white p-6 shadow-sm ring-1 ring-neutral-200 md:grid-cols-[16rem_1fr] md:p-10">
                        <div className="mx-auto grid aspect-[4/3] w-full max-w-xs place-items-center">
                            {restaurant.logo ? (
                                <img
                                    src={restaurant.logo}
                                    alt={`${restaurant.brandName} logo`}
                                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                                />
                            ) : (
                                <span className="text-center font-['Barlow_Condensed'] text-3xl font-bold">
                                    {restaurant.brandName}
                                </span>
                            )}
                        </div>

                        <div className="md:border-l md:border-neutral-200 md:pl-10">
                            <h2 className="font-['Barlow_Condensed'] text-3xl font-bold uppercase md:text-4xl">
                                About {restaurant.brandName}
                            </h2>

                            {description.length > 0 ? (
                                <div className="mt-4 max-w-3xl space-y-4 text-lg leading-relaxed text-neutral-700">
                                    {description.map((line) =>
                                        line.startsWith("## ") ? (
                                            // Small heading
                                            <h3
                                                key={line}
                                                className="pt-2 font-['Barlow_Condensed'] text-2xl font-bold text-neutral-900"
                                            >
                                                {line.slice(3)}
                                            </h3>
                                        ) : line.startsWith("- ") ? (
                                            // List item with a red marker
                                            <p
                                                key={line}
                                                className="!mt-2 flex items-start gap-3"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="mt-3 h-1.5 w-1.5 shrink-0 bg-red-600"
                                                />
                                                {line.slice(2)}
                                            </p>
                                        ) : (
                                            // Paragraph
                                            <p key={line}>{line}</p>
                                        ),
                                    )}
                                </div>
                            ) : (
                                <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                                    For more inquiries, contact your nearest
                                    branch below.
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* ===== Branches ===== */}
                <section className="container mx-auto px-4 pb-10 md:pb-14">
                    <h2 className="flex items-center gap-3 font-['Barlow_Condensed'] text-3xl font-bold uppercase md:text-4xl">
                        Our branches
                    </h2>

                    {branches.length > 0 ? (
                        <ul className="mt-6 grid gap-4 md:grid-cols-2">
                            {branches.map((branch) => (
                                <li
                                    key={branch.name}
                                    className="flex flex-col rounded-md border-l-4 border-red-600 bg-white p-6 shadow-sm ring-1 ring-neutral-200"
                                >
                                    <h3 className="font-['Barlow_Condensed'] text-2xl font-bold leading-tight">
                                        {branch.name}
                                    </h3>

                                    <p className="mt-3 flex items-start gap-2 leading-relaxed text-neutral-700">
                                        <MapPin
                                            className="mt-1 h-4 w-4 shrink-0 text-red-600"
                                            aria-hidden="true"
                                        />
                                        <span>{branch.address}</span>
                                    </p>

                                    {branch.phone && (
                                        <p className="mt-2 flex items-center gap-2">
                                            <Phone
                                                className="h-4 w-4 shrink-0 text-red-600"
                                                aria-hidden="true"
                                            />
                                            {/* Tappable on phones */}
                                            <a
                                                href={`tel:${branch.phone.replace(/[^\d+]/g, "")}`}
                                                className="font-semibold tabular-nums text-neutral-800 transition-colors hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                            >
                                                {branch.phone}
                                            </a>
                                        </p>
                                    )}

                                    {branch.hours && (
                                        <p className="mt-2 flex items-center gap-2">
                                            <Clock
                                                className="h-4 w-4 shrink-0 text-red-600"
                                                aria-hidden="true"
                                            />
                                            {branch.hours}
                                        </p>
                                    )}

                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${branch.name}, ${branch.address}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto inline-flex items-center gap-1.5 self-start pt-4 text-sm font-semibold text-red-600 underline underline-offset-4 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
                                    >
                                        Get Directions
                                        <ExternalLink
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="mt-6 rounded-md bg-white p-6 text-lg text-neutral-700 ring-1 ring-neutral-200">
                            Branch details are coming soon.{" "}
                            <a
                                href="/contact-us"
                                className="font-semibold text-red-600 underline underline-offset-4 hover:text-red-700"
                            >
                                Contact us
                            </a>{" "}
                            for more information.
                        </div>
                    )}
                </section>

                {/* ===== Map of all branches ===== */}
                {mapEmbed && (
                    <section className="container mx-auto px-4 pb-10 md:pb-14">
                        <h2 className="font-['Barlow_Condensed'] text-3xl font-bold uppercase md:text-4xl">
                            Find a branch near you
                        </h2>
                        <div className="mt-6 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-neutral-200">
                            <iframe
                                src={mapEmbed}
                                title={`Map of ${restaurant.brandName} branches`}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                                className="block h-[360px] w-full border-0 md:h-[480px]"
                            />
                        </div>
                    </section>
                )}

                {/* ===== Other restaurants ===== */}
                {OTHER_RESTAURANTS.length > 0 && (
                    <section className="border-t border-neutral-200 bg-white py-12 md:py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-center font-['Barlow_Condensed'] text-3xl font-bold uppercase md:text-4xl">
                                More from the food group
                            </h2>

                            <ul className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">
                                {OTHER_RESTAURANTS.map((item) => (
                                    <li
                                        key={item.href}
                                        className="w-[calc(50%_-_0.375rem)] sm:w-40"
                                    >
                                        <a
                                            href={item.href}
                                            aria-label={item.brandName}
                                            className="grid aspect-[4/3] place-items-center rounded-md bg-neutral-50 p-4 ring-1 ring-neutral-200 transition-shadow hover:shadow-lg hover:ring-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        >
                                            <img
                                                src={item.logo}
                                                alt=""
                                                loading="lazy"
                                                className="max-h-full max-w-full object-contain mix-blend-multiply"
                                            />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
