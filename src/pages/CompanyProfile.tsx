import { useEffect, useState } from "react";
import { ExternalLink, MapPin, Quote } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// TODO: import your images, then delete the two empty constants below
import cp1 from "../assets/images/companyprofile1.jpg";
import cp2 from "../assets/images/companyprofile2.jpg";
const dealerNetworkImage = cp1;
const boardImage = cp2;

// "On this page" links (desktop). Each id matches a <section id="..."> below.
const tableOfContents = [
    { id: "anniversary", label: "45 Years of Leadership" },
    { id: "automotive", label: "Automative Excellence" },
    { id: "corporate-guarantee", label: "Corporate Guarantee" },
    { id: "legacy", label: "Countryside Development" },
    { id: "about", label: "About LausGroup" },
];

const cgBranches = [
    "Pampanga",
    "Metro Manila",
    "Bulacan",
    "Tarlac",
    "La Union",
    "Ilocos Norte",
];

export default function CompanyProfile() {
    const [activeId, setActiveId] = useState(tableOfContents[0].id);

    // Highlight the "On this page" link for the section currently being read
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: "-20% 0px -70% 0px" },
        );

        tableOfContents.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Header />
            <main className="w-full max-w-full font-['Barlow'] text-neutral-900">
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
                                        href="/about-us"
                                        className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                    >
                                        About us
                                    </a>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li aria-current="page" className="text-white">
                                    Company Profile
                                </li>
                            </ol>
                        </nav>

                        <h1 className="mt-8 font-['Barlow_Condensed'] text-5xl font-bold leading-none md:text-7xl">
                            Company Profile
                        </h1>
                    </div>
                </section>

                {/* Article */}
                <div className="container mx-auto grid gap-12 px-4 py-16 md:py-24 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
                    {/* On this page (desktop only) */}
                    <aside className="hidden lg:block">
                        <nav
                            aria-label="On this page"
                            className="sticky top-28"
                        >
                            <ul>
                                {tableOfContents.map((item) => (
                                    <li key={item.id}>
                                        <a
                                            href={`#${item.id}`}
                                            aria-current={
                                                activeId === item.id
                                                    ? "location"
                                                    : undefined
                                            }
                                            className={`block border-l-2 py-2 pl-4 text-[15px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${
                                                activeId === item.id
                                                    ? "border-red-600 font-semibold text-neutral-900"
                                                    : "border-neutral-200 text-neutral-500 hover:text-neutral-900"
                                            }`}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    <article className="max-w-3xl space-y-16 md:space-y-20">
                        {/* Anniversary */}
                        <section
                            id="anniversary"
                            aria-labelledby="anniversary-heading"
                            className="scroll-mt-28"
                        >
                            <h2
                                id="anniversary-heading"
                                className="text-4xl font-bold leading-tight md:text-5xl"
                            >
                                LausGroup of Companies celebrates 45 years of
                                leadership in countryside development
                            </h2>
                            <p className="mt-4 text-lg italic text-neutral-500">
                                The Pampanga-based conglomerate rings in its
                                anniversary with milestones in its automotive
                                and non-life insurance businesses
                            </p>

                            <div className="mt-8 space-y-5 text-lg leading-relaxed text-neutral-700 [&_strong]:font-semibold [&_strong]:text-neutral-900">
                                <p>
                                    <strong>
                                        17 August 2022, CITY OF SAN FERNANDO,
                                        Pampanga, Philippines
                                    </strong>{" "}
                                    –{" "}
                                    <strong>
                                        LausGroup of Companies (LGC)
                                    </strong>
                                    , one of the largest and fastest-growing
                                    multi-brand automotive network in the
                                    country, celebrates{" "}
                                    <strong>45 years</strong> with achievements
                                    from across its subsidiaries spanning the
                                    automotive, non-life insurance, media, and
                                    food and hospitality industries.
                                </p>
                                <p>
                                    <strong>
                                        Founded in 1977 as Carworld, Inc.
                                    </strong>{" "}
                                    by the late <strong>Levy P. Laus</strong>,
                                    LGC has evolved into one of the country’s
                                    top conglomerates outside of Metro Manila,
                                    centered on{" "}
                                    <strong>
                                        promoting countryside development in
                                        Northern and Central Luzon
                                    </strong>
                                    .
                                </p>
                                <p>
                                    To date, LGC now has{" "}
                                    <strong>more than 2000 employees</strong>,
                                    and is run by the{" "}
                                    <strong>
                                        2nd generation of Laus leaders
                                    </strong>{" "}
                                    who have carried on the legacy and
                                    entrepreneurial vision of the late founder,
                                    anchored on the core values of{" "}
                                    <strong>
                                        customer satisfaction, honesty and
                                        integrity, hard work and productivity,
                                        efficiency, and social responsibility
                                    </strong>
                                    .
                                </p>
                            </div>
                        </section>

                        {/* Automotive */}
                        <section
                            id="automotive"
                            aria-labelledby="automotive-heading"
                            className="scroll-mt-28"
                        >
                            <h2
                                id="automotive-heading"
                                className="font-['Barlow_Condensed'] text-3xl font-bold leading-tight md:text-4xl"
                            >
                                LausGroup: Over 4 decades of automotive
                                dealership excellence
                            </h2>

                            <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-700 [&_strong]:font-semibold [&_strong]:text-neutral-900">
                                <p>
                                    From a small allied subdealer to eventually
                                    becoming a highly-diversified conglomerate,
                                    The LausGroup now has several dealerships
                                    located in Metro Manila, Central and
                                    Northern Luzon.
                                </p>
                                <p>
                                    Carrying world-class automotive brands such
                                    as Mitsubishi, Ford, Hyundai, Chevrolet,
                                    BMW, Volkswagen, Jeep, Peugeot, Kia, MINI,
                                    Mazda, Suzuki, Foton, Geely, MG, Haima, and
                                    Changhe, the LausGroup remains as{" "}
                                    <strong>
                                        one of the fastest-growing auto
                                        dealership in the country
                                    </strong>
                                    .
                                </p>
                                <p>
                                    Its leadership in the automotive dealership
                                    space also extends to the distribution of
                                    trucks and buses, with LGC carrying brands
                                    such as Hyundai, Fuso, and Foton.
                                </p>
                                <p>
                                    Currently, the company continues to expand
                                    its customer base with the ongoing
                                    construction of{" "}
                                    <strong>Carworld Bataan</strong>, slated for
                                    completion in the 4th Quarter of 2022.
                                </p>
                                <p>
                                    The LausGroup has also strengthened its
                                    foothold in motorcycle dealerships in the
                                    countryside, bringing in brands such as BMW
                                    Motorrad, Harley-Davidson, Aprilia, Moto
                                    Guzzi, and Vespa.
                                </p>
                                <p>
                                    Today, LGC and SMC Asia Car Distributors
                                    officially opened the{" "}
                                    <strong>
                                        Premier Motorrad, the first standalone
                                        showroom and dealership of BMW Motorrad
                                        in Pampanga
                                    </strong>
                                    . The launch coincides with the birth
                                    anniversary of LGC’s Levy P. Laus and the
                                    company’s 45th Founding Anniversary.
                                </p>
                            </div>
                        </section>

                        {/* Corporate Guarantee */}
                        <section
                            id="corporate-guarantee"
                            aria-labelledby="cg-heading"
                            className="scroll-mt-28"
                        >
                            <h2
                                id="cg-heading"
                                className="font-['Barlow_Condensed'] text-3xl font-bold leading-tight md:text-4xl"
                            >
                                Corporate Guarantee: 25 years of unparalleled
                                customer care
                            </h2>

                            <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-700 [&_strong]:font-semibold [&_strong]:text-neutral-900">
                                <p>
                                    <strong>Corporate Guarantee (CG)</strong>,
                                    one of the country’s top non-life insurance
                                    companies, recently celebrated its 25th
                                    anniversary marked with milestones and
                                    successes that has cemented its leadership
                                    in the Philippine insurance space.
                                </p>
                                <p>
                                    The LGC subsidiary was recently granted by
                                    the Philippine Insurance Commission with
                                    another{" "}
                                    <strong>
                                        three-year Certificate of Authority for
                                        2022 to 2024
                                    </strong>
                                    , allowing CG to continue providing security
                                    and peace of mind to their customers.
                                </p>
                                <p>
                                    In its commitment to bring unparalleled
                                    customer care, CG earned an{" "}
                                    <strong>ISO certification in 2004</strong>,
                                    making it one of only six non-life insurance
                                    companies in the country that are
                                    ISO-certified. With seasoned professionals
                                    leading the organization, the company is
                                    able to maintain a high standard of service
                                    while supporting continuous career growth
                                    and development for its employees.
                                </p>
                                <p>
                                    CG continues to expand its network and
                                    services with branches in:
                                </p>
                            </div>

                            <ul className="mt-4 flex flex-wrap gap-2">
                                {cgBranches.map((branch) => (
                                    <li
                                        key={branch}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-800 ring-1 ring-neutral-200"
                                    >
                                        <MapPin
                                            className="h-4 w-4 text-red-600"
                                            aria-hidden="true"
                                        />
                                        {branch}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Legacy */}
                        <section
                            id="legacy"
                            aria-labelledby="legacy-heading"
                            className="scroll-mt-28"
                        >
                            <h2
                                id="legacy-heading"
                                className="font-['Barlow_Condensed'] text-3xl font-bold leading-tight md:text-4xl"
                            >
                                Enduring legacy of countryside development
                            </h2>

                            <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-700 [&_strong]:font-semibold [&_strong]:text-neutral-900">
                                <p>
                                    The dynamic growth of its automotive
                                    dealership network paved the way for LGC to
                                    become the highly-diversified conglomerate
                                    that it is today, built on the strong
                                    foundation of dedication to excellence and
                                    customer satisfaction.
                                </p>
                                <p>
                                    With the late scion’s eldest daughter{" "}
                                    <strong>Lisset Laus-Velasco</strong> at the
                                    helm of the group’s operations, LGC has
                                    reinforced its commitment to social
                                    responsibility, participating in various
                                    environmental and social outreach programs
                                    in recent years.
                                </p>
                                <p>
                                    This includes the{" "}
                                    <strong>Balik Baterya Program</strong> with{" "}
                                    <strong>
                                        Ford Philippines, Motolite, and the
                                        Philippine Business for Social Progress
                                    </strong>
                                    , where partner companies collect used lead
                                    acid batteries (ULABs) and turn it over for
                                    proper recycling and production. In turn,
                                    participating companies may allocate
                                    proceeds of the sale of their ULABs for CSR
                                    projects to their chosen beneficiaries.
                                </p>
                                <p>
                                    Following Laus-Velasco’s recognition as a{" "}
                                    <strong>
                                        global Ford Dealership Honoree in 2021
                                    </strong>
                                    , Laus-Velasco received a{" "}
                                    <strong>
                                        grant from global automaker Ford Motor
                                        Company
                                    </strong>{" "}
                                    which went to{" "}
                                    <strong>
                                        supporting the education of deserving
                                        Grade 12 students
                                    </strong>{" "}
                                    who will undergo apprenticeship and training
                                    with LGC after their graduation.
                                </p>
                                <p>
                                    In line with the founder’s vision of priming
                                    the countryside and stimulating economic
                                    activity, LGC’s media outlets such as the{" "}
                                    <strong>RWFM 95.1</strong> and{" "}
                                    <strong>CLTV 36</strong> continue to serve
                                    as a peek into Central and Northern Luzon’s
                                    development, cultivating communities and
                                    culture through its nationwide scope and
                                    extensive coverage.
                                </p>
                                <p>
                                    The upward trajectory of LGC’s growth and
                                    expansion is testament to the enduring
                                    legacy of countryside development that LGC
                                    Chief Executive Officer{" "}
                                    <strong>Lisset Laus-Velasco</strong>{" "}
                                    attributes to the collective effort of the
                                    men and women that made LausGroup to what it
                                    is today.
                                </p>
                            </div>

                            <figure className="mt-10 rounded-md border-l-4 border-red-600 bg-neutral-50 p-6 md:p-8">
                                <Quote
                                    className="h-8 w-8 text-red-600"
                                    aria-hidden="true"
                                />
                                <blockquote className="mt-3 font-['Barlow_Condensed'] text-2xl font-semibold leading-snug text-neutral-900 md:text-3xl">
                                    “The LausGroup wouldn’t be where it is today
                                    if not for the hard work and dedication of
                                    all our team members who have been with us
                                    from the very beginning. As we celebrate 45
                                    years of the LausGroup, we strive to
                                    champion countryside development by
                                    expanding our network across all our lines
                                    of business to take both Central and
                                    Northern Luzon to greater heights.”
                                </blockquote>
                                <figcaption className="mt-4 text-neutral-600">
                                    <span className="font-semibold text-neutral-900">
                                        Lisset Laus-Velasco
                                    </span>
                                    , Chief Executive Officer
                                </figcaption>
                            </figure>

                            <p className="mt-8 text-lg leading-relaxed text-neutral-700">
                                LGC marks its 45th Anniversary with festivities
                                at the LausGroup Complex in the City of San
                                Fernando, Pampanga, in the presence of esteemed
                                guests from the provincial and local government,
                                brand partners, and affiliates of the LausGroup.
                            </p>
                        </section>

                        {/* About */}
                        <section
                            id="about"
                            aria-labelledby="about-heading"
                            className="scroll-mt-28"
                        >
                            <h2
                                id="about-heading"
                                className="font-['Barlow_Condensed'] text-3xl font-bold leading-tight md:text-4xl"
                            >
                                About LausGroup of Companies
                            </h2>

                            <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                                The LausGroup of Companies is a Pampanga-based
                                conglomerate, spanning the industries of
                                automotives, non-life insurance, media, food,
                                and hospitality. Its flagship arm is the Laus
                                Auto Group, which carries over 65 dealerships
                                for industry-leading automotive brands, guided
                                by its passion for cars and customer care.
                                Sparked by the entrepreneurial vision of its
                                founder Levy P. Laus, the LausGroup of Companies
                                has over 40 years of experience in commercial
                                acceleration and countryside development.
                            </p>
                        </section>
                    </article>
                </div>

                {/* Dealer network (image has its own title) */}
                <section
                    id="dealer-network"
                    aria-label="LausGroup dealer network, as of February 2026"
                    className="scroll-mt-20 bg-neutral-50 py-16 md:py-24"
                >
                    <div className="container mx-auto px-4">
                        <figure className="mx-auto max-w-5xl">
                            {dealerNetworkImage ? (
                                <>
                                    <img
                                        src={dealerNetworkImage}
                                        alt="LausGroup dealer network map and table showing the brands available in each province across Northern and Central Luzon, as of February 2026"
                                        loading="lazy"
                                        decoding="async"
                                        className="block h-auto w-full rounded-md bg-white shadow-lg ring-1 ring-neutral-200"
                                    />
                                    {/* The infographic is dense, so offer the full-size image */}
                                    <figcaption className="mt-4 text-center">
                                        <a
                                            href={dealerNetworkImage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 font-semibold text-red-600 underline underline-offset-4 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
                                        >
                                            <ExternalLink
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                            Full-sized Image
                                        </a>
                                    </figcaption>
                                </>
                            ) : (
                                <div className="grid aspect-[4/5] place-items-center rounded-md border-2 border-dashed border-neutral-300 bg-white p-6 text-center text-neutral-500 sm:aspect-[3/2]">
                                    Dealer network image goes here. Import it at
                                    the top of this file.
                                </div>
                            )}
                        </figure>
                    </div>
                </section>

                {/* Board of directors (image has its own title) */}
                <section
                    id="board"
                    aria-label="LausGroup board of directors"
                    className="scroll-mt-20 border-t-4 border-red-600 bg-neutral-950 py-16 text-white md:py-24"
                >
                    <div className="container mx-auto px-4">
                        <figure className="mx-auto max-w-5xl">
                            {boardImage ? (
                                <img
                                    src={boardImage}
                                    alt="LausGroup Board of Directors: Lisset Laus-Velasco, Chairman; Ma. Theresa A. Laus, Vice Chairman; Paul Tristan A. Laus, Director; Ada Carisa A. Laus, Director; Levy Adrian A. Laus, Director; Diorella Rosabelle A. Laus, Director"
                                    loading="lazy"
                                    decoding="async"
                                    className="block h-auto w-full rounded-md"
                                />
                            ) : (
                                <div className="grid aspect-[3/2] place-items-center rounded-md border-2 border-dashed border-white/25 p-6 text-center text-neutral-400 sm:aspect-[2/1]">
                                    Board of directors image goes here. Import
                                    it at the top of this file.
                                </div>
                            )}
                        </figure>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
