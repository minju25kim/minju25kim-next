import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { Components } from 'react-markdown';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface CustomComponents extends Components {
  img?: React.ComponentType<any>;
  h2?: React.ComponentType<any>;
  p?: React.ComponentType<any>;
  strong?: React.ComponentType<any>;
  blockquote?: React.ComponentType<any>;
}

export default async function BlogPost({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  // Fetch the blog post by slug
  const { data: post } = await supabase
    .from('blog')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  // If post doesn't exist, return 404
  if (!post) {
    notFound();
  }

  const components: CustomComponents = {
    p: ({ children, node, ...props }) => {
      // Check if the paragraph contains only an image
      const hasOnlyImage = node?.children?.length === 1 && node?.children[0].type === 'element' && node?.children[0].tagName === 'img';
      
      if (hasOnlyImage) {
        // Return the children directly without the paragraph wrapper
        return <>{children}</>;
      }
      
      return (
        <p className="my-4 leading-relaxed" {...props}>
          {children}
        </p>
      );
    },
    img: ({ alt, src, ...props }) => (
      <span className="block my-4">
        <img
          src={src}
          alt={alt || ''}
          className="rounded-lg shadow-lg max-w-full h-auto"
          {...props}
        />
        {alt && (
          <span className="block text-center text-sm text-gray-500 mt-2">
            {alt}
          </span>
        )}
      </span>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4" {...props}>
        {children}
      </h2>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-bold" {...props}>
        {children}
      </strong>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4" {...props}>
        {children}
      </blockquote>
    ),
  };

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 inline-block"
        >
          ← Back to blog
        </Link>
        
        <article className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {post.title}
          </h1>
          
          <div className="text-gray-500 dark:text-gray-400 mb-8">
            {new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>

          <div className="text-gray-800 dark:text-gray-200">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
} 