import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const likes = await getLikes(id);
  console.log(likes)
  return NextResponse.json({ likes: likes, hasLiked: false });
}


export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const likes = await getLikes(id);
  console.log(likes)
  return NextResponse.json({ likes: likes, hasLiked: true });
}

async function getLikes(id: string | null) {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content/${id}/likes`);
  return 0;
}