import automotiveBrandsJson from "./automativebrands.json";
import trucksBusesJson from "./trucksbus.json";
import motorbikesJson from "./motorbikes.json";
import affiliatesJson from "./affiliates.json";
import foodGroupJson from "./foodgroups.json";
import mediaGroupJson from "./mediagroups.json";

export interface RawBrand {
    brandName: string;
    /**
     * File name inside src/assets/images/logos/.
     * Leave it out, or set it to "", for brands that have no logo.
     */
    logoImage?: string | null;
    category?: string;
}

export interface Brand extends RawBrand {
    /** Resolved, bundler-safe URL for <img src>. Empty string when the brand has no logo. */
    logo: string;
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

const withLogos = (items: RawBrand[]): Brand[] =>
    items.map((item) => ({ ...item, logo: getLogo(item.logoImage) }));

export const automotiveBrands = withLogos(automotiveBrandsJson);
export const trucksBuses = withLogos(trucksBusesJson);
export const motorbikes = withLogos(motorbikesJson);
export const affiliates = withLogos(affiliatesJson);
export const foodGroup = withLogos(foodGroupJson);
export const mediaGroup = withLogos(mediaGroupJson);
