import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center transition-colors duration-200">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">This page could not be found.</p>
      <Link
        href="/"
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
} 