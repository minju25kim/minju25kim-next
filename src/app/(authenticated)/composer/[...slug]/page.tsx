// import { PlateEditorWithSave } from "@/components/PlateEditorUpdate";
import { createClient } from '@/utils/supabase/server';
import { PlateEditorComponent } from '@/components/PlateEditorEdit';

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
  const published = typeof RawData?.[0]?.published === 'boolean' ? RawData[0].published : false;
;
  return (

    <div className="max-w-3xl mx-auto pt-16 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">OG title: {title}</h1>
      <p>createdAt: {createdAt?.toLocaleString()}</p>
      <p>updatedAt: {updatedAt?.toLocaleString()}</p>
      <PlateEditorComponent
        mode="edit"
        initialMarkdown={markdown}
        initialTitle={title}
        initialSlug={slug}
        initialCategory={category as 'blog' | 'dev'}
        initialPublished={published}
      />
    </div>
  );
}
