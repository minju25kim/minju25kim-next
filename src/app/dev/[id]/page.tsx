import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllContentsDirectory, getContentById } from "@/lib/api";
import { PostHeader } from "@/components/AppComponents/PostHeader";
import { PostBody } from "@/components/AppComponents/PostBody";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = await getContentById(params.id);

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
  try {
    const posts = await getAllContentsDirectory("dev");
    return posts.map((post) => ({
      id: post._id,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function Page(props: Params) {
  const params = await props.params;
  const post = await getContentById(params.id);

  if (!post) {
    return notFound();
  }


  return (
    <>
      <PostHeader
        author={post.author}
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        keywords={post.keywords}
      />
      <PostBody content={post.content} />
    </>
  );
}

export default Page;