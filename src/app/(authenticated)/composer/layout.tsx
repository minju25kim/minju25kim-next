import React from "react";

export const metadata = {
  title: "Composer",
  description: "Composer",
};

export default function ComposerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200 ">
      {children}
    </div>
  );
} 