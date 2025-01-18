import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostsDirectory, getPostById } from "@/lib/api";
import { PostHeader } from "@/components/AppComponents/PostHeader";
import { PostBody } from "@/components/AppComponents/PostBody";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostById(params.id);

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPostsDirectory("terminology");

  return posts.map((post) => ({
    id: post._id,
  }));
}

async function Page(props: Params) {
  const params = await props.params;
  const post = await getPostById(params.id);

  if (!post) {
    return notFound();
  }


  return (
    <>
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
      />
      <PostBody content={post.content} />
    </>
  );
}

export default Page;