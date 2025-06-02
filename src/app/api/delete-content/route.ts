import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { category, slug } = body;

  const supabase = await createClient();

  const { error } = await supabase
    .from(category)
    .delete()
    .eq('slug', slug);

  if (error) {
    console.error('Error deleting content:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
console.log('Content deleted')
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
} 