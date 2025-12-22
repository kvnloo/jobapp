interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`sticky inset-x-0 top-0 z-60 border-b border-base-800 backdrop-blur-sm px-4 after:absolute after:inset-0 after:left-1/2 after:h-full after:w-screen after:-translate-x-1/2 after:bg-background md:border-b-0 lg:px-9 ${className}`}>
      <div className="mx-auto flex items-center justify-between py-5">
        {/* Logo / Name */}
        <a className="z-50" href="/">
          <span className="text-foreground text-pretty font-mono text-[14px] leading-[100%] tracking-[-0.0175rem] uppercase font-semibold">
            Kevin Rajan
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="z-50 flex w-full items-center justify-between gap-9 md:w-auto md:justify-end">
          <nav aria-label="Main" className="relative hidden lg:flex">
            <ul className="group/menu flex space-x-8">
              <li className="relative opacity-100 transition-opacity duration-250 group-hover/menu:opacity-60 hover:!opacity-100">
                <a
                  className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase relative flex w-fit items-center transition-colors duration-150 hover:text-orange-500 group after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-150 after:ease-out hover:after:w-full text-base-400"
                  href="#projects"
                >
                  Projects
                </a>
              </li>
              <li className="relative opacity-100 transition-opacity duration-250 group-hover/menu:opacity-60 hover:!opacity-100">
                <a
                  className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase relative flex w-fit items-center transition-colors duration-150 hover:text-orange-500 group after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-150 after:ease-out hover:after:w-full text-base-400"
                  href="#experience"
                >
                  Experience
                </a>
              </li>
              <li className="relative opacity-100 transition-opacity duration-250 group-hover/menu:opacity-60 hover:!opacity-100">
                <a
                  className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase relative flex w-fit items-center transition-colors duration-150 hover:text-orange-500 group after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-150 after:ease-out hover:after:w-full text-base-400"
                  href="#skills"
                >
                  Skills
                </a>
              </li>
              <li className="relative opacity-100 transition-opacity duration-250 group-hover/menu:opacity-60 hover:!opacity-100">
                <a
                  className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase relative flex w-fit items-center transition-colors duration-150 hover:text-orange-500 group after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-150 after:ease-out hover:after:w-full text-base-400"
                  href="#about"
                >
                  About
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Navigation - simplified for now */}
          <div className="flex items-center gap-3">
            <button
              className="relative -m-1 flex cursor-pointer items-center justify-center p-1 lg:hidden"
              aria-label="open/close mobile menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21V8H3V6Z" fill="var(--color-light-base-primary)"></path>
                <path d="M3 11H21V13H3V11Z" fill="var(--color-light-base-primary)"></path>
                <path d="M3 16H21V18H3V16Z" fill="var(--color-light-base-primary)"></path>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
