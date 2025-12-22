interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-base-800 border-t px-4 py-12 lg:px-9 ${className}`}>
      <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <span className="text-foreground text-pretty font-mono text-[14px] leading-[100%] tracking-[-0.0175rem] uppercase font-semibold">
            Kevin Rajan
          </span>
          <p className="text-pretty font-mono text-[14px] leading-[120%] tracking-[-0.0175rem] text-base-500 max-w-xs">
            AI Engineer building autonomous systems that solve previously impossible problems.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-foreground text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase">
            Quick Links
          </h3>
          <nav className="flex flex-col gap-3">
            <a
              href="#projects"
              className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase relative flex w-fit items-center transition-colors duration-150 hover:text-orange-500 group after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-150 after:ease-out hover:after:w-full text-base-400"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase relative flex w-fit items-center transition-colors duration-150 hover:text-orange-500 group after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-150 after:ease-out hover:after:w-full text-base-400"
            >
              Experience
            </a>
            <a
              href="#skills"
              className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase relative flex w-fit items-center transition-colors duration-150 hover:text-orange-500 group after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-150 after:ease-out hover:after:w-full text-base-400"
            >
              Skills
            </a>
            <a
              href="#about"
              className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase relative flex w-fit items-center transition-colors duration-150 hover:text-orange-500 group after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-150 after:ease-out hover:after:w-full text-base-400"
            >
              About
            </a>
          </nav>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-foreground text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase">
            Connect
          </h3>
          <nav className="flex flex-col gap-3">
            <a
              href="https://github.com/kvnloo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase relative flex w-fit items-center transition-colors duration-150 hover:text-orange-500 group after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-150 after:ease-out hover:after:w-full text-base-400"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/kevinsrajan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase relative flex w-fit items-center transition-colors duration-150 hover:text-orange-500 group after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-150 after:ease-out hover:after:w-full text-base-400"
            >
              LinkedIn
            </a>
            <a
              href="mailto:kevin@zero.llc"
              className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase relative flex w-fit items-center transition-colors duration-150 hover:text-orange-500 group after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-150 after:ease-out hover:after:w-full text-base-400"
            >
              Email
            </a>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-base-800 mt-12 border-t pt-6">
        <p className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] text-base-500 text-center">
          © {currentYear} Kevin Rajan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
