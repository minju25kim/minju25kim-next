import { PlateEditorWithSave } from "@/components/PlateEditorWithSave";
import { createClient } from '@/utils/supabase/server';

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const supabase = await createClient();
  const resolvedParams = await params;

  const [category, slug] = resolvedParams.slug || [];

  if (!category || !slug) {
    return <div>No category or slug</div>
  }

  const { data: RawData } = await supabase.from(category).select('*').eq('slug', slug);

  const initialMarkdown = RawData?.[0]?.content;
  const title = RawData?.[0]?.title;
  const createdAt = RawData?.[0]?.created_at;
  const updatedAt = RawData?.[0]?.updated_at;

  return (
    <div className="max-w-3xl mx-auto my-12 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500 ">Created: {createdAt}</p>
      <p className="text-sm text-gray-500 ">Updated: {updatedAt}</p>
      <PlateEditorWithSave
        initialMarkdown={initialMarkdown}
        slug={[category, slug]}
      />
    </div>
  );
}
