import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const allowedTables = ["blog", "dev"];
  if (!category || !allowedTables.includes(category)) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid category parameter" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { data, error } = await supabase
    .from(category)
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contents:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch contents" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(JSON.stringify(data || []), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
