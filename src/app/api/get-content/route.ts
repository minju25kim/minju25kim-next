import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');
  
    if (!category || !slug) {
      return new Response(JSON.stringify({ error: "Missing required query parameters: category and slug" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    const allowedTables = ['blog', 'dev'];
    if (!allowedTables.includes(category)) {
      return new Response(JSON.stringify({ error: "Invalid category" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    const { data, error } = await supabase
      .from(category)
      .select('')
      .eq('slug', slug)
      .eq('published', true)
      .single();
  
    if (error) {
      console.error("Error fetching content:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch content" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    if (!data) {
      return new Response(JSON.stringify({ error: "Content not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
