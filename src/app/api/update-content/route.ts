import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { category, oldSlug, title, slug, markdown, value, published } = body;


  if (!category || typeof category !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing or invalid category (table name)' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const supabase = await createClient();

  const updateObj: Record<string, any> = {
    title,
    slug,
    updated_at: new Date().toISOString(),
  };
  if (typeof published === 'boolean') updateObj.published = published;
  if (typeof markdown !== 'undefined') updateObj.content = markdown;
  if (typeof value !== 'undefined') updateObj.value = value;

  const { data, error } = await supabase
    .from(category)
    .update(updateObj)
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
