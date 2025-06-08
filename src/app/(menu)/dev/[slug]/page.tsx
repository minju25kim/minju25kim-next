import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlateEditorReadOnly } from "@/components/PlateEditorReadOnly";

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

   if (!post) {
    notFound();
  }

  if (!post.published) {
    notFound();
  }

  return (
    <div className="  min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dev"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 inline-block"
        >
          ← Back to dev posts
        </Link>

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
        <PlateEditorReadOnly initialMarkdown={post.content} />

      </div>
    </div>
  );
}
