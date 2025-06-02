'use client'

import { Moon, Sun, ArrowUp } from "lucide-react";
import { useTheme } from "next-themes";

export function Footer() {
  const { theme, setTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-6 px-4 mt-auto bg-white dark:bg-gray-900 flex justify-between items-center">
      <div>
        <button
          onClick={scrollToTop}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white transition-colors shadow z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>
      <div className="max-w-3xl mx-auto flex justify-center items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} minju25kim. All rights reserved.
        </div>
      </div>
      {/* Theme Toggle Button - fixed bottom right */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="p-3 rounded-full shadow-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-30"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Moon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        ) : (
          <Sun className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        )}
      </button>
    </footer>
  );
}
