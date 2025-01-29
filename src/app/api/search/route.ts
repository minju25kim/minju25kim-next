import { NextRequest, NextResponse } from 'next/server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  try {
    // const { searchParams } = new URL(request.url);
    const query = req.nextUrl.searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    const searchResults = await searchContents(query);

    return NextResponse.json(searchResults, { status: 200 });
  } catch (error) {
    console.error("Error handling search request:", error);
    return NextResponse.json(
      { error: "Failed to handle search request" },
      { status: 500 }
    );
  }
}

async function searchContents(query: string) {
  console.log(query)
  try {
    const response = await fetch(`${backendUrl}/search?q=${query}`);
    if (!response.ok) {
      throw new Error("Failed to fetch content");
    }
    const results = await response.json();
    return results;
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
}