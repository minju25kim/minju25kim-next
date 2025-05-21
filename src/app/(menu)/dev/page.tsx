import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

type SortOption = "latest" | "oldest";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const POSTS_PER_PAGE = 10;

export default async function DevPage({ searchParams }: PageProps) {
  // Await the searchParams
  const params = await searchParams;
  const sort = (params.sort as SortOption) || "latest";
  const page = Math.max(1, parseInt(params.page as string) || 1);

  const supabase = await createClient();

  // Get total count of posts
  const { count } = await supabase
    .from("dev")
    .select("*", { count: "exact", head: true });

  // Calculate total pages
  const totalPages = Math.ceil((count || 0) / POSTS_PER_PAGE);

  // Get paginated posts
  const { data: posts } = await supabase
    .from("dev")
    .select()
    .order("created_at", { ascending: sort === "oldest" })
    .range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1);

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            Dev Posts
          </h1>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <Link
              href={`/dev?sort=latest&page=${page}`}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                sort === "latest"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Latest
            </Link>
            <Link
              href={`/dev?sort=oldest&page=${page}`}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                sort === "oldest"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Oldest
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b dark:border-gray-700">
                <TableHead className="text-gray-800 dark:text-gray-200">
                  Title
                </TableHead>
                <TableHead className="w-[180px] text-gray-800 dark:text-gray-200">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts?.map((post) => (
                <TableRow
                  key={post.id}
                  className="border-b dark:border-gray-700"
                >
                  <TableCell>
                    <Link
                      href={`/dev/${post.slug}`}
                      className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-gray-500 dark:text-gray-400">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {!posts?.length && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No posts found
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Link
              href={`/dev?sort=${sort}&page=${Math.max(1, page - 1)}`}
              className={`inline-flex items-center justify-center rounded-md transition-colors h-10 w-10 ${
                page === 1
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Previous page</span>
            </Link>
            <span className="px-4 py-2 text-gray-800 dark:text-gray-200">
              Page {page} of {totalPages}
            </span>
            <Link
              href={`/dev?sort=${sort}&page=${Math.min(totalPages, page + 1)}`}
              className={`inline-flex items-center justify-center rounded-md transition-colors h-10 w-10 ${
                page === totalPages
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              <ArrowRight className="h-5 w-5" />
              <span className="sr-only">Next page</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
