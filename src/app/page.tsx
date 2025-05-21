"use client";

import { useEffect, useState } from "react";

import GitHubIcon from "@/components/ui/icons/github-icon";
import LinkedInIcon from "@/components/ui/icons/linkedin-icon";
import { MailIcon } from "@/components/ui/icons/mail-icon";
import MediumIcon from "@/components/ui/icons/medium-icon";
import YouTubeIcon from "@/components/ui/icons/youtube-icon";
import { MapPin, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen relative bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="fixed top-4 right-4 p-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Moon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        ) : (
          <Sun className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        )}
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Link
            href="/meta"
            className="relative block hover:scale-105 transition-transform duration-300"
          >
            <Image
              src="/minju25kim.webp"
              alt="minju25kim"
              width={100}
              height={100}
              priority
              className="rounded-full"
            />
          </Link>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            🏃🏻‍♀️ running 👩🏻‍🔬 cooking
          </p>
          <div className="flex items-center gap-2 text-lg text-gray-800 dark:text-gray-200">
            <MapPin className="w-5 h-5" />
            <span>Seoul, South Korea</span>
          </div>
          <div className="flex items-center gap-2">
            <MailIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            <a
              href="mailto:minju25kim@gmail.com"
              className="text-lg text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              minju25kim@gmail.com
            </a>
          </div>
          <div className="flex justify-center items-center gap-6 mt-2">
            <a
              href="https://www.linkedin.com/in/minju25kim/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="LinkedIn"
            >
              <LinkedInIcon className="w-8 h-8 fill-current" />
            </a>
            <a
              href="https://github.com/minju25kim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="GitHub"
            >
              <GitHubIcon className="w-8 h-8 fill-current" />
            </a>
            <a
              href="https://medium.com/@minju25kim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Medium"
            >
              <MediumIcon className="w-8 h-8 fill-current" />
            </a>
            <a
              href="https://www.youtube.com/@minju25kim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="YouTube"
            >
              <YouTubeIcon className="w-8 h-8 fill-current" />
            </a>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col items-center gap-6 mt-8">
            <Link
              href="/blog"
              className="text-2xl text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              blog
            </Link>
            <Link
              href="/dev"
              className="text-2xl text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              dev
            </Link>
            <Link
              href="/timeline"
              className="text-2xl text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              timeline
            </Link>
            <Link
              href="/video"
              className="text-2xl text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              video
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Minju Kim. All rights reserved.</p>
      </footer>
    </div>
  );
}
