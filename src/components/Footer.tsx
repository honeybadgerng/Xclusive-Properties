import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
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
              Providing premium real estate solutions across Nigeria. Your
              journey to finding the perfect property starts here.
            </p>
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
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm opacity-80">
                  123 Victoria Island, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-secondary flex-shrink-0" />
                <span className="text-sm opacity-80">+234 801 234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-secondary flex-shrink-0" />
                <span className="text-sm opacity-80">connect@rjbworld.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm opacity-60">
          <p>
            &copy; {new Date().getFullYear()} RJB World. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
