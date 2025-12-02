"use client";
import Link from "next/link";
import { useLogoContext } from "./logo-context";

const Navbar = () => {
  const { logoInNav } = useLogoContext();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        logoInNav ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section - Left */}
          <div className="shrink-0 w-58">
            {logoInNav && (
              <Link href="/">
                <img
                  src="/images/nell.png"
                  alt="logo"
                  className="w-36 navbar md:w-32 h-auto transition-all duration-300"
                />
              </Link>
            )}
          </div>

          {/* Navigation Items - Right */}
          <div className="flex items-center gap-8">
            <a
              href="#about"
              className="text-white hover:text-orange-400 transition-colors duration-200 text-sm md:text-base font-medium"
            >
              About Us
            </a>
            <a
              href="#services"
              className="text-white hover:text-orange-400 transition-colors duration-200 text-sm md:text-base font-medium"
            >
              Services
            </a>
            <Link
              href="/tutorials"
              className="text-white hover:text-orange-400 transition-colors duration-200 text-sm md:text-base font-medium"
            >
              Tutorials
            </Link>
            <a
              href="#contact"
              className="text-white hover:text-orange-400 transition-colors duration-200 text-sm md:text-base font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
