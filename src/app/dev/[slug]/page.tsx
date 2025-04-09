import Link from 'next/link';
import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';

async function getPost(slug: string) {
  try {
    const client = await clientPromise;
    const db = client.db("minju25kim");
    
    // Convert slug back to title format and find the post
    const title = slug.replace(/_/g, ' ');
    const post = await db.collection("dev")
      .findOne({ 
        title: { 
          $regex: new RegExp(`^${title}$`, 'i') 
        } 
      });

    if (!post) {
      return null;
    }

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/dev" 
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            ← Back to posts
          </Link>
        </div>

        <article className="prose prose-lg max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-500">
              {post.date && (
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              {post.category && (
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  {post.category}
                </span>
              )}
            </div>
          </header>

          {post.content && (
            <div className="mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t">
              {post.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
} 