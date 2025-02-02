import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const contentId = req.nextUrl.searchParams.get('contentId');
    if (!contentId) {
        return NextResponse.json({ error: 'contentId is required' }, { status: 400 });
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content/${contentId}/view`, {
            method: 'POST',
        });
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error', message: error }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const contentId = req.nextUrl.searchParams.get('contentId');
    if (!contentId) {
        return NextResponse.json({ error: 'contentId is required' }, { status: 400 });
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content/${contentId}/views`);
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error', message: error }, { status: 500 });
    }
}          