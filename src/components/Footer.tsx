export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--dark)] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm font-medium text-white">HackSL</span>
          <p className="text-sm text-white/80">
            Connecting Sri Lanka&apos;s Tech Innovators
            <br />
            Founded in 2023
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#about" className="text-sm text-white/80 transition-colors hover:text-white">
              About
            </a>
            <a href="#hackathons" className="text-sm text-white/80 transition-colors hover:text-white">
              Hackathons
            </a>
            <a href="#blog" className="text-sm text-white/80 transition-colors hover:text-white">
              Blog
            </a>
            <a href="#partners" className="text-sm text-white/80 transition-colors hover:text-white">
              Partners
            </a>
            <a href="#fellows" className="text-sm text-white/80 transition-colors hover:text-white">
              Fellows
            </a>
            <a href="#contact" className="text-sm text-white/80 transition-colors hover:text-white">
              Contact
            </a>
            <a
              href="https://www.linkedin.com/company/hacksl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/hacksl.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/hack.sl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
