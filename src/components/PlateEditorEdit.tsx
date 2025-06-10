'use client'

import { useQuery } from '@tanstack/react-query';
import { PlateEditorValue } from '@/components/PlateEditorValue';
import { PlateEditorMarkdown } from './PlateEditorMarkdown';

export const PlateEditorEdit = ({ slug, category }: { slug: string, category: string }) => {

    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: ['editor-content', category, slug],
        queryFn: async () => {
            if (!category || !slug) throw new Error('Missing category or slug');
            const res = await fetch(`/api/get-editor-content?category=${encodeURIComponent(category)}&slug=${encodeURIComponent(slug)}`);
            if (!res.ok) throw new Error('Failed to fetch content');
            return res.json();
        },
        enabled: !!category && !!slug,
    });


    if (isLoading || isFetching) {
        return <div className="max-w-3xl mx-auto pt-16">Loading editor content...</div>;
    }
    if (error) {
        return <div className="max-w-3xl mx-auto pt-16 text-red-500">Error: {(error as Error).message}</div>;
    }
    if (!data) {
        return <div className="max-w-3xl mx-auto pt-16">No content found.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Edit Content</h1>

            {/* Meta Data Section */}
            <div className="bg-muted rounded-lg p-4 flex flex-col gap-2 border">
                <div className="flex flex-col gap-2">
                    <div>
                        <span className="font-semibold">Title:</span> {data.title || 'N/A'}
                    </div>
                    <div>
                        <span className="font-semibold">Author ID:</span> {data.author_id || 'N/A'}
                    </div>
                    <div>
                        <span className="font-semibold">Slug:</span> {data.slug || 'N/A'}
                    </div>
                    <div>
                        <span className="font-semibold">Category:</span> {category || 'N/A'}
                    </div>
                    <div>
                        <span className="font-semibold">Published:</span> {typeof data.published === 'boolean' ? (
                            <span className={`ml-1 px-2 py-0.5 rounded text-xs font-medium ${data.published ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                                {data.published ? 'Yes' : 'No'}
                            </span>
                        ) : 'N/A'}
                    </div>
                    <div>
                        <span className="font-semibold">Created:</span> {data.created_at ? new Date(data.created_at).toLocaleString() : 'N/A'}
                    </div>
                    <div>
                        <span className="font-semibold">Updated:</span> {data.updated_at ? new Date(data.updated_at).toLocaleString() : 'N/A'}
                    </div>
                    {data.cover_image_url && (
                        <div className="flex flex-col gap-1 mt-2">
                            <span className="font-semibold">Cover Image:</span>
                            <img src={data.cover_image_url} alt="Cover" className="w-32 h-20 object-cover rounded border" />
                        </div>
                    )}
                </div>
            </div>

            {data.value && <PlateEditorValue data={data} value={data.value} category={category} slug={slug} />}
            {data.content && <PlateEditorMarkdown markdown={data.content} data={data} category={category} slug={slug} />}
        </div>
    );
};