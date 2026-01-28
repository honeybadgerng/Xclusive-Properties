import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  ShieldCheck,
  Coins,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/images/Xclusive_properties.png"
                alt="Xclusive Properties Logo"
                className="h-40 w-auto max-w-[500px]"
              />
            </Link>
            <p className="mb-4 text-sm opacity-80">
              A crypto enabled real estate platform for buying, renting, and
              investing in verified Nigerian properties.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-4 text-xs">
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                <ShieldCheck className="h-3 w-3 text-secondary" />
                Blockchain verified
              </div>
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                <Coins className="h-3 w-3 text-secondary" />
                Crypto payments supported
              </div>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Book Inspection
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-xl font-bold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties?type=apartment"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Apartments
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=house"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Houses
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=commercial"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Commercial
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=short-let"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Short-Let
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=land"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Land
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {/* <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm opacity-80">
                  123 Victoria Island, Lagos, Nigeria
                </span>
              </li> */}
              <li className="flex items-center">
                <a href="tel:+2348059522376">
                  <Phone className="h-5 w-5 mr-2 text-secondary flex-shrink-0" />
                  <span className="text-sm opacity-80">+2348059522376</span>
                </a>
              </li>
              <li className="flex items-center">
                <a href="mailto:rjbxclusive@gmail.com">
                  <Mail className="h-5 w-5 mr-2 text-secondary flex-shrink-0" />
                  <span className="text-sm opacity-80">
                    connect@rjbworld.org
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm opacity-60">
          <a
            href="https://rjbworld.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            <p>
              &copy; {new Date().getFullYear()} RJB World. All rights reserved.
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
