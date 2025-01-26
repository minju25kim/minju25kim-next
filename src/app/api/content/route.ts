import { NextRequest, NextResponse } from "next/server";
import { getAllContent, getContentById } from "@/lib/api";

export async function GET(req: NextRequest) {
    try {
        // Parse the request URL and search parameters
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const requestType = req.headers.get("x-request-type");

        switch (requestType) {
            case "get-by-id":
                if (id) {
                    // Fetch content by ID
                    const content = await getContentById(id);
                    return NextResponse.json(content, { status: 200 });
                } else {
                    return NextResponse.json({ error: "ID is required" }, { status: 400 });
                }

            default:
                // Default to fetching all content
                const contents = await getAllContent();
                return NextResponse.json(contents, { status: 200 });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
