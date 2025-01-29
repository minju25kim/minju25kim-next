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
    const posts = await getAllContentsDirectory("terminology");
    return posts.map((post) => ({
      id: post._id,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Return an empty array or handle the error as needed
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
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        author={post.author}
        keywords={post.keywords}
        contentId={post._id}
      />
      <PostBody content={post.content} />
    </>
  );
}

export default Page;