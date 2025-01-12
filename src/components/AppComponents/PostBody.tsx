type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} className="prose lg:prose-lg max-w-full" />
  );
}