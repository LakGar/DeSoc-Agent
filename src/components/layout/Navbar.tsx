"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="#" className="flex items-center">
            <div className="relative h-10 w-10 flex items-center justify-center mr-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg rotate-12 opacity-80"></div>
              <div className="relative z-10 bg-gradient-to-br from-blue-600 to-purple-700 h-8 w-8 rounded-md flex items-center justify-center shadow-lg">
                <span className="text-white text-xs font-bold tracking-tight">
                  AX
                </span>
              </div>
            </div>
            <span className="text-xl font-bold">AGENTX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#home" isActive={pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="#" isActive={pathname === "/features"}>
              Features
            </NavLink>
            <NavLink href="#" isActive={pathname === "/pricing"}>
              Pricing
            </NavLink>
            <NavLink href="#" isActive={pathname === "/about"}>
              About
            </NavLink>
          </nav>

          {/* Connect Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
            >
              Login
            </Link>
            <ConnectButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-md border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <nav className="flex flex-col space-y-4 mb-6">
                <MobileNavLink href="/" isActive={pathname === "/"}>
                  Home
                </MobileNavLink>
                <MobileNavLink
                  href="/features"
                  isActive={pathname === "/features"}
                >
                  Features
                </MobileNavLink>
                <MobileNavLink
                  href="/pricing"
                  isActive={pathname === "/pricing"}
                >
                  Pricing
                </MobileNavLink>
                <MobileNavLink href="/about" isActive={pathname === "/about"}>
                  About
                </MobileNavLink>
              </nav>
              <div className="pt-4 border-t border-white/10">
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
                  >
                    Login
                  </Link>
                  <ConnectButton />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${
        isActive ? "text-blue-400" : "text-white hover:text-blue-400"
      }`}
    >
      {children}
      {isActive && (
        <span className="block h-0.5 mt-1 bg-blue-400 rounded-full w-1/2 mx-auto" />
      )}
    </Link>
  );
}

function MobileNavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`text-base font-medium px-3 py-2 rounded-md transition-colors ${
        isActive ? "text-blue-400 bg-white/5" : "text-white hover:bg-white/5"
      }`}
    >
      {children}
    </Link>
  );
}
