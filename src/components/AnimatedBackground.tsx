"use client";

export function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {/* Subtle gradient orbs - purple tones */}
      <div
        className="absolute -top-1/2 -left-1/2 h-full w-full animate-blob rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(91, 33, 182, 0.06)" }}
      />
      <div
        className="animation-delay-2000 absolute -top-1/2 -right-1/2 h-full w-full animate-blob rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(124, 58, 237, 0.04)" }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
