import { useParams } from "react-router-dom";
import { ExternalLink, MapPin, Phone } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotFound from "./NotFound";
import { affiliates, mediaGroup } from "../assets/data";

export default function AffiliatePage() {
    // The slug from the address bar: localhost/laus-auto-finance -> "laus-auto-finance"
    const { slug } = useParams();

    // Only these categories have their own pages for now. Add more here later.
    const CATEGORIES_WITH_PAGES = [
        "Auto Industry",
        "Hotel",
        "Real Estate",
        "Media",
    ];

    // Every brand that uses this page: affiliates and the media group
    const BRANDS = [...affiliates, ...mediaGroup];

    // The brand whose href matches this page. Brands with a full website href never match.
    const affiliate = BRANDS.find(
        (item) =>
            item.href === `/${slug}` &&
            CATEGORIES_WITH_PAGES.includes(item.category ?? ""),
    );

    // Unknown slug: show the 404 page
    if (!affiliate) return <NotFound />;

    // This affiliate's page content, from affiliates.json (empty when not written yet)
    const contacts = affiliate.contacts ?? [];
    const website = affiliate.website ?? "";
    const description = affiliate.description ?? [];
    const bannerUrl = affiliate.bannerUrl;
    const mapEmbed = affiliate.mapEmbed ?? "";

    // All addresses: the "addresses" list, or the single "address" when there's only one
    const ADDRESSES =
        affiliate.addresses ??
        (affiliate.address ? [{ label: "", value: affiliate.address }] : []);

    // The other affiliates in the same category, for the strip at the bottom
    const OTHER_AFFILIATES = BRANDS.filter(
        (item) =>
            item.category === affiliate.category &&
            item.href !== affiliate.href &&
            item.logo,
    );

    return (
        <>
            <Header />
            <main className="w-full max-w-full bg-neutral-100 font-['Barlow'] text-neutral-900">
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
                                        href="/affiliates"
                                        className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                    >
                                        Affiliates
                                    </a>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li aria-current="page" className="text-white">
                                    {affiliate.brandName}
                                </li>
                            </ol>
                        </nav>

                        <p className="mt-8 inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                            {affiliate.category}
                        </p>
                        <h1 className="mt-4 font-['Barlow_Condensed'] text-5xl font-bold uppercase leading-none md:text-7xl">
                            {affiliate.brandName}
                        </h1>
                    </div>
                </section>

                <div className="container mx-auto grid gap-8 px-4 py-10 md:py-14 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-12">
                    {/* ===== Sidebar: logo, address, contacts (under the article on phones) ===== */}
                    <aside className="order-2 space-y-6 lg:sticky lg:top-20 lg:order-1 lg:self-start">
                        {/* Logo */}
                        <div className="grid aspect-[4/3] place-items-center rounded-md bg-white p-8 shadow-sm ring-1 ring-neutral-200">
                            {affiliate.logo ? (
                                <img
                                    src={affiliate.logo}
                                    alt={`${affiliate.brandName} logo`}
                                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                                />
                            ) : (
                                <span className="text-center font-['Barlow_Condensed'] text-3xl font-bold">
                                    {affiliate.brandName}
                                </span>
                            )}
                        </div>

                        {(ADDRESSES.length > 0 ||
                            contacts.length > 0 ||
                            website) && (
                            <div className="divide-y divide-neutral-200 rounded-md bg-white shadow-sm ring-1 ring-neutral-200">
                                {/* Address */}
                                {ADDRESSES.length > 0 && (
                                    <div className="p-6">
                                        <h2 className="flex items-center gap-2 font-['Barlow_Condensed'] text-xl font-bold uppercase">
                                            <MapPin
                                                className="h-5 w-5 text-red-600"
                                                aria-hidden="true"
                                            />
                                            {ADDRESSES.length > 1
                                                ? "Addresses"
                                                : "Address"}
                                        </h2>

                                        {/* Each address with its own label and directions link */}
                                        <ul className="mt-3 space-y-5">
                                            {ADDRESSES.map((item) => (
                                                <li key={item.value}>
                                                    {item.label && (
                                                        <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                                                            {item.label}
                                                        </p>
                                                    )}
                                                    <address className="not-italic leading-relaxed text-neutral-700">
                                                        {item.value}
                                                    </address>
                                                    <a
                                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.value)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 underline underline-offset-4 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
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
                                    </div>
                                )}

                                {/* Contacts: every number is tappable on phones */}
                                {contacts.length > 0 && (
                                    <div className="p-6">
                                        <h2 className="flex items-center gap-2 font-['Barlow_Condensed'] text-xl font-bold uppercase">
                                            <Phone
                                                className="h-5 w-5 text-red-600"
                                                aria-hidden="true"
                                            />
                                            Contact
                                        </h2>
                                        <dl className="mt-3 space-y-4">
                                            {contacts.map((contact) => (
                                                <div key={contact.label}>
                                                    <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                                                        {contact.label}
                                                    </dt>
                                                    {contact.values.map(
                                                        (value) => (
                                                            <dd key={value}>
                                                                <a
                                                                    href={`tel:${value.replace(/[^\d+]/g, "")}`}
                                                                    className="font-semibold tabular-nums text-neutral-800 transition-colors hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                                >
                                                                    {value}
                                                                </a>
                                                            </dd>
                                                        ),
                                                    )}
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                )}

                                {/* Website, if the affiliate has one */}
                                {website && (
                                    <div className="p-6">
                                        <a
                                            href={website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center gap-2 rounded-sm bg-red-600 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        >
                                            Visit website
                                            <ExternalLink
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    </aside>

                    {/* ===== Article: banner and description ===== */}
                    <article className="order-1 lg:order-2">
                        {bannerUrl && (
                            <img
                                src={bannerUrl}
                                alt={`${affiliate.brandName}`}
                                className="block w-full rounded-md bg-neutral-200 object-cover shadow-sm ring-1 ring-neutral-200"
                            />
                        )}

                        <div
                            className={`rounded-md bg-white p-6 shadow-sm ring-1 ring-neutral-200 md:p-10 ${
                                bannerUrl ? "mt-6" : ""
                            }`}
                        >
                            <h2 className="font-['Barlow_Condensed'] text-3xl font-bold uppercase md:text-4xl md:text-center">
                                About {affiliate.brandName}
                            </h2>

                            {description.length > 0 ? (
                                <div className="mt-6 max-w-full space-y-5 text-lg leading-relaxed text-neutral-700 text-justify">
                                    {description.map((line) =>
                                        line.startsWith("## ") ? (
                                            // Small heading
                                            <h3
                                                key={line}
                                                className="pt-4 font-['Barlow_Condensed'] text-2xl font-bold text-neutral-900"
                                            >
                                                {line.slice(3)}
                                            </h3>
                                        ) : line.startsWith("- ") ? (
                                            // List item with a red marker
                                            <p
                                                key={line}
                                                className="flex items-start gap-3 !mt-2"
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
                                // No page content written yet
                                <div className="mt-6 text-lg leading-relaxed text-neutral-700">
                                    <p>
                                        For more information about{" "}
                                        {affiliate.brandName} please visit the
                                        site below.
                                    </p>
                                    <a
                                        href="/contact"
                                        className="mt-4 inline-block font-semibold text-red-600 underline underline-offset-4 hover:text-red-700"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Map, if the affiliate has one */}
                        {mapEmbed && (
                            <div className="mt-6 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-neutral-200">
                                <iframe
                                    src={mapEmbed}
                                    title={`Map of ${affiliate.brandName}`}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    className="block h-[360px] w-full border-0 md:h-[480px]"
                                />
                            </div>
                        )}
                    </article>
                </div>

                {/* ===== Other affiliates in the same category ===== */}
                {OTHER_AFFILIATES.length > 0 && (
                    <section className="border-t border-neutral-200 bg-white py-12 md:py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-center font-['Barlow_Condensed'] text-3xl font-bold uppercase md:text-4xl">
                                More from {affiliate.category}
                            </h2>

                            <ul className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">
                                {OTHER_AFFILIATES.map((item) => {
                                    const external =
                                        item.href.startsWith("http");
                                    return (
                                        <li
                                            key={item.href}
                                            className="w-[calc(50%_-_0.375rem)] sm:w-40"
                                        >
                                            <a
                                                href={item.href}
                                                target={
                                                    external
                                                        ? "_blank"
                                                        : undefined
                                                }
                                                rel={
                                                    external
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
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
                                    );
                                })}
                            </ul>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
