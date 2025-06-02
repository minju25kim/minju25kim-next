// import { PlateEditorWithSave } from "@/components/PlateEditorUpdate";
import { createClient } from '@/utils/supabase/server';
import { PlateEditorComponent } from '@/components/PlateEditorComponent';

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const supabase = await createClient();
  const resolvedParams = await params;

  const [category, slug] = resolvedParams.slug || [];

  // if (!category || !slug) {
  //   // New content creation mode
  //   return <PlateEditorComponent initialMarkdown={''}/>;
  // }

  // Fetch existing content for edit mode
  const { data: RawData } = await supabase.from(category).select('*').eq('slug', slug);

  const markdown = RawData?.[0]?.content || '';
  const title = RawData?.[0]?.title || '';
  const createdAt = RawData?.[0]?.created_at;
  const updatedAt = RawData?.[0]?.updated_at;

  return (
    <PlateEditorComponent
      mode="edit"
      initialMarkdown={markdown}
      initialTitle={title}
      initialSlug={slug}
      initialCategory={category}
    />
  );
}
