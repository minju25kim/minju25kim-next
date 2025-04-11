import Link from "next/link";

export default async function VideoPage() {


  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Videos</h1>
        </div>

      </div>
    </div>
  );
} 