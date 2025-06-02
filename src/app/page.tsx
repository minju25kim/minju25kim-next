"use client";

import { useEffect, useState } from "react";
import { MapPin, Mail, Github, Linkedin, Youtube, Moon, Sun } from "lucide-react";
import MediumIcon from "@/components/ui/icons/medium-icon";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">

      {/* Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Minju Kim</h1>
          <div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-300">
            <MapPin className="w-5 h-5" />
            <span>Seoul, South Korea</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <a
              href="mailto:minju25kim@gmail.com"
              className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              minju25kim@gmail.com
            </a>
          </div>
          <div className="flex justify-center items-center gap-6 mt-2">
            <a
              href="https://www.linkedin.com/in/minju25kim/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-7 h-7" />
            </a>
            <a
              href="https://github.com/minju25kim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="GitHub"
            >
              <Github className="w-7 h-7" />
            </a>
            <a
              href="https://medium.com/@minju25kim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Medium"
            >
              <MediumIcon className="w-7 h-7 fill-current" />
            </a>
            <a
              href="https://www.youtube.com/@minju25kim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="YouTube"
            >
              <Youtube className="w-7 h-7" />
            </a>
          </div>
          <a
            href="https://www.google.com/search?q=minju25kim"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Instagram"
          >
            @minju25kim
          </a>
          {/* Activities: vertical list */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg text-gray-800 dark:text-gray-200">🏃🏻‍♀️ running</span>
            <span className="text-lg text-gray-800 dark:text-gray-200">👩🏻‍🔬 cooking</span>
            <span className="text-lg text-gray-800 dark:text-gray-200">📖 reading</span>
          </div>
        </div>
      </main>
    </div>
  );
}
