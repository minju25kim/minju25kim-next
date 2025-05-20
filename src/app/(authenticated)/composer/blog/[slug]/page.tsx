import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

interface PageProps {
    params: { slug: string };
}

export default async function BlogEditPage({ params }: PageProps) {
    const supabase = await createClient();
    const { data: post } = await supabase
        .from('blog')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-xl mx-auto mt-12">
            <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
            <label className="font-medium">
                Title
                <input
                    className="block w-full border rounded p-2 mt-1"
                    type="text"
                    name="title"
                    defaultValue={post.title || ''}
                />
            </label>
            <label className="font-medium">
                Content
                <textarea
                    className="block w-full border rounded p-2 mt-1 min-h-[200px]"
                    name="content"
                    defaultValue={post.content || ''}
                />
            </label>
        </div>
    );
} 