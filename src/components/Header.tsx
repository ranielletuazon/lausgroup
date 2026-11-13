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
import type { Brand } from "../assets/data";

const address =
    "Jose Abad Santos Avenue, City of San Fernando, Pampanga, Philippines 2000";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

/* ---------------------------------- Menu data --------------------------------- */

interface NavLink {
    label: string;
    href: string;
}

interface MenuGroup {
    heading?: string;
    /** Desktop column (1-based) this group is placed in. Ignored for flat menus. */
    column?: number;
    links: NavLink[];
}

interface Menu {
    description: string;
    /** Number of columns in the desktop panel */
    cols: number;
    /** Flat = one plain list of links, laid out row by row in `cols` columns */
    flat?: boolean;
    groups: MenuGroup[];
}

interface NavItem {
    label: string;
    href: string;
    external?: boolean;
    menu?: Menu;
}

// "Hyundai T&B" -> "hyundai-t-and-b", "Hüper Optik" -> "huper-optik"
const slug = (s: string) =>
    s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/['’]/g, "")
        .replace(/\s*&\s*/g, "-and-")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const toLinks = (base: string, labels: string[]): NavLink[] =>
    labels.map((label) => ({ label, href: `${base}/${slug(label)}` }));

// Menu links come straight from the data files: add a brand to a JSON and it shows up here.
// Child links default to /parent/name-of-brand, so update the base paths to match your routes.
const brandLinks = (base: string, brands: Brand[]): NavLink[] =>
    brands.map((b) => ({
        label: b.brandName,
        href: `${base}/${slug(b.brandName)}`,
    }));

const byName = (a: Brand, b: Brand) => a.brandName.localeCompare(b.brandName);

/**
 * Groups brands by their `category`, then spreads the groups over `cols` columns,
 * always placing the next-largest group in the shortest column.
 */
const buildGroups = (
    brands: Brand[],
    base: string,
    cols: number,
): MenuGroup[] => {
    const byCategory = new Map<string, Brand[]>();
    brands.forEach((b) => {
        const key = b.category ?? "More";
        byCategory.set(key, [...(byCategory.get(key) ?? []), b]);
    });

    const groups = [...byCategory.entries()]
        .map(([heading, items]) => ({
            heading,
            links: brandLinks(base, [...items].sort(byName)),
        }))
        .sort((a, b) => b.links.length - a.links.length);

    const heights = Array<number>(cols).fill(0);
    return groups.map((group) => {
        const column = heights.indexOf(Math.min(...heights));
        heights[column] += group.links.length + 2; // +2 accounts for the heading
        return { ...group, column: column + 1 };
    });
};

const affiliateBrands = [...affiliates, ...foodGroup, ...mediaGroup];

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
        label: "About us",
        href: "/about-us",
        menu: {
            // TODO: placeholder items, replace with the real About us pages
            description: "Learn who we are and what drives the group.",
            cols: 1,
            flat: true,
            groups: [
                {
                    links: toLinks("/about-us", [
                        "Company Profile",
                        "mission-vision",
                        "About the Founder",
                    ]),
                },
            ],
        },
    },
    {
        label: "Automotive",
        href: "/automotive",
        menu: {
            description:
                "Cars, trucks and buses from every brand we carry across our dealerships.",
            cols: 4,
            flat: true,
            groups: [
                {
                    links: brandLinks(
                        "/automotive",
                        [...automotiveBrands, ...trucksBuses].sort(byName),
                    ),
                },
            ],
        },
    },
    {
        label: "Motorbikes",
        href: "/motorbikes",
        menu: {
            description:
                "Premium and everyday motorbikes from our dealerships.",
            cols: 4,
            flat: true,
            groups: [{ links: brandLinks("/motorbikes", motorbikes) }],
        },
    },
    {
        label: "Affiliates",
        href: "/affiliates",
        menu: {
            description:
                "Finance, auto care, dining, media and more from the LausGroup family.",
            cols: 4,
            groups: buildGroups(affiliateBrands, "/affiliates", 4),
        },
    },
    { label: "News and events", href: "/news-and-events" },
    { label: "Contact us", href: "/contact" },
    {
        label: "Careers",
        href: "https://careers.lausgroup.com.ph/",
        external: true,
    },
];

/* ---------------------------------- Socials ---------------------------------- */

// TODO: replace with the real LausGroup social pages
const svgProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-4 w-4",
    "aria-hidden": true,
} as const;

