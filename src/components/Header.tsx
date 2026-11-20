import { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin, Menu, Search, X } from "lucide-react";

import logo from "../assets/images/logos/lausgroupfull-logo.png";
import {
    automotiveBrands,
    trucksBuses,
    motorbikes,
    affiliates,
    foodGroup,
    mediaGroup,
} from "../assets/data";

// One link in a menu
type Link = { label: string; href: string };

// A titled list of links (used by Affiliates)
type Group = { heading: string; links: Link[] };

// One item in the main menu.
// An item with "links" or "groups" opens a dropdown.
type NavItem = {
    label: string;
    href: string;
    external?: boolean;
    description?: string; // text on the left of the dropdown
    columns?: string; // "columns-4" for plain links (top to bottom), "grid-cols-3" for groups
    links?: Link[];
    groups?: Group[];
};

export default function Header() {
    // The address shown at the top, and its Google Maps link
    const ADDRESS =
        "Jose Abad Santos Avenue, City of San Fernando, Pampanga, Philippines 2000";
    const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

    // The main menu. Every link is written here with its own href.
    // Brand links come from the data files: each brand needs a "brandName" and an "href".
    const NAV_ITEMS: NavItem[] = [
        { label: "Home", href: "/" },
        {
            label: "About us",
            href: "/about-us/company-profile",
            description: "Learn who we are and what drives the group.",
            columns: "columns-1",
            links: [
                { label: "Company Profile", href: "/about-us/company-profile" },
                {
                    label: "Mission and Vision",
                    href: "/about-us/mission-vision",
                },
                {
                    label: "About the Founder",
                    href: "/about-us/about-the-founder",
                },
            ],
        },
        {
            label: "Automotive",
            href: "/automotive",
            description:
                "Cars, trucks and buses from every brand we carry across our dealerships.",
            columns: "columns-4",
            links: [
                ...automotiveBrands,
                ...trucksBuses,
                ...affiliates.filter((brand) => brand.showInAutomotive),
            ]
                .sort((a, b) => a.brandName.localeCompare(b.brandName))
                .map((brand) => ({
                    label: brand.brandName,
                    href: brand.href,
                })),
        },
        {
            label: "Motorbikes",
            href: "/motorbikes",
            description:
                "Premium and everyday motorbikes from our dealerships.",
            columns: "columns-4",
            links: [...motorbikes]
                .sort((a, b) => a.brandName.localeCompare(b.brandName))
                .map((brand) => ({
                    label: brand.brandName,
                    href: brand.href,
                })),
        },
        {
            label: "Affiliates",
            href: "/affiliates",
            description:
                "Finance, auto care, dining, media and more from the LausGroup family.",
            columns: "grid-cols-3",
            groups: [
                {
                    heading: "Affiliates",
                    links: affiliates
                        .filter((brand) => !brand.showInAutomotive)
                        .map((brand) => ({
                            label: brand.brandName,
                            href: brand.href,
                        })),
                },
                {
                    heading: "Food Group",
                    links: foodGroup.map((brand) => ({
                        label: brand.brandName,
                        href: brand.href,
                    })),
                },
                {
                    heading: "Media Group",
                    links: mediaGroup.map((brand) => ({
                        label: brand.brandName,
                        href: brand.href,
                    })),
                },
            ],
        },
        { label: "News and events", href: "/news-and-events" },
        { label: "Contact us", href: "/contact-us" },
        {
            label: "Careers",
            href: "https://careers.lausgroup.com.ph/",
            external: true,
        },
    ];

    // Social pages (TODO: replace with the real LausGroup pages)
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

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(""); // desktop dropdown that is open
    const [openMobileItem, setOpenMobileItem] = useState(""); // mobile item that is expanded
    const [scrolled, setScrolled] = useState(() => window.scrollY > 8); // page scrolled down?
    const searchInput = useRef<HTMLInputElement>(null);

    // The page we are on, to highlight its menu item
    const path = window.location.pathname;
    const isActive = (item: NavItem) =>
        !item.external &&
        (item.href === "/" ? path === "/" : path.startsWith(item.href));

    const hasDropdown = (item: NavItem) => !!(item.links || item.groups);

    const closeAll = () => {
        setMobileMenuOpen(false);
        setSearchOpen(false);
        setOpenDropdown("");
    };

    // Add a shadow under the header once the page has scrolled
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // The Escape key closes everything
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeAll();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Stop the page from scrolling while the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    // Put the cursor in the search field when it opens
    useEffect(() => {
        if (searchOpen) searchInput.current?.focus();
    }, [searchOpen]);

    return (
        // The whole header sticks to the top.
        // On desktop it moves up by the height of the dark area (2.5rem + 6rem = 8.5rem),
        // so only the gray menu bar stays on screen while scrolling.
        <header
            className={`sticky top-0 z-50 font-['Barlow'] transition-shadow duration-300 xl:-top-[8.5rem] ${
                scrolled ? "shadow-lg shadow-black/20" : ""
            }`}
        >
            {/* ===== Dark area ===== */}
            <div className="bg-neutral-900 text-white">
                <div className="container mx-auto px-4">
                    {/* Address row (desktop only) */}
                    <div className="hidden h-10 items-center justify-end border-b border-white/10 xl:flex">
                        <a
                            href={MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                        >
                            <MapPin
                                className="h-3.5 w-3.5 text-red-500"
                                aria-hidden="true"
                            />
                            {ADDRESS}
                        </a>
                    </div>

                    {/* Logo row: logo on the left, socials (desktop) or buttons (mobile) on the right */}
                    <div className="flex h-16 items-center justify-between gap-4 xl:h-24">
                        <a
                            href="/"
                            aria-label="LausGroup home"
                            onClick={closeAll}
                            className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
                        >
                            <img
                                src={logo}
                                alt="LausGroup - A Passion for Cars & Customer Care"
                                className="h-9 w-auto sm:h-11 xl:h-14"
                            />
                        </a>

                        {/* Socials (desktop only) */}
                        <ul className="hidden items-center gap-3 xl:flex">
                            {SOCIALS.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="grid h-10 w-10 place-items-center rounded-full bg-neutral-800 text-neutral-200 ring-1 ring-white/10 transition-colors hover:bg-red-600 hover:text-white hover:ring-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
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

                        {/* Search and menu buttons (mobile and tablet only) */}
                        <div className="flex items-center gap-1 xl:hidden">
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchOpen(!searchOpen);
                                    setMobileMenuOpen(false);
                                }}
                                aria-label={
                                    searchOpen ? "Close search" : "Open search"
                                }
                                aria-expanded={searchOpen}
                                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-neutral-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                            >
                                {searchOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Search className="h-5 w-5" />
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setMobileMenuOpen(!mobileMenuOpen);
                                    setSearchOpen(false);
                                }}
                                aria-label={
                                    mobileMenuOpen ? "Close menu" : "Open menu"
                                }
                                aria-expanded={mobileMenuOpen}
                                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-neutral-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Gray menu bar (desktop only) ===== */}
            <div className="hidden bg-neutral-100 xl:block">
                <div className="container mx-auto flex h-12 items-stretch justify-between px-4">
                    <nav aria-label="Main">
                        <ul className="flex h-full">
                            {NAV_ITEMS.map((item) => {
                                const active = isActive(item);
                                const open = openDropdown === item.label;

                                return (
                                    <li
                                        key={item.label}
                                        className="flex"
                                        onMouseEnter={() =>
                                            setOpenDropdown(
                                                hasDropdown(item)
                                                    ? item.label
                                                    : "",
                                            )
                                        }
                                        onMouseLeave={() => setOpenDropdown("")}
                                    >
                                        {/* Current page: solid red block. Open dropdown or hover: white tab with red text. */}
                                        <a
                                            href={item.href}
                                            target={
                                                item.external
                                                    ? "_blank"
                                                    : undefined
                                            }
                                            rel={
                                                item.external
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                            aria-current={
                                                active ? "page" : undefined
                                            }
                                            aria-expanded={
                                                hasDropdown(item)
                                                    ? open
                                                    : undefined
                                            }
                                            onFocus={() =>
                                                setOpenDropdown(
                                                    hasDropdown(item)
                                                        ? item.label
                                                        : "",
                                                )
                                            }
                                            className={`flex items-center gap-1 px-5 text-[13px] font-bold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red-600 ${
                                                active
                                                    ? "bg-red-600 text-white"
                                                    : open
                                                      ? "bg-white text-red-600"
                                                      : "text-neutral-900 hover:bg-white hover:text-red-600"
                                            }`}
                                        >
                                            {item.label}
                                            {hasDropdown(item) && (
                                                <ChevronDown
                                                    aria-hidden="true"
                                                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                                        open ? "rotate-180" : ""
                                                    }`}
                                                />
                                            )}
                                        </a>

                                        {/* Dropdown, full width under the menu bar */}
                                        {hasDropdown(item) && (
                                            <div
                                                className={`absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t-4 border-red-600 bg-white text-neutral-900 shadow-2xl shadow-black/20 transition-[opacity,visibility,transform] duration-200 motion-reduce:transition-none ${
                                                    open
                                                        ? "visible translate-y-0 opacity-100"
                                                        : "pointer-events-none invisible -translate-y-1 opacity-0"
                                                }`}
                                            >
                                                <div className="container mx-auto grid grid-cols-[15rem_1fr] gap-12 px-4 py-10">
                                                    {/* Left: title and description */}
                                                    <div>
                                                        <p className="font-['Barlow_Condensed'] text-3xl font-bold uppercase leading-none">
                                                            {item.label}
                                                        </p>
                                                        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                                                            {item.description}
                                                        </p>
                                                        <a
                                                            href={item.href}
                                                            className="mt-5 inline-block text-sm font-semibold text-red-600 underline underline-offset-4 hover:text-red-700"
                                                        >
                                                            Go to {item.label}
                                                        </a>
                                                    </div>

                                                    {/* Right: the links */}
                                                    <div className="border-l border-neutral-200 pl-12">
                                                        {/* A plain list of links */}
                                                        {item.links && (
                                                            <ul
                                                                className={`gap-x-8 ${item.columns}`}
                                                            >
                                                                {item.links.map(
                                                                    (link) => (
                                                                        <li
                                                                            key={
                                                                                link.href
                                                                            }
                                                                            className="break-inside-avoid"
                                                                        >
                                                                            <a
                                                                                href={
                                                                                    link.href
                                                                                }
                                                                                className="block py-1.5 text-[15px] font-semibold text-neutral-700 transition-colors hover:text-red-600"
                                                                            >
                                                                                {
                                                                                    link.label
                                                                                }
                                                                            </a>
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        )}

                                                        {/* Lists of links with a heading, one per column */}
                                                        {item.groups && (
                                                            <div
                                                                className={`grid gap-x-8 ${item.columns}`}
                                                            >
                                                                {item.groups.map(
                                                                    (group) => (
                                                                        <div
                                                                            key={
                                                                                group.heading
                                                                            }
                                                                        >
                                                                            <p className="mb-2 border-b border-neutral-200 pb-2 font-['Barlow_Condensed'] text-xl font-bold uppercase">
                                                                                {
                                                                                    group.heading
                                                                                }
                                                                            </p>
                                                                            <ul>
                                                                                {group.links.map(
                                                                                    (
                                                                                        link,
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                link.href
                                                                                            }
                                                                                        >
                                                                                            <a
                                                                                                href={
                                                                                                    link.href
                                                                                                }
                                                                                                className="block py-1.5 text-[15px] text-neutral-700 transition-colors hover:text-red-600"
                                                                                            >
                                                                                                {
                                                                                                    link.label
                                                                                                }
                                                                                            </a>
                                                                                        </li>
                                                                                    ),
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Round search button */}
                    <button
                        type="button"
                        onClick={() => setSearchOpen(!searchOpen)}
                        aria-label={searchOpen ? "Close search" : "Open search"}
                        aria-expanded={searchOpen}
                        className="grid h-9 w-9 cursor-pointer place-items-center self-center rounded-full bg-white text-neutral-900 ring-1 ring-neutral-300 transition-colors hover:bg-red-600 hover:text-white hover:ring-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        {searchOpen ? (
                            <X className="h-4 w-4" />
                        ) : (
                            <Search className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>

            {/* ===== Search bar ===== */}
            {searchOpen && (
                <div className="absolute inset-x-0 top-full border-t border-neutral-200 bg-white shadow-lg shadow-black/15">
                    <form
                        role="search"
                        action="/search"
                        method="get"
                        className="container mx-auto flex items-center gap-3 px-4 py-4"
                    >
                        <Search
                            className="h-5 w-5 shrink-0 text-neutral-400"
                            aria-hidden="true"
                        />
                        <input
                            ref={searchInput}
                            type="search"
                            name="q"
                            aria-label="Search LausGroup"
                            placeholder="Search brands, news and careers"
                            className="min-w-0 flex-1 bg-transparent text-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="inline-flex cursor-pointer items-center justify-center rounded-sm bg-red-600 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Search
                        </button>
                    </form>
                </div>
            )}

            {/* ===== Mobile and tablet menu ===== */}
            {mobileMenuOpen && (
                <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t-4 border-red-600 bg-neutral-100 shadow-lg shadow-black/25 xl:hidden">
                    <nav aria-label="Mobile" className="container mx-auto px-4">
                        <ul>
                            {NAV_ITEMS.map((item) => {
                                const active = isActive(item);
                                const expanded = openMobileItem === item.label;

                                return (
                                    <li
                                        key={item.label}
                                        className="border-b border-neutral-200"
                                    >
                                        {hasDropdown(item) ? (
                                            <>
                                                {/* Opens and closes the links */}
                                                <button
                                                    type="button"
                                                    aria-expanded={expanded}
                                                    onClick={() =>
                                                        setOpenMobileItem(
                                                            expanded
                                                                ? ""
                                                                : item.label,
                                                        )
                                                    }
                                                    className={`flex w-full cursor-pointer items-center justify-between px-3 py-4 text-left text-sm font-bold uppercase tracking-wide ${
                                                        active
                                                            ? "bg-red-600 text-white"
                                                            : expanded
                                                              ? "text-red-600"
                                                              : "text-neutral-900"
                                                    }`}
                                                >
                                                    {item.label}
                                                    <ChevronDown
                                                        aria-hidden="true"
                                                        className={`h-5 w-5 transition-transform duration-200 ${
                                                            expanded
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                </button>

                                                {expanded && (
                                                    <div className="bg-white px-3 pb-5 pt-4">
                                                        <a
                                                            href={item.href}
                                                            onClick={closeAll}
                                                            className="mb-3 inline-block text-sm font-semibold text-red-600 underline underline-offset-4"
                                                        >
                                                            Go to {item.label}
                                                        </a>

                                                        {/* A plain list of links */}
                                                        {item.links && (
                                                            <ul className="columns-2 gap-x-4 sm:columns-3">
                                                                {item.links.map(
                                                                    (link) => (
                                                                        <li
                                                                            key={
                                                                                link.href
                                                                            }
                                                                            className="break-inside-avoid"
                                                                        >
                                                                            <a
                                                                                href={
                                                                                    link.href
                                                                                }
                                                                                onClick={
                                                                                    closeAll
                                                                                }
                                                                                className="block py-2 text-base text-neutral-700 hover:text-red-600"
                                                                            >
                                                                                {
                                                                                    link.label
                                                                                }
                                                                            </a>
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        )}

                                                        {/* Lists of links with a heading */}
                                                        {item.groups &&
                                                            item.groups.map(
                                                                (group) => (
                                                                    <div
                                                                        key={
                                                                            group.heading
                                                                        }
                                                                        className="mb-4 last:mb-0"
                                                                    >
                                                                        <p className="mb-1 font-['Barlow_Condensed'] text-lg font-bold uppercase text-neutral-900">
                                                                            {
                                                                                group.heading
                                                                            }
                                                                        </p>
                                                                        <ul>
                                                                            {group.links.map(
                                                                                (
                                                                                    link,
                                                                                ) => (
                                                                                    <li
                                                                                        key={
                                                                                            link.href
                                                                                        }
                                                                                    >
                                                                                        <a
                                                                                            href={
                                                                                                link.href
                                                                                            }
                                                                                            onClick={
                                                                                                closeAll
                                                                                            }
                                                                                            className="block py-2 text-base text-neutral-700 hover:text-red-600"
                                                                                        >
                                                                                            {
                                                                                                link.label
                                                                                            }
                                                                                        </a>
                                                                                    </li>
                                                                                ),
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                ),
                                                            )}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <a
                                                href={item.href}
                                                target={
                                                    item.external
                                                        ? "_blank"
                                                        : undefined
                                                }
                                                rel={
                                                    item.external
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                                onClick={closeAll}
                                                aria-current={
                                                    active ? "page" : undefined
                                                }
                                                className={`block px-3 py-4 text-sm font-bold uppercase tracking-wide ${
                                                    active
                                                        ? "bg-red-600 text-white"
                                                        : "text-neutral-900"
                                                }`}
                                            >
                                                {item.label}
                                            </a>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Address and socials at the bottom of the mobile menu */}
                    <div className="bg-neutral-900">
                        <div className="container mx-auto space-y-5 px-4 py-6">
                            <a
                                href={MAPS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-2 text-sm leading-relaxed text-neutral-400 hover:text-white"
                            >
                                <MapPin
                                    className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                                    aria-hidden="true"
                                />
                                {ADDRESS}
                            </a>

                            <ul className="flex items-center gap-3">
                                {SOCIALS.map((social) => (
                                    <li key={social.label}>
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="grid h-10 w-10 place-items-center rounded-full bg-neutral-800 text-neutral-200 ring-1 ring-white/10 transition-colors hover:bg-red-600 hover:text-white"
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
                    </div>
                </div>
            )}
        </header>
    );
}
