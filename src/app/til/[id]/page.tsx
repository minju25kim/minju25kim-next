import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentById } from "@/lib/api";
import { PostHeader } from "@/components/AppComponents/PostHeader";
import { PostBody } from "@/components/AppComponents/PostBody";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const content = await getContentById(params.id);

  if (!content) {
    return notFound();
  }

  const title = `${content.title}`;

  return {
    title,
    openGraph: {
      title,
      images: [content.ogImage.url],
    },
    twitter: {
      card: 'summary_large_image',
      images: [content.ogImage.url],
    },
  };
}

// export async function generateStaticParams() {
//   try {
//     const posts = await getAllContentsDirectory("til");
//     return posts.map((post) => ({
//       id: post._id,
//     }));
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return [];
//   }
// }

async function Page(props: Params) {
  const params = await props.params;
  const content = await getContentById(params.id);

  if (!content || content.dir !== "til") {
    return notFound();
  }

  return (
    <>
      <PostHeader
        title={content.title}
        coverImage={content.coverImage}
        date={content.date}
        author={content.author}
        keywords={content.keywords}
        contentId={content._id}
      />
      <PostBody content={content.content} />
    </>
  );
}

export default Page;