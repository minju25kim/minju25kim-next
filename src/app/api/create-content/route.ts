import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();
  const { category, title, slug, published, value } = body;

  if (!category || !title || !slug || typeof value !== 'object' || value === null) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
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
    .insert([
      {
        title,
        slug,
        value,
        published,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating content:", error);
    return new Response(JSON.stringify({ error: "Failed to create content" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
