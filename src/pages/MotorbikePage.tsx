import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotFound from "./NotFound";
import { motorbikes } from "../assets/data";

export default function MotorbikePage() {
    // The department tab that is open (0 = the first one, usually Sales)
    const [activeDepartment, setActiveDepartment] = useState(0);

    // The path in the address bar: localhost/aprilia-pampanga -> "/aprilia-pampanga"
    const { pathname } = useLocation();

    // The dealership whose href matches this page
    const dealership = motorbikes.find((item) => item.href === pathname);

    // Unknown path: show the 404 page
    if (!dealership) return <NotFound />;

    // This dealership's page content, from motorbikes.json (empty when not written yet)
    const departments = dealership.departments ?? [];
    const formUrl = dealership.formUrl ?? "";
    const mapEmbed = dealership.mapEmbed ?? "";
    const bannerUrl = dealership.bannerUrl;

    // The department shown in the card (falls back to the first one)
    const department = departments[activeDepartment] ?? departments[0];

    return (
        <>
            <Header />
            <main className="w-full max-w-full bg-neutral-100 text-neutral-900">
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
                                        href="/motorbikes"
                                        className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                    >
                                        Motorbikes
                                    </a>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li aria-current="page" className="text-white">
                                    {dealership.brandName}
                                </li>
                            </ol>
                        </nav>

                        <p className="mt-6 inline-block self-start rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                            Motorbikes
                        </p>
                        <h1 className="mt-4 text-5xl font-bold uppercase leading-none drop-shadow md:text-7xl">
                            {dealership.brandName}
                        </h1>
                    </div>
                </section>

                <div className="container mx-auto grid gap-8 px-4 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-12">
                    {/* ===== Sidebar: logo and department details (above the form on phones) ===== */}
                    <aside className="space-y-6 lg:sticky lg:top-20 lg:order-2 lg:self-start">
                        {/* Logo */}
                        {/* <div className="grid aspect-[4/3] place-items-center rounded-md bg-white p-8 shadow-sm ring-1 ring-neutral-200">
                            {dealership.logo ? (
                                <img
                                    src={dealership.logo}
                                    alt={`${dealership.brandName} logo`}
                                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                                />
                            ) : (
                                <span className="text-center text-3xl font-bold">
                                    {dealership.brandName}
                                </span>
                            )}
                        </div> */}

                        {/* Sales / Service / Parts details */}
                        {department && (
                            <div className="overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-neutral-200">
                                {/* Tabs, only when there's more than one department */}
                                {departments.length > 1 ? (
                                    <div
                                        role="tablist"
                                        aria-label="Departments"
                                        className="flex bg-neutral-900"
                                    >
                                        {departments.map((item, index) => {
                                            const selected =
                                                item.name === department.name;
                                            return (
                                                <button
                                                    key={item.name}
                                                    type="button"
                                                    role="tab"
                                                    aria-selected={selected}
                                                    onClick={() =>
                                                        setActiveDepartment(
                                                            index,
                                                        )
                                                    }
                                                    className={`flex-1 cursor-pointer px-4 py-4 text-sm font-bold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red-500 ${
                                                        selected
                                                            ? "bg-white text-red-600"
                                                            : "text-neutral-300 hover:text-white"
                                                    }`}
                                                >
                                                    {item.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="bg-neutral-900 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white">
                                        {/* {department.name} */}
                                        Contact Information
                                    </p>
                                )}

                                <div
                                    role={
                                        departments.length > 1
                                            ? "tabpanel"
                                            : undefined
                                    }
                                    className="divide-y divide-neutral-200"
                                >
                                    {/* Address */}
                                    {department.address && (
                                        <div className="flex gap-4 p-6">
                                            <MapPin
                                                className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                                                aria-hidden="true"
                                            />
                                            <div>
                                                <h2 className="text-xl font-bold uppercase">
                                                    Address
                                                </h2>
                                                <address className="mt-1 not-italic leading-relaxed text-neutral-700 text-sm font-regular">
                                                    {department.address}
                                                </address>
                                                <a
                                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(department.address)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 underline underline-offset-4 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
                                                >
                                                    Get directions
                                                    <ExternalLink
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {/* Phone numbers: tappable on phones */}
                                    {department.phones.length > 0 && (
                                        <div className="flex gap-4 p-6 w-full max-w-full">
                                            <Phone
                                                className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                                                aria-hidden="true"
                                            />
                                            <div>
                                                <h2 className="text-xl font-bold uppercase">
                                                    {department.name}
                                                </h2>
                                                <ul className="mt-1">
                                                    {department.phones.map(
                                                        (phone) => (
                                                            <li key={phone}>
                                                                <a
                                                                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                                                                    className="font-regular text-sm hover:text-red-600"
                                                                >
                                                                    {phone}
                                                                </a>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* Opening hours */}
                                    {department.hours.length > 0 && (
                                        <div className="flex gap-4 p-6">
                                            <Clock
                                                className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                                                aria-hidden="true"
                                            />
                                            <div>
                                                <h2 className="text-xl font-bold uppercase">
                                                    {/* {department.name} hours */}
                                                    Operating Hours
                                                </h2>
                                                <ul className="mt-1 text-neutral-700">
                                                    {department.hours.map(
                                                        (line) => (
                                                            <li
                                                                key={line}
                                                                className="text-sm font-regular"
                                                            >
                                                                {line}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </aside>

                    {/* ===== Contact form (iframe from the CRM) ===== */}
                    <section aria-label="Contact form" className="lg:order-1">
                        <div className="overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-neutral-200">
                            {formUrl ? (
                                <div className="relative">
                                    {/* Shown behind the iframe while it loads */}
                                    <p className="absolute inset-x-0 top-10 text-center text-neutral-400">
                                        Loading the contact form…
                                    </p>

                                    {/* The form is on another website, so the iframe has a fixed height: taller on phones, where the fields stack */}
                                    <iframe
                                        src={formUrl}
                                        title={`${dealership.brandName} contact form`}
                                        loading="lazy"
                                        className="relative block h-[2050px] w-full border-0 md:h-[1500px]"
                                    />
                                </div>
                            ) : (
                                <div className="p-6 text-lg text-neutral-700 md:p-10">
                                    Send us your inquiry on our{" "}
                                    <a
                                        href="/contact-us"
                                        className="font-semibold text-red-600 underline underline-offset-4 hover:text-red-700"
                                    >
                                        Contact us
                                    </a>{" "}
                                    page.
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* ===== Map ===== */}
                {mapEmbed && (
                    <section className="container mx-auto px-4 pb-10 md:pb-14">
                        <h2 className="text-3xl font-bold uppercase md:text-4xl">
                            Visit our showroom
                        </h2>
                        <div className="mt-6 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-neutral-200">
                            <iframe
                                src={mapEmbed}
                                title={`Map of ${dealership.brandName}`}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                                className="block h-[360px] w-full border-0 md:h-[480px]"
                            />
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
