import Link from "next/link";
import ComposerTableClient from "./ComposerTableClient";

export default function ComposerPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <h1 className="text-4xl font-bold mt-8">contents editor</h1>
      <div className="flex items-center justify-center gap-4">
        <Link href="/composer/create" className="bg-blue-500 text-white p-2 rounded-md">
          Create
        </Link>
        {/* TODO: Add client-side sign out button here if needed */}
      </div>
      <div className="w-full max-w-3xl mt-8">
        <ComposerTableClient />
      </div>
    </div>
  );
}
