import automotiveBrandsJson from "./automativebrands.json";
import trucksBusesJson from "./trucksbus.json";
import motorbikesJson from "./motorbikes.json";
import affiliatesJson from "./affiliates.json";
import foodGroupJson from "./foodgroups.json";
import mediaGroupJson from "./mediagroups.json";

// One phone group on an affiliate page, e.g. { label: "Mobile", values: ["+63 918 854 2377"] }
export interface Contact {
    label: string;
    values: string[];
}

// One restaurant branch, e.g. { name: "Max's Restaurant – Bacolor", address: "...", phone: "+63 45 963 2020" }
export interface Branch {
    name: string;
    address: string;
    /** International format works best for tap-to-call, e.g. "+63 45 963 2020" */
    phone: string;
    hours?: string;
}

export interface Address {
    label: string;
    value: string;
}

// One department of a motorbike dealership: Sales, Service or Parts
export interface Department {
    name: string; // shown on the tab, e.g. "Sales"
    address: string;
    /** International format works best for tap-to-call, e.g. "+63 918 854 2950" */
    phones: string[];
    hours: string[]; // one line each, e.g. "Monday – Friday: 8:30 AM – 5:30 PM"
}

// One brand, as it is written in the JSON files
export interface RawBrand {
    brandName: string;
    /** The page this brand links to in the menu, e.g. "/automotive/ford" */
    href: string;
    /**
     * File name inside src/assets/images/logos/.
     * Leave it out, or set it to "", for brands that have no logo.
     */
    logoImage?: string | null;
    category?: string;

    // ----- Only for brands with their own page (href like "/laus-auto-finance") -----

    /** File name inside src/assets/images/banners/, "" for none */
    banner?: string;
    /**
     * The page text, one line per item:
     *   "## Some title" -> a small heading
     *   "- Some item"   -> a list item
     *   anything else   -> a paragraph
     */
    description?: string[];

    // ----- Affiliate pages -----
    address?: string;
    addresses?: Address[];
    contacts?: Contact[];
    /** Full URL of the affiliate's own website, "" for none */
    website?: string;
    /** true = list this brand under Automotive instead of Affiliates in the Header */
    showInAutomotive?: boolean;

    // ----- Food group pages -----

    branches?: Branch[];
    /** The "src" of the Google Maps embed iframe, "" for none (also used by affiliate and motorbike pages) */
    mapEmbed?: string;

    // ----- Motorbike pages -----

    /** Sales, Service and Parts details. Only the departments listed here get a tab. */
    departments?: Department[];
    /** The "src" of the contact form iframe, "" for none */
    formUrl?: string;
}

// One brand, ready to use: the same fields plus the image addresses for <img src>
export interface Brand extends RawBrand {
    /** Empty string when the brand has no logo. */
    logo: string;
    /** Empty string when the brand has no banner. */
    bannerUrl: string;
}

// Load every logo once and map: "baiclogo.jpg" -> "/src/assets/images/logos/baiclogo.jpg"
const logoModules = import.meta.glob<string>(
    "../images/logos/*.{jpg,jpeg,png,webp,svg}",
    { eager: true, import: "default" },
);

const logoMap: Record<string, string> = Object.fromEntries(
    Object.entries(logoModules).map(([path, url]) => [
        path.split("/").pop() as string,
        url,
    ]),
);

export const getLogo = (fileName?: string | null): string => {
    // No logo on purpose: return "" quietly, with no warning.
    if (!fileName) return "";

    const url = logoMap[fileName];
    // A file name was given but the file is missing: that's probably a typo, so warn.
    if (!url && import.meta.env.DEV) {
        console.warn(`[data] Logo not found: "${fileName}"`);
    }
    return url ?? "";
};

// Load every banner once and map: "lausautofinance.jpg" -> its URL
const bannerModules = import.meta.glob<string>(
    "../images/banners/*.{jpg,jpeg,png,webp}",
    { eager: true, import: "default" },
);

const bannerMap: Record<string, string> = Object.fromEntries(
    Object.entries(bannerModules).map(([path, url]) => [
        path.split("/").pop() as string,
        url,
    ]),
);

export const getBanner = (fileName?: string | null): string => {
    // No banner on purpose: return "" quietly, with no warning.
    if (!fileName) return "";

    const url = bannerMap[fileName];
    // A file name was given but the file is missing: that's probably a typo, so warn.
    if (!url && import.meta.env.DEV) {
        console.warn(`[data] Banner not found: "${fileName}"`);
    }
    return url ?? "";
};

const withLogos = (items: RawBrand[]): Brand[] =>
    items.map((item) => ({
        ...item,
        logo: getLogo(item.logoImage),
        bannerUrl: getBanner(item.banner),
    }));

export const automotiveBrands = withLogos(automotiveBrandsJson);
export const trucksBuses = withLogos(trucksBusesJson);
export const motorbikes = withLogos(motorbikesJson);
export const affiliates = withLogos(affiliatesJson);
export const foodGroup = withLogos(foodGroupJson);
export const mediaGroup = withLogos(mediaGroupJson);
