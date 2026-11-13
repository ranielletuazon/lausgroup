import type { Brand } from "../assets/data";

interface BrandSectionProps {
    title: string;
    brands: Brand[];
    divider?: boolean;
}

export default function BrandSection({
    title,
    brands,
    divider = false,
}: BrandSectionProps) {
    return (
        <section
            className={`py-10 ${divider ? "border-b border-gray-200" : ""}`}
        >
            <h2 className="mb-8 text-center text-xl font-light uppercase tracking-wide text-gray-800 md:text-2xl">
                {title}
            </h2>

            <ul className="flex flex-wrap justify-center gap-4">
                {brands.map((brand) => (
                    <li
                        key={brand.brandName}
                        className="flex h-32 w-32 items-center justify-center border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md sm:h-40 sm:w-40"
                    >
                        <img
                            src={brand.logo}
                            alt={brand.brandName}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain"
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}
