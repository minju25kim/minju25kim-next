import { Pagination } from "@/components/ui/pagination";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import { WithId, Document } from 'mongodb';

const POSTS_PER_PAGE = 12; // Changed to 12 for better grid layout (3x4)

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
  } catch {
    return 'Invalid date';
  }
}

interface VideoPost extends Document {
  title: string;
  date: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
}

type MongoDBVideoPost = WithId<VideoPost>;

async function getVideoPosts(page: number = 1, sort: SortOption = 'latest') {
  try {
    const client = await clientPromise;
    const db = client.db("minju25kim");
    
    // Get total count for pagination
    const totalPosts = await db.collection("video").countDocuments();
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    
    // Get paginated posts using the date field
    const posts = await db.collection("video")
      .find({})
      .sort({ date: sort === 'latest' ? -1 : 1 })
      .skip((page - 1) * POSTS_PER_PAGE)
      .limit(POSTS_PER_PAGE)
      .toArray() as MongoDBVideoPost[];

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
  } catch {
    console.error("Error fetching video posts");
    return {
      status: 'error',
      error: 'Failed to fetch video posts',
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
        href={`/video?sort=latest&page=${currentPage}`}
        className={`px-3 py-1.5 rounded-md transition-colors ${
          currentSort === 'latest' 
            ? 'bg-white shadow-sm' 
            : 'hover:bg-gray-200'
        }`}
      >
        Latest
      </Link>
      <Link
        href={`/video?sort=oldest&page=${currentPage}`}
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
  let sort: SortOption = 'latest';

  try {
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
  } catch (error) {
    console.error('Error parsing search parameters:', error);
  }

  // Get the result with the validated parameters
  const result = await getVideoPosts(currentPage, sort);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="text-gray-600 hover:text-blue-600 transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Videos</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {result.data.posts.map((post: MongoDBVideoPost) => (
                <Link 
                  key={post._id.toString()}
                  href={`/video/${post.title.toLowerCase().replace(/\s+/g, '_')}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-video">
                      {post.thumbnail ? (
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No thumbnail</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h2 className="font-medium text-lg group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-2">
                        <time className="text-sm text-gray-500">
                          {formatDate(post.date)}
                        </time>
                        {post.category && (
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                            {post.category}
                          </span>
                        )}
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Pagination 
              currentPage={result.data.pagination.currentPage}
              totalPages={result.data.pagination.totalPages}
              baseUrl="/video"
              additionalParams={{ sort }}
            />
          </>
        )}
      </div>
    </div>
  );
} 