import { PlateEditorEdit } from '@/components/PlateEditorEdit';

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;

  const [category, slug] = resolvedParams.slug || [];
  ;
  return (

    <div className="max-w-3xl mx-auto pt-16 flex flex-col gap-4">
      <PlateEditorEdit slug={slug} category={category} />
    </div>
  );
}
