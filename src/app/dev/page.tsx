import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SortOption = 'latest' | 'oldest';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const POSTS_PER_PAGE = 10;

export default async function DevPage({ searchParams }: PageProps) {
  // Await the searchParams
  const params = await searchParams;
  const sort = (params.sort as SortOption) || 'latest';
  const page = Math.max(1, parseInt(params.page as string) || 1);
  
  const supabase = await createClient();
  
  // Get total count of posts
  const { count } = await supabase
    .from('dev')
    .select('*', { count: 'exact', head: true });

  // Calculate total pages
  const totalPages = Math.ceil((count || 0) / POSTS_PER_PAGE);
  
  // Get paginated posts
  const { data: posts } = await supabase
    .from('dev')
    .select()
    .order('created_at', { ascending: sort === 'oldest' })
    .range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-gray-600 hover:text-blue-600 transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">Dev Posts</h1>
          
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <Link
              href={`/dev?sort=latest&page=${page}`}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                sort === 'latest'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-gray-200'
              }`}
            >
              Latest
            </Link>
            <Link
              href={`/dev?sort=oldest&page=${page}`}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                sort === 'oldest'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-gray-200'
              }`}
            >
              Oldest
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="w-[180px]">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts?.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Link
                      href={`/dev/${post.slug}`}
                      className="hover:text-blue-600 transition-colors font-medium"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {!posts?.length && (
          <div className="text-center text-gray-500 mt-8">
            No posts found
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <Link
              href={`/dev?sort=${sort}&page=${Math.max(1, page - 1)}`}
              className={`px-4 py-2 rounded-md transition-colors ${
                page === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Previous
            </Link>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <Link
              href={`/dev?sort=${sort}&page=${Math.min(totalPages, page + 1)}`}
              className={`px-4 py-2 rounded-md transition-colors ${
                page === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Next
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 