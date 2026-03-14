"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Add real event photos to /public/gallery/ and update data/carousel.json
const SLIDES = [
  { src: "/hacksl-logo.png", alt: "HackSL" },
  { src: "/hacksl-logo.png", alt: "HackSL Events" },
  { src: "/hacksl-logo.png", alt: "Sri Lanka Tech" },
] as const;

export function PhotoCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="gallery" className="border-t border-[var(--border)] bg-[var(--surface)] py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Moments
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-[var(--muted)]">
          Highlights from hackathons and events we&apos;ve partnered with.
        </p>
        <div className="relative mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
          <div className="aspect-[21/9] w-full">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--accent-light)] to-[var(--surface)] p-8">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={240}
                    height={240}
                    className="object-contain opacity-90"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-[var(--foreground)]" : "bg-[var(--border)] hover:bg-[var(--muted)]"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