const socials = [
    {
        label: "LausGroup on YouTube",
        href: "https://www.youtube.com/",
        icon: (
            <svg {...svgProps}>
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
            </svg>
        ),
    },
    {
        label: "LausGroup on Instagram",
        href: "https://www.instagram.com/",
        icon: (
            <svg {...svgProps}>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.75" />
            </svg>
        ),
    },
    {
        label: "LausGroup on Facebook",
        href: "https://www.facebook.com/",
        icon: (
            <svg {...svgProps}>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
];

/* ---------------------------------- Styles ---------------------------------- */

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500";
const iconButton = `grid h-10 w-10 place-items-center rounded-full text-neutral-200 transition-colors hover:bg-white/10 hover:text-white cursor-pointer ${focusRing}`;
const socialButton = `grid h-8 w-8 place-items-center rounded-full bg-white/10 text-neutral-200 transition-colors hover:bg-red-600 hover:text-white ${focusRing}`;
const ctaButton = `inline-flex items-center justify-center gap-2 rounded-sm bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 cursor-pointer ${focusRing}`;
const panelLink = `block py-1.5 text-[15px] font-medium text-neutral-700 transition-colors hover:text-red-600 hover:underline hover:underline-offset-4 ${focusRing}`;

const externalProps = (external?: boolean) =>
    external ? { target: "_blank", rel: "noopener noreferrer" } : {};

/* ---------------------------------- Component ---------------------------------- */

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null); // desktop dropdown
    const [mobileOpen, setMobileOpen] = useState<string | null>(null); // mobile accordion
    const searchInput = useRef<HTMLInputElement>(null);
    const closeTimer = useRef<number | undefined>(undefined);

    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    const isActive = (item: NavItem) =>
        item.external
            ? false
            : item.href === "/"
              ? path === "/"
              : path.startsWith(item.href);

    const closeAll = () => {
        setMenuOpen(false);
        setSearchOpen(false);
        setOpenMenu(null);
    };

    // Hover-intent: open immediately, close after a short delay so the pointer can travel
    const openNow = (label: string | null) => {
        window.clearTimeout(closeTimer.current);
        setOpenMenu(label);
    };
    const scheduleClose = () => {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(() => setOpenMenu(null), 150);
    };

    // Shadow once the page has scrolled
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Escape closes panels
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeAll();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Close the mobile menu if the screen grows into the desktop layout
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1280px)");
        const onChange = (e: MediaQueryListEvent) => {
            if (e.matches) setMenuOpen(false);
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    // Lock page scroll while the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    // Focus the search field when it opens
    useEffect(() => {
        if (searchOpen) searchInput.current?.focus();
    }, [searchOpen]);

    // Clear any pending timer on unmount
    useEffect(() => () => window.clearTimeout(closeTimer.current), []);

    return (
        <>
            {/* Utility bar: address + socials (hidden on small phones) */}
            <div className="hidden bg-neutral-950 font-['Barlow'] text-xs text-neutral-400 sm:block">
                <div className="container mx-auto flex h-9 items-center justify-between gap-4 px-4">
                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex min-w-0 items-center gap-2 transition-colors hover:text-white ${focusRing}`}
                    >
                        <MapPin
                            className="h-3.5 w-3.5 shrink-0 text-red-500"
                            aria-hidden="true"
                        />
                        <span className="truncate">{address}</span>
                    </a>

                    <ul className="ml-auto hidden items-center gap-2 md:flex">
                        {socials.map((s) => (
                            <li key={s.label}>
                                <a
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className={socialButton}
                                >
                                    {s.icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main bar */}
            <header
                className={`sticky top-0 z-50 bg-neutral-900 font-['Barlow'] text-white transition-shadow duration-300 ${
                    scrolled ? "shadow-lg shadow-black/25" : ""
                }`}
            >
                <div className="container mx-auto flex h-16 items-center gap-6 px-4 xl:h-20">
                    <a
                        href="/"
                        aria-label="LausGroup home"
                        onClick={closeAll}
                        className={`shrink-0 ${focusRing}`}
                    >
                        <img
                            src={logo}
                            alt="LausGroup - A Passion for Cars & Customer Care"
                            className="h-9 w-auto sm:h-11 xl:h-12"
                        />
                    </a>

                    {/* Desktop navigation */}
                    <nav
                        aria-label="Main"
                        className="ml-auto hidden h-full xl:block"
                        onMouseLeave={scheduleClose}
                    >
                        <ul className="flex h-full items-stretch">
                            {navItems.map((item) => {
                                const active = isActive(item);
                                const menu = item.menu;
                                const isOpen = openMenu === item.label;
                                const panelId = `mega-${slug(item.label)}`;

                                // Place groups into their desktop columns
                                const columns = menu
                                    ? Array.from(
                                          { length: menu.cols },
                                          (_, c) =>
                                              menu.groups.filter(
                                                  (g) =>
                                                      (g.column ?? 1) === c + 1,
                                              ),
                                      )
                                    : [];

                                return (
                                    <li
                                        key={item.label}
                                        className="flex"
                                        onMouseEnter={() =>
                                            openNow(menu ? item.label : null)
                                        }
                                        onFocus={() =>
                                            openNow(menu ? item.label : null)
                                        }
                                        onBlur={(e) => {
                                            if (
                                                !e.currentTarget.contains(
                                                    e.relatedTarget as Node | null,
                                                )
                                            )
                                                setOpenMenu(null);
                                        }}
                                    >
                                        <a
                                            href={item.href}
                                            {...externalProps(item.external)}
                                            aria-current={
                                                active ? "page" : undefined
                                            }
                                            aria-haspopup={
                                                menu ? "true" : undefined
                                            }
                                            aria-expanded={
                                                menu ? isOpen : undefined
                                            }
                                            aria-controls={
                                                menu ? panelId : undefined
                                            }
                                            className={`group relative flex items-center px-4 text-[13px] font-semibold uppercase tracking-wider transition-colors ${focusRing} ${
                                                active || isOpen
                                                    ? "text-white"
                                                    : "text-neutral-300 hover:text-white"
                                            }`}
                                        >
                                            {item.label}
                                            {menu && (
                                                <ChevronDown
                                                    aria-hidden="true"
                                                    className={`ml-1 h-3.5 w-3.5 transition-transform duration-200 ${
                                                        isOpen
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                />
                                            )}
                                            <span
                                                aria-hidden="true"
                                                className={`absolute inset-x-4 bottom-0 h-1 origin-left bg-red-600 transition-transform duration-200 ${
                                                    active || isOpen
                                                        ? "scale-x-100"
                                                        : "scale-x-0 group-hover:scale-x-100"
                                                }`}
                                            />
                                        </a>

                                        {/* Dropdown panel (full width, anchored to the header) */}
                                        {menu && (
                                            <div
                                                id={panelId}
                                                className={`absolute inset-x-0 top-full max-h-[calc(100dvh-7rem)] overflow-y-auto border-t-4 border-red-600 bg-white text-neutral-900 shadow-2xl shadow-black/25 transition-[opacity,visibility,transform] duration-200 motion-reduce:transition-none ${
                                                    isOpen
                                                        ? "visible translate-y-0 opacity-100"
                                                        : "pointer-events-none invisible -translate-y-1 opacity-0"
                                                }`}
                                            >
                                                <div className="container mx-auto grid gap-12 px-4 py-10 lg:grid-cols-[15rem_1fr]">
                                                    <div>
                                                        <p className="font-['Barlow_Condensed'] text-3xl font-bold leading-none">
                                                            {item.label}
                                                        </p>
                                                        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                                                            {menu.description}
                                                        </p>
                                                        <a
                                                            href={item.href}
                                                            className={`mt-5 inline-block text-sm font-semibold text-red-600 underline underline-offset-4 hover:text-red-700 ${focusRing}`}
                                                        >
                                                            Go to {item.label}
                                                        </a>
                                                    </div>

                                                    <div className="lg:border-l lg:border-neutral-200 lg:pl-12">
                                                        {menu.flat ? (
                                                            <ul
                                                                className="grid gap-x-8"
                                                                style={{
                                                                    gridTemplateColumns: `repeat(${menu.cols}, minmax(0, 1fr))`,
                                                                }}
                                                            >
                                                                {menu.groups[0].links.map(
                                                                    (link) => (
                                                                        <li
                                                                            key={
                                                                                link.href
                                                                            }
                                                                        >
                                                                            <a
                                                                                href={
                                                                                    link.href
                                                                                }
                                                                                className={
                                                                                    panelLink
                                                                                }
                                                                            >
                                                                                {
                                                                                    link.label
                                                                                }
                                                                            </a>
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        ) : (
                                                            <div
                                                                className="grid gap-x-8"
                                                                style={{
                                                                    gridTemplateColumns: `repeat(${menu.cols}, minmax(0, 1fr))`,
                                                                }}
                                                            >
                                                                {columns.map(
                                                                    (
                                                                        groups,
                                                                        c,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                c
                                                                            }
                                                                            className="space-y-7"
                                                                        >
                                                                            {groups.map(
                                                                                (
                                                                                    group,
                                                                                ) => (
                                                                                    <div
                                                                                        key={
                                                                                            group.heading
                                                                                        }
                                                                                    >
                                                                                        <p className="mb-2 border-b border-neutral-200 pb-2 font-['Barlow_Condensed'] text-xl font-bold">
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
                                                                                                            className={
                                                                                                                panelLink
                                                                                                            }
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

                    {/* Actions */}
                    <div className="ml-auto flex items-center gap-1 xl:ml-0 xl:gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setSearchOpen((o) => !o);
                                setMenuOpen(false);
                                setOpenMenu(null);
                            }}
                            aria-label={
                                searchOpen ? "Close search" : "Open search"
                            }
                            aria-expanded={searchOpen}
                            aria-controls="site-search-panel"
                            className={iconButton}
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
                                setMenuOpen((o) => !o);
                                setSearchOpen(false);
                            }}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                            className={`${iconButton} xl:hidden`}
                        >
                            {menuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Search panel */}
                {searchOpen && (
                    <div
                        id="site-search-panel"
                        className="absolute inset-x-0 top-full border-t border-white/10 bg-neutral-800 shadow-lg shadow-black/25"
                    >
                        <form
                            role="search"
                            action="/search"
                            method="get"
                            className="container mx-auto flex items-center gap-3 px-4 py-4"
                        >
                            <label htmlFor="site-search" className="sr-only">
                                Search LausGroup
                            </label>
                            <Search
                                className="h-5 w-5 shrink-0 text-neutral-400"
                                aria-hidden="true"
                            />
                            <input
                                ref={searchInput}
                                id="site-search"
                                type="search"
                                name="q"
                                placeholder="Search brands, news and careers"
                                className="min-w-0 flex-1 bg-transparent text-lg text-white placeholder:text-neutral-500 focus:outline-none"
                            />
                            <button type="submit" className={ctaButton}>
                                Search
                            </button>
                        </form>
                    </div>
                )}

                {/* Mobile / tablet menu */}
                {menuOpen && (
                    <div
                        id="mobile-menu"
                        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-neutral-900 shadow-lg shadow-black/30 xl:hidden"
                    >
                        <nav
                            aria-label="Mobile"
                            className="container mx-auto px-4"
                        >
                            <ul>
                                {navItems.map((item) => {
                                    const active = isActive(item);
                                    const menu = item.menu;
                                    const expanded = mobileOpen === item.label;
                                    const subId = `mobile-sub-${slug(item.label)}`;

                                    const rowClass = `flex w-full items-center gap-3 py-4 text-left text-lg font-semibold ${focusRing} ${
                                        active || expanded
                                            ? "text-white"
                                            : "text-neutral-300"
                                    }`;
                                    const marker = (
                                        <span
                                            aria-hidden="true"
                                            className={`h-5 w-1 ${
                                                active
                                                    ? "bg-red-600"
                                                    : "bg-transparent"
                                            }`}
                                        />
                                    );

                                    return (
                                        <li
                                            key={item.label}
                                            className="border-b border-white/10"
                                        >
                                            {menu ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        aria-expanded={expanded}
                                                        aria-controls={subId}
                                                        onClick={() =>
                                                            setMobileOpen(
                                                                expanded
                                                                    ? null
                                                                    : item.label,
                                                            )
                                                        }
                                                        className={`${rowClass} justify-between`}
                                                    >
                                                        <span className="flex items-center gap-3">
                                                            {marker}
                                                            {item.label}
                                                        </span>
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
                                                        <div
                                                            id={subId}
                                                            className="pb-5 pl-4"
                                                        >
                                                            <a
                                                                href={item.href}
                                                                onClick={
                                                                    closeAll
                                                                }
                                                                className={`mb-3 inline-block text-sm font-semibold text-red-500 underline underline-offset-4 ${focusRing}`}
                                                            >
                                                                Go to{" "}
                                                                {item.label}
                                                            </a>

                                                            {menu.groups.map(
                                                                (group, gi) => (
                                                                    <div
                                                                        key={
                                                                            group.heading ??
                                                                            gi
                                                                        }
                                                                        className="mb-4 last:mb-0"
                                                                    >
                                                                        {group.heading && (
                                                                            <p className="mb-1 font-['Barlow_Condensed'] text-lg font-bold text-white">
                                                                                {
                                                                                    group.heading
                                                                                }
                                                                            </p>
                                                                        )}
                                                                        <ul
                                                                            className={
                                                                                menu.flat &&
                                                                                menu.cols >
                                                                                    1
                                                                                    ? "grid grid-cols-2 gap-x-4 sm:grid-cols-3"
                                                                                    : ""
                                                                            }
                                                                        >
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
                                                                                            className={`block py-2 text-base text-neutral-300 hover:text-white ${focusRing}`}
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
                                                    {...externalProps(
                                                        item.external,
                                                    )}
                                                    onClick={closeAll}
                                                    aria-current={
                                                        active
                                                            ? "page"
                                                            : undefined
                                                    }
                                                    className={rowClass}
                                                >
                                                    {marker}
                                                    {item.label}
                                                </a>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="container mx-auto space-y-6 px-4 py-6">
                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-start gap-2 text-sm leading-relaxed text-neutral-400 hover:text-white ${focusRing}`}
                            >
                                <MapPin
                                    className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                                    aria-hidden="true"
                                />
                                {address}
                            </a>

                            <ul className="flex items-center gap-2">
                                {socials.map((s) => (
                                    <li key={s.label}>
                                        <a
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.label}
                                            className={socialButton}
                                        >
                                            {s.icon}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
