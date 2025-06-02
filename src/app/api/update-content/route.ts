import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { oldCategory, oldSlug, title, slug, markdown } = body;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from(oldCategory)
    .update({
      title,
      slug,
      content: markdown,
      updated_at: new Date().toISOString(),
    })
    .eq('slug', oldSlug)
    .select();

  if (error) {
    console.error('Error updating content:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
