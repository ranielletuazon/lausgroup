import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface HeroSlide {
    src: string;
    alt: string;
}

interface HeroBannerProps {
    slides: HeroSlide[];
    /** How long each slide stays on screen, in milliseconds. */
    interval?: number;
    autoPlay?: boolean;
    className?: string;
}

const SWIPE_THRESHOLD = 50;

const controlButton =
    "grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// "Reduce motion" setting, read as an external store so no setState is needed in an effect.
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeReducedMotion = (onChange: () => void) => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotion = () => false;

/**
 * 1 slide  -> a plain image.
 * 2+ slides -> a carousel with crossfade, autoplay, progress bar, dots,
 *              arrows, swipe, keyboard support and a pause button.
 */
export default function HeroBanner({
    slides,
    interval = 6000,
    autoPlay = true,
    className = "",
}: HeroBannerProps) {
    const count = slides.length;
    const isCarousel = count > 1;

    const [current, setCurrent] = useState(0);
    const [userPaused, setUserPaused] = useState(false);

    // Respect "reduce motion": no autoplay for those users.
    const reducedMotion = useSyncExternalStore(
        subscribeReducedMotion,
        getReducedMotion,
        getServerReducedMotion,
    );

    const elapsed = useRef(0);
    const barRef = useRef<HTMLSpanElement>(null);
    const touchStartX = useRef<number | null>(null);

    const playing = isCarousel && autoPlay && !userPaused && !reducedMotion;

    // Restart the progress bar whenever the slide changes.
    useEffect(() => {
        elapsed.current = 0;
        if (barRef.current) barRef.current.style.transform = "scaleX(0)";
    }, [current]);

    // Autoplay. Elapsed time is kept in a ref so pausing and resuming
    // continues from where it stopped, and the bar is updated without re-rendering.
    useEffect(() => {
        if (!playing) return;

        let raf = 0;
        let last = performance.now();

        const tick = (now: number) => {
            // Cap the delta so returning to a background tab doesn't skip slides.
            elapsed.current += Math.min(now - last, 100);
            last = now;

            const progress = Math.min(elapsed.current / interval, 1);
            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${progress})`;
            }

            if (progress >= 1) {
                setCurrent((i) => (i + 1) % count);
                return;
            }
            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [playing, interval, count, current]);

    if (count === 0) return null;

    // Single image: no carousel UI at all.
    if (!isCarousel) {
        return (
            <div className={className}>
                <img
                    src={slides[0].src}
                    alt={slides[0].alt}
                    className="block h-auto w-full"
                />
            </div>
        );
    }

    const goTo = (index: number) =>
        setCurrent(((index % count) + count) % count);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") goTo(current - 1);
        if (e.key === "ArrowRight") goTo(current + 1);
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        if (e.pointerType !== "mouse") touchStartX.current = e.clientX;
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (touchStartX.current === null) return;
        const dx = e.clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > SWIPE_THRESHOLD) goTo(current + (dx < 0 ? 1 : -1));
    };

    return (
        <section
            aria-roledescription="carousel"
            aria-label="Featured dealerships and promotions"
            className={`relative w-full touch-pan-y select-none overflow-hidden bg-neutral-900 ${className}`}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => (touchStartX.current = null)}
        >
            {/* Slides share one grid cell, so the banner is as tall as the tallest image. */}
            <div className="grid" aria-live={playing ? "off" : "polite"}>
                {slides.map((slide, i) => (
                    <div
                        key={slide.src}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${i + 1} of ${count}`}
                        aria-hidden={i !== current}
                        className={`col-start-1 row-start-1 transition-opacity duration-1000 motion-reduce:transition-none ${
                            i === current
                                ? "z-10 opacity-100"
                                : "pointer-events-none opacity-0"
                        }`}
                    >
                        <img
                            src={slide.src}
                            alt={slide.alt}
                            draggable={false}
                            className="block h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/55 to-transparent px-4 pb-5 pt-12 sm:px-6">
                <div className="container mx-auto flex items-center justify-between gap-4">
                    <div
                        className="flex items-center"
                        role="tablist"
                        aria-label="Choose slide"
                    >
                        {slides.map((slide, i) => (
                            <button
                                key={slide.src}
                                type="button"
                                role="tab"
                                aria-selected={i === current}
                                aria-label={`Go to slide ${i + 1}`}
                                onClick={() => goTo(i)}
                                className="group flex h-8 items-center px-1 focus-visible:outline-none"
                            >
                                <span
                                    className={`block h-1.5 rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-black/50 ${
                                        i === current
                                            ? "w-8 bg-red-600"
                                            : "w-2.5 bg-white/70 group-hover:bg-white"
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setUserPaused((p) => !p)}
                            aria-label={
                                userPaused
                                    ? "Play slideshow"
                                    : "Pause slideshow"
                            }
                            className={controlButton}
                        >
                            {userPaused ? (
                                <Play className="h-4 w-4" />
                            ) : (
                                <Pause className="h-4 w-4" />
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => goTo(current - 1)}
                            aria-label="Previous slide"
                            className={controlButton}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => goTo(current + 1)}
                            aria-label="Next slide"
                            className={controlButton}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Autoplay progress */}
            {autoPlay && !reducedMotion && (
                <div
                    className="absolute inset-x-0 bottom-0 z-30 h-1 bg-white/15"
                    aria-hidden="true"
                >
                    <span
                        ref={barRef}
                        className="block h-full origin-left bg-red-600"
                        style={{ transform: "scaleX(0)" }}
                    />
                </div>
            )}
        </section>
    );
}
