import { PlateEditor } from "@/components/PlateEditor";
// import type { Value } from "@udecode/plate";

import { createClient } from '@/utils/supabase/server';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: devDataRaw } = await supabase.from('dev').select('*').eq('slug', resolvedParams.slug);

  const markdownString = devDataRaw?.[0]?.content
  const title = devDataRaw?.[0]?.title

  // export default async function Page() {
  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <p>This is the dev content editing page.</p>
      <PlateEditor markdownString={markdownString} />
    </div>
  );
}
