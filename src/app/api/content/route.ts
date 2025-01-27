// NextRequest,
import { NextResponse } from "next/server";
// import { getContentById } from "@/lib/api";
import { Content } from "@/interfaces/Data";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
// req: NextRequest
export async function GET() {
    try {
        const contents = await getAllContent();
        return NextResponse.json(contents, { status: 200 });
    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

async function getAllContent(): Promise<Content[]> {
    try {
        const response = await fetch(`${backendUrl}/content`);
        if (!response.ok) {
            throw new Error(`Error fetching contents: ${response.statusText}`);
        }

        const posts: Content[] = await response.json();
        return posts.sort((post1, post2) => {
            const date1 = new Date(post1.date);
            const date2 = new Date(post2.date);
            return date2.getTime() - date1.getTime();
        });
    } catch (error) {
        console.error("Error fetching contents:", error);
        return [];
    }
}
