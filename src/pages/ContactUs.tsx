import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactUs() {
    // The contact form lives on the CRM and is shown here in an iframe
    const FORM_URL = "https://crm.lausgroup.com.ph/ContactUs";

    return (
        <>
            <Header />
            <main className="w-full max-w-full bg-neutral-100 font-['Barlow'] text-neutral-900">
                {/* Page header */}
                <section className="relative overflow-hidden border-b-4 border-red-600 bg-neutral-950 bg-[linear-gradient(115deg,transparent_62%,rgba(220,38,38,0.2)_62%,rgba(220,38,38,0.2)_70%,transparent_70%)] text-white">
                    <div className="container mx-auto px-4 pb-20 pt-10 md:pb-28 md:pt-14">
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
                                    Contact us
                                </li>
                            </ol>
                        </nav>

                        <h1 className="mt-8 font-['Barlow_Condensed'] text-5xl font-bold uppercase leading-none md:text-7xl">
                            Contact us
                        </h1>
                        <p className="mt-4 max-w-xl text-lg text-neutral-300">
                            Questions about a vehicle, a quotation or our
                            services? Send us a message and our team will get
                            back to you.
                        </p>
                    </div>
                </section>

                {/* Contact form (iframe from the CRM) */}
                <section aria-label="Contact form" className="py-10 md:py-14">
                    <div className="container mx-auto px-4">
                        <div className="overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-neutral-200">
                            {/*
                              The form comes from another website, so the iframe can't size
                              itself to fit. These heights fit the whole form with no inner
                              scrollbar: tallest on phones (fields stack in one column),
                              shorter on wider screens (fields sit side by side).
                              If the form gets cut off or leaves a big gap, adjust these numbers.
                            */}
                            <div className="relative">
                                {/* Shown behind the iframe while it loads */}
                                <p className="absolute inset-x-0 top-10 text-center text-neutral-400">
                                    Loading the contact form…
                                </p>

                                <iframe
                                    src={FORM_URL}
                                    title="LausGroup contact form"
                                    loading="lazy"
                                    className="relative block w-full border-0 h-[1500px] sm:h-[1150px] md:h-[950px] lg:h-[830px]"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
