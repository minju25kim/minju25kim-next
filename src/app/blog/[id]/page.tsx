import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentById } from "@/lib/api";
import { PostHeader } from "@/components/AppComponents/PostHeader";
import { PostBody } from "@/components/AppComponents/PostBody";
import { PostImage } from "@/components/AppComponents/PostImage";
// import {Likes} from "@/components/AppComponents/Likes";

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

async function Page(props: Params) {
  const params = await props.params;
  const content = await getContentById(params.id);

  if (!content || content.dir !== "blog") {
    return notFound();
  }

  return (
    <>
      <PostHeader
        author={content.author}
        title={content.title}
        coverImage={content.coverImage}
        date={content.date}
        keywords={content.keywords}
        contentId={content._id}
      />
      <PostImage coverImage={content.coverImage} />
      <PostBody content={content.content} />
      {/* <Likes id={content._id} /> */}
    </>
  );
}

export default Page;