import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostHeader } from "@/components/PostHeader";
import { PostBody } from "@/components/PostBody";
import AppBreadCrumb from "@/components/BreadCrumb";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug("terminology", params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;

  return {
    title,
    openGraph: {
      title,
      // images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts("terminology");

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function Page(props: Params) {
  const params = await props.params;
  const post = getPostBySlug("terminology", params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <>
      <AppBreadCrumb directory="terminology" slug={params.slug} />
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
      />
      <PostBody content={content} />
    </>
  );
}

export default Page;