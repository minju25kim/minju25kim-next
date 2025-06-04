// src/app/(authenticated)/composer/layout.tsx
// Shared layout for all /composer pages to ensure consistent theme background

import React from "react";

export default function ComposerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200 ">
      {children}
    </div>
  );
} 