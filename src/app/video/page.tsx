import Link from "next/link";

type Params = Promise<{ [key: string]: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

export default async function VideoPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  let currentPage = 1;

  try {
    const pageParam = params.page;
    if (typeof pageParam === 'string') {
      const parsedPage = parseInt(pageParam, 10);
      if (!isNaN(parsedPage)) {
        currentPage = Math.max(1, parsedPage);
      }
    }
  } catch (error) {
    console.error('Error parsing search parameters:', error);
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-gray-600 hover:text-blue-600 transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Videos</h1>
        </div>

      </div>
    </div>
  );
} 