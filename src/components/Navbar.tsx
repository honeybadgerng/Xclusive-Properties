"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  Moon,
  Sun,
  Menu,
  X,
  Home,
  Building,
  Clock,
  FileText,
  Phone,
  LogOut,
  LogIn,
  CircleUser,
  ChartCandlestick,
  Newspaper,
  Hourglass,
} from "lucide-react";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  // 👇 Check token on mount
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsAuthenticated(!!token);
  // }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const navLinks = [
    {
      name: "About Us",
      path: "/about",
      icon: <CircleUser className="mr-2 h-4 w-4" />,
    },
    {
      name: "Whitepaper",
      path: "/whitepaper",
      icon: <Newspaper className="mr-2 h-4 w-4" />,
    },
    {
      name: "Investment",
      path: "/investment",
      icon: <ChartCandlestick className="mr-2 h-4 w-4" />,
    },
    {
      name: "Properties",
      path: "/properties",
      icon: <Building className="mr-2 h-4 w-4" />,
    },
    {
      name: "Booking",
      path: "https://docs.google.com/forms/d/e/1FAIpQLSeN_MyQeHltgGtdm7JYZE0vITvway604pK_KQsLM6VZWQGaxA/viewform?usp=sf_link",
      external: true,
      icon: <Clock className="mr-2 h-4 w-4" />,
    },

    {
      name: "Blog",
      path: "/blogs",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      name: "Join waiting list",
      path: "/waiting-list",
      icon: <Hourglass className="mr-2 h-4 w-4" />,
    },
    {
      name: "signup",
      path: "/sign-up",
      icon: <LogIn className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/images/Xclusive_properties.png"
              alt="Xclusive Properties Logo"
              className="h-40 w-auto max-w-[500px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-medium hover:text-secondary transition-colors"
                >
                  {link.icon}
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.path}
                  className="flex items-center text-sm font-medium hover:text-secondary transition-colors"
                >
                  {link.icon}
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="px-2"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            {isAuthenticated ? (
              <Button
                size="sm"
                variant="destructive"
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button
                size="sm"
                className="bg-secondary hover:bg-secondary/90 text-primary"
                onClick={handleLogin}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="mr-2"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" onClick={toggleMenu} className="px-2">
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.path}
                  className="flex items-center py-2 px-3 rounded-md hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              )
            )}

            <div className="pt-2 pb-3">
              {isAuthenticated ? (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Button
                  className="w-full bg-secondary hover:bg-secondary/90 text-primary"
                  size="sm"
                  onClick={() => {
                    handleLogin();
                    setIsOpen(false);
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
