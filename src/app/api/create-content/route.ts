import { createClient } from "@/utils/supabase/server";

// API route to create a new content row in Supabase, matching PlateEditorCreate.tsx POST body
export async function POST(request: Request) {
  const body = await request.json();
  const { category, title, slug, markdown } = body;

  if (!category || !title || !slug || !markdown) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = await createClient();

  // Table name is category (e.g., "blog" or "dev")
  const { data, error } = await supabase
    .from(category)
    .insert([
      {
        title,
        slug,
        content: markdown,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating content:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
