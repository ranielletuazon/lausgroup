import { useState } from "react";
import { CalendarDays, ImageIcon } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { newsPosts } from "../assets/data/news";

export default function NewsEvents() {
    // The posts, newest first (from src/assets/data/news.json)
    const POSTS = newsPosts;

    // How many posts to show at first, and how many more each "Load more" click adds
    const PAGE_SIZE = 5;

    // The filter buttons: "All", then every category used by at least one post
    const CATEGORIES = [
        "All",
        ...Array.from(new Set(POSTS.flatMap((post) => post.categories))).sort(),
    ];

    // The archive months, newest first: "2026-08", "2026-07", ...
    const MONTHS = Array.from(
        new Set(POSTS.map((post) => post.publishedDate.slice(0, 7))),
    );

    // The 5 newest posts for the sidebar
    const RECENT_POSTS = POSTS.slice(0, 5);

    const [activeCategory, setActiveCategory] = useState("All");
    const [activeMonth, setActiveMonth] = useState(""); // "" = every month
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    // The posts that match the chosen category and month
    const filteredPosts = POSTS.filter(
        (post) =>
            (activeCategory === "All" ||
                post.categories.includes(activeCategory)) &&
            (activeMonth === "" || post.publishedDate.startsWith(activeMonth)),
    );
    const shownPosts = filteredPosts.slice(0, visibleCount);

    // "2026-08-01" -> "August 1, 2026" (UTC keeps the same day for every visitor)
    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
        });

    // "2026-08" -> "August 2026"
    const formatMonth = (month: string) =>
        new Date(`${month}-01`).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            timeZone: "UTC",
        });

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
                                <li aria-current="page" className="text-white">
                                    News and events
                                </li>
                            </ol>
                        </nav>

                        <h1 className="mt-8 font-['Barlow_Condensed'] text-5xl font-bold uppercase leading-none md:text-7xl">
                            News and events
                        </h1>
                    </div>
                </section>

                <div className="container mx-auto grid gap-10 px-4 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
                    {/* ===== Posts column ===== */}
                    <div>
                        {/* Category filter: scrolls sideways on phones, wraps on bigger screens */}
                        <ul
                            aria-label="Filter by category"
                            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
                        >
                            {CATEGORIES.map((category) => {
                                const active = category === activeCategory;
                                return (
                                    <li key={category} className="shrink-0">
                                        <button
                                            type="button"
                                            aria-pressed={active}
                                            onClick={() => {
                                                setActiveCategory(category);
                                                setVisibleCount(PAGE_SIZE);
                                            }}
                                            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${
                                                active
                                                    ? "bg-red-600 text-white"
                                                    : "bg-white text-neutral-700 ring-1 ring-neutral-200 hover:text-red-600 hover:ring-red-600"
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Shows which month is chosen, with a way to clear it */}
                        {activeMonth && (
                            <p className="mt-4 text-sm text-neutral-600">
                                Showing posts from{" "}
                                <span className="font-semibold text-neutral-900">
                                    {formatMonth(activeMonth)}
                                </span>
                                .{" "}
                                <button
                                    type="button"
                                    onClick={() => setActiveMonth("")}
                                    className="cursor-pointer font-semibold text-red-600 underline underline-offset-4 hover:text-red-700"
                                >
                                    Show all months
                                </button>
                            </p>
                        )}

                        {/* No posts match the filters */}
                        {shownPosts.length === 0 && (
                            <div className="mt-6 rounded-md bg-white px-6 py-16 text-center ring-1 ring-neutral-200">
                                <p className="font-['Barlow_Condensed'] text-2xl font-bold">
                                    No posts match these filters yet.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveCategory("All");
                                        setActiveMonth("");
                                    }}
                                    className="mt-4 cursor-pointer font-semibold text-red-600 underline underline-offset-4 hover:text-red-700"
                                >
                                    Show all posts
                                </button>
                            </div>
                        )}

                        {/* The posts, one under the other, all the same size */}
                        <ul className="mt-6 space-y-8">
                            {shownPosts.map((post) => (
                                <li key={post.href}>
                                    <article className="group relative overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-neutral-200 transition-shadow duration-300 focus-within:ring-2 focus-within:ring-red-600 hover:shadow-xl">
                                        <div className="aspect-[16/9] overflow-hidden bg-neutral-200">
                                            {post.thumbnailUrl ? (
                                                <img
                                                    src={post.thumbnailUrl}
                                                    alt=""
                                                    loading="lazy"
                                                    className="h-full w-full bg-black/50 object-contain transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                                                />
                                            ) : (
                                                <div className="grid h-full w-full place-items-center text-neutral-400">
                                                    <ImageIcon
                                                        className="h-12 w-12"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 md:p-8">
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                                <time
                                                    dateTime={
                                                        post.publishedDate
                                                    }
                                                    className="flex items-center gap-2 text-neutral-500"
                                                >
                                                    <CalendarDays
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                    {formatDate(
                                                        post.publishedDate,
                                                    )}
                                                </time>
                                                <ul className="flex flex-wrap gap-2">
                                                    {post.categories.map(
                                                        (category) => (
                                                            <li
                                                                key={category}
                                                                className="rounded-full bg-neutral-100 px-3 py-0.5 text-xs font-semibold text-neutral-600"
                                                            >
                                                                {category}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>

                                            <h2 className="mt-3 font-['Barlow_Condensed'] text-3xl font-bold leading-tight transition-colors group-hover:text-red-600">
                                                {post.title}
                                            </h2>
                                            <p className="mt-3 line-clamp-3 leading-relaxed text-neutral-600">
                                                {post.excerpt}
                                            </p>

                                            {/* after:absolute makes the whole card clickable */}
                                            <a
                                                href={post.href}
                                                className="mt-5 inline-block font-semibold text-red-600 underline underline-offset-4 after:absolute after:inset-0 hover:text-red-700 focus:outline-none"
                                            >
                                                Read more
                                                <span className="sr-only">
                                                    : {post.title}
                                                </span>
                                            </a>
                                        </div>
                                    </article>
                                </li>
                            ))}
                        </ul>

                        {/* Load more */}
                        {filteredPosts.length > visibleCount && (
                            <div className="mt-10 text-center">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setVisibleCount(
                                            visibleCount + PAGE_SIZE,
                                        )
                                    }
                                    className="inline-flex cursor-pointer items-center justify-center rounded-sm bg-red-600 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    Load more
                                </button>
                                <p className="mt-3 text-sm text-neutral-500">
                                    Showing {visibleCount} of{" "}
                                    {filteredPosts.length} posts
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ===== Sidebar (under the posts on phones, on the right on desktop) ===== */}
                    <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
                        {/* Recent posts */}
                        <div className="rounded-md bg-white p-6 ring-1 ring-neutral-200">
                            <h2 className="border-b-2 border-red-600 pb-3 font-['Barlow_Condensed'] text-2xl font-bold uppercase">
                                Recent posts
                            </h2>
                            <ul className="mt-2 divide-y divide-neutral-200">
                                {RECENT_POSTS.map((post) => (
                                    <li key={post.href}>
                                        <a
                                            href={post.href}
                                            className="group block py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        >
                                            <span className="line-clamp-2 font-semibold leading-snug text-neutral-800 transition-colors group-hover:text-red-600">
                                                {post.title}
                                            </span>
                                            <time
                                                dateTime={post.publishedDate}
                                                className="mt-1 block text-xs text-neutral-500"
                                            >
                                                {formatDate(post.publishedDate)}
                                            </time>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Archives */}
                        <div className="rounded-md bg-white p-6 ring-1 ring-neutral-200">
                            <h2 className="border-b-2 border-red-600 pb-3 font-['Barlow_Condensed'] text-2xl font-bold uppercase">
                                Archives
                            </h2>
                            <select
                                aria-label="Show posts from a month"
                                value={activeMonth}
                                onChange={(e) => {
                                    setActiveMonth(e.target.value);
                                    setVisibleCount(PAGE_SIZE);
                                }}
                                className="mt-4 w-full cursor-pointer rounded-sm border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-800 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/30"
                            >
                                <option value="">All months</option>
                                {MONTHS.map((month) => (
                                    <option key={month} value={month}>
                                        {formatMonth(month)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
}
