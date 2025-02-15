import markdownToHtml from "@/lib/markdownToHtml";

type Props = {
  content: string;
};

export async function PostBody({ content }: Props) {
  const postBody = await markdownToHtml(content || "");
  return (
    <div dangerouslySetInnerHTML={{ __html: postBody }} className="prose w-full" />
  );
}