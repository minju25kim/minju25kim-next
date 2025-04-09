import { Pagination } from "@/components/ui/pagination";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const POSTS_PER_PAGE = 10;

type SortOption = 'latest' | 'oldest';

// Helper function to format date
function formatDate(dateStr: string | Date | undefined): string {
  if (!dateStr) return 'No date';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return 'Invalid date';
  }
}

async function getDevPosts(page: number = 1, sort: SortOption = 'latest') {
  try {
    const client = await clientPromise;
    const db = client.db("minju25kim");
    
    // Get total count for pagination
    const totalPosts = await db.collection("dev").countDocuments();
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    
    // Get paginated posts using the date field
    const posts = await db.collection("dev")
      .find({})
      .sort({ date: sort === 'latest' ? -1 : 1 })
      .skip((page - 1) * POSTS_PER_PAGE)
      .limit(POSTS_PER_PAGE)
      .toArray();

    return {
      status: 'success',
      data: {
        posts,
        pagination: {
          totalPosts,
          totalPages,
          currentPage: page,
          postsPerPage: POSTS_PER_PAGE
        }
      }
    };
  } catch (_) {
    console.error("Error fetching dev posts");
    return {
      status: 'error',
      error: 'Failed to fetch dev posts',
      data: {
        posts: [],
        pagination: {
          totalPosts: 0,
          totalPages: 0,
          currentPage: page,
          postsPerPage: POSTS_PER_PAGE
        }
      }
    };
  }
}

function SortSwitcher({ 
  currentSort, 
  currentPage 
}: { 
  currentSort: SortOption;
  currentPage: number;
}) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
      <Link
        href={`/dev?sort=latest&page=${currentPage}`}
        className={`px-3 py-1.5 rounded-md transition-colors ${
          currentSort === 'latest' 
            ? 'bg-white shadow-sm' 
            : 'hover:bg-gray-200'
        }`}
      >
        Latest
      </Link>
      <Link
        href={`/dev?sort=oldest&page=${currentPage}`}
        className={`px-3 py-1.5 rounded-md transition-colors ${
          currentSort === 'oldest' 
            ? 'bg-white shadow-sm' 
            : 'hover:bg-gray-200'
        }`}
      >
        Oldest
      </Link>
    </div>
  );
}

interface DevPost {
  _id: string;
  title: string;
  date: string;
  category?: string;
  tags?: string[];
}

export default async function DevPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Safely access search parameters with default values
  const params = await Promise.resolve(searchParams);
  let currentPage = 1;
  let sort: SortOption = 'latest';

  try {
    if (params) {
      // Handle page parameter
      const pageParam = params.page;
      if (typeof pageParam === 'string') {
        const parsedPage = parseInt(pageParam, 10);
        if (!isNaN(parsedPage)) {
          currentPage = Math.max(1, parsedPage);
        }
      }

      // Handle sort parameter
      const sortParam = params.sort;
      if (typeof sortParam === 'string') {
        sort = sortParam === 'oldest' ? 'oldest' : 'latest';
      }
    }
  } catch (error) {
    console.error('Error parsing search parameters:', error);
  }

  // Get the result with the validated parameters
  const result = await getDevPosts(currentPage, sort);

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
          <h1 className="text-4xl font-bold">Dev Posts</h1>
        </div>

        <div className="flex justify-end mb-6">
          <SortSwitcher 
            currentSort={sort} 
            currentPage={currentPage} 
          />
        </div>

        {result.status === 'error' ? (
          <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md">
            Error: {result.error}
          </div>
        ) : (
          <>
            <div className="rounded-md border mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="w-[180px]">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.data.posts.map((post: DevPost) => (
                    <TableRow key={post._id}>
                      <TableCell className="font-medium">
                        <div>
                          <Link 
                            href={`/dev/${post.title.toLowerCase().replace(/\s+/g, '_')}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {post.title}
                          </Link>
                          {post.category && (
                            <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                              {post.category}
                            </span>
                          )}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {post.tags.map((tag: string) => (
                              <span 
                                key={tag}
                                className="px-2 py-0.5 bg-gray-50 rounded-full text-xs text-gray-500"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {formatDate(post.date)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Pagination 
              currentPage={result.data.pagination.currentPage}
              totalPages={result.data.pagination.totalPages}
              baseUrl="/dev"
              additionalParams={{ sort }}
            />
          </>
        )}
      </div>
    </div>
  );
} 