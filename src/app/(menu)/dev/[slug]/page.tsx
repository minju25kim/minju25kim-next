import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

import { createClient } from "@/utils/supabase/server";
import NextImage from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DevPost({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();

  // Fetch the dev post by slug
  const { data: post } = await supabase
    .from("dev")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  // If post doesn't exist, return 404
  if (!post) {
    notFound();
  }

  const components: Partial<Components> = {
    p: ({ children, node, ...props }) => {
      // Check if the paragraph contains only an image
      const hasOnlyImage =
        node?.children?.length === 1 &&
        "tagName" in (node?.children[0] ?? {}) &&
        (node?.children[0] as { tagName?: string })?.tagName === "img";

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
    img: ({ src, alt }) => {
      if (!src) return null;

      return (
        <span className="block my-4">
          <div className="relative w-full aspect-video">
            <NextImage
              src={src}
              alt={alt || ""}
              fill
              className="rounded-lg shadow-lg object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </div>
          {alt && (
            <span className="block text-center text-sm text-gray-500 mt-2">
              {alt}
            </span>
          )}
        </span>
      );
    },
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
      <blockquote
        className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4"
        {...props}
      >
        {children}
      </blockquote>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"
        {...props}
      >
        {children}
      </pre>
    ),
    code: ({ children, ...props }) => (
      <code
        className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    ),
  };

  return (
    <div className="mt-16 min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dev"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 inline-block"
        >
          ← Back to dev posts
        </Link>

        <article className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {post.title}
          </h1>

          <div className="text-gray-500 dark:text-gray-400 mb-8">
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="text-gray-800 dark:text-gray-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
