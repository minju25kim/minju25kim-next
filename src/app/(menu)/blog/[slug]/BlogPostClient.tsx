'use client';

import { PlateEditorReadOnlyMarkdown } from '@/components/PlateEditorReadOnlyMarkdown';
import { PlateEditorReadOnlyValue } from '@/components/PlateEditorReadOnlyValue';
import { useContentQuery } from '@/hooks/useContentQuery';

export default function BlogPostClient({ category, slug }: { category: string; slug: string }) {
  const { data, isLoading, isError, error } = useContentQuery(category, slug);

  if (isLoading) return <div className='max-w-3xl mx-auto pt-16 flex flex-col gap-4'>Loading...</div>;
  if (isError) return <div className='max-w-3xl mx-auto pt-16 flex flex-col gap-4 text-red-500'>{(error as Error).message}</div>;
  if (!data) return <div className='max-w-3xl mx-auto pt-16 flex flex-col gap-4'>No post found.</div>;

  return (
    <div className='max-w-3xl mx-auto pt-16 flex flex-col gap-4'>
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <div className="text-gray-500">
        {new Date(data.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <div className="text-gray-500">{data.author_id}</div>
      {data.content && <PlateEditorReadOnlyMarkdown initialMarkdown={data.content} />}
      {data.value && <PlateEditorReadOnlyValue initialValue={data.value} />}
    </div>
  );
} 