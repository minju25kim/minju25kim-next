import Link from 'next/link';
import clientPromise from '@/lib/mongodb';
import { WithId, Document } from 'mongodb';

interface Post extends Document {
  title: string;
  createdAt: string;
}

type MongoDBPost = WithId<Post>;

interface CategoryCount {
  name: string;
  count: number;
}

interface TagCount {
  name: string;
  count: number;
}

interface MetaData {
  recentPosts: MongoDBPost[];
  totalPosts: number;
  categoryCount: number;
  totalViews: number;
  categoryList: { name: string; count: number }[];
  tags: { name: string; count: number }[];
}

interface MetaResponse {
  status: 'success' | 'error';
  error?: string;
  data: MetaData;
}

async function getMetaData(): Promise<MetaResponse> {
  try {
    const client = await clientPromise;
    const db = client.db("minju25kim");
    
    const recentPosts = await db.collection("meta")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray() as MongoDBPost[];

    // Get other metadata from your database
    const totalPosts = await db.collection("meta").countDocuments();
    const categoryCount = await db.collection("categories").countDocuments();
    const totalViews = 0; // Replace with actual view count logic
    
    // Get category list
    const categoryList = await db.collection("categories")
      .aggregate([
        { $group: { _id: "$name", count: { $sum: 1 } } },
        { $project: { name: "$_id", count: 1, _id: 0 } }
      ])
      .toArray() as CategoryCount[];

    // Get tags
    const tags = await db.collection("tags")
      .aggregate([
        { $group: { _id: "$name", count: { $sum: 1 } } },
        { $project: { name: "$_id", count: 1, _id: 0 } }
      ])
      .toArray() as TagCount[];

    return {
      status: 'success',
      data: {
        recentPosts,
        totalPosts,
        categoryCount,
        totalViews,
        categoryList,
        tags
      }
    };
  } catch {
    console.error("Error fetching meta data");
    return {
      status: 'error',
      error: 'Failed to fetch meta data',
      data: {
        recentPosts: [],
        totalPosts: 0,
        categoryCount: 0,
        totalViews: 0,
        categoryList: [],
        tags: []
      }
    };
  }
}

export default async function MetaPage() {
  const result = await getMetaData();

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
          {result.status === 'error' && (
            <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md">
              Connection Error: {result.error}
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Overview Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg text-gray-600 mb-2">Total Posts</h3>
              <p className="text-3xl font-bold">{result.data.totalPosts}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg text-gray-600 mb-2">Categories</h3>
              <p className="text-3xl font-bold">{result.data.categoryCount}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg text-gray-600 mb-2">Total Views</h3>
              <p className="text-3xl font-bold">{result.data.totalViews}</p>
            </div>
          </section>

          {/* Recent Posts */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
            <div className="space-y-4">
              {result.data.recentPosts.length > 0 ? (
                result.data.recentPosts.map((post: MongoDBPost) => (
                  <div key={post._id.toString()} className="flex justify-between items-center">
                    <span className="text-lg">{post.title}</span>
                    <span className="text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No posts yet</p>
              )}
            </div>
          </section>

          {/* Categories */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {result.data.categoryList.length > 0 ? (
                result.data.categoryList.map((category: { name: string; count: number }) => (
                  <span 
                    key={category.name}
                    className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
                  >
                    {category.name}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No categories yet</p>
              )}
            </div>
          </section>

          {/* Tags Cloud */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {result.data.tags.length > 0 ? (
                result.data.tags.map((tag: { name: string; count: number }) => (
                  <span 
                    key={tag.name}
                    className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
                  >
                    {tag.name} ({tag.count})
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No tags yet</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 