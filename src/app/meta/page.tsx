import Link from 'next/link';
import clientPromise from '@/lib/mongodb';

async function getData() {
  try {
    const client = await clientPromise;
    console.log("🔄 Fetching data from MongoDB...");
    
    const db = client.db("minju25kim");

    // Get total posts count
    const totalPosts = await db.collection("dev").countDocuments();
    console.log(`📊 Found ${totalPosts} total posts`);

    // Get categories
    const categoryList = await db.collection("dev")
      .distinct("category");
    console.log(`📑 Found ${categoryList.length} categories`);

    // Get total views
    const totalViews = await db.collection("dev")
      .aggregate([
        { $group: { _id: null, total: { $sum: "$views" } } }
      ]).toArray();
    console.log(`👀 Total views: ${totalViews[0]?.total || 0}`);

    // Get recent posts
    const recentPosts = await db.collection("dev")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    console.log(`📝 Fetched ${recentPosts.length} recent posts`);

    // Get popular tags
    const tags = await db.collection("dev")
      .aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]).toArray();
    console.log(`🏷️ Found ${tags.length} tags`);

    console.log("✅ Successfully fetched all data");

    return {
      status: 'success',
      data: {
        totalPosts,
        categoryCount: categoryList.length,
        totalViews: totalViews[0]?.total || 0,
        recentPosts,
        categoryList,
        tags
      }
    };
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      data: {
        totalPosts: 0,
        categoryCount: 0,
        totalViews: 0,
        recentPosts: [],
        categoryList: [],
        tags: []
      }
    };
  }
}

export default async function MetaPage() {
  const result = await getData();

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
                result.data.recentPosts.map((post: any) => (
                  <div key={post._id} className="flex justify-between items-center">
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
                result.data.categoryList.map((category: string) => (
                  <span 
                    key={category}
                    className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
                  >
                    {category}
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
                result.data.tags.map((tag: any) => (
                  <span 
                    key={tag._id}
                    className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
                  >
                    {tag._id} ({tag.count})
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