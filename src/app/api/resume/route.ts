import { NextResponse } from 'next/server';
import { Resume } from "@/interfaces";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET() {
    try {
        const results = await getAllResume()
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error("Error handling search request:", error);
        return NextResponse.json(
            { error: "Failed to handle search request" },
            { status: 500 }
        );
    }
}

async function getAllResume(): Promise<Resume[]> {
    try {
        const response = await fetch(`${backendUrl}/resume`);
        if (!response.ok) {
            throw new Error(`Error fetching all resume: ${response.statusText}`);
        }

        const resumes: Resume[] = await response.json();
        return resumes.sort((resume1, resume2) => {
            const date1 = new Date(resume1.meta.date);
            const date2 = new Date(resume2.meta.date);
            return date2.getTime() - date1.getTime();
        });
    } catch (error) {
        console.error("Error fetching contents:", error);
        return [];
    }
}

