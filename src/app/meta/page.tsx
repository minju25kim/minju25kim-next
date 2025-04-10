import Link from 'next/link';

interface Post extends Document {
  title: string;
  createdAt: string;
}

export default async function MetaPage() {

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-8 text-gray-600 hover:text-blue-600 transition-colors"
        >
          ← Back to home
        </Link>
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Blog Metadata</h1>
        </div>
      </div>
    </div>
  );
} 