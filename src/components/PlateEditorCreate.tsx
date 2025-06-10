'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlateEditor } from './PlateEditor';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { Value } from '@udecode/plate';

function toKebabCase(str: string) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-{2,}/g, '-');
}

export const PlateEditorCreate = () => {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<'blog' | 'dev'>('blog');
    const [slug, setSlug] = useState('');
    const [published, setPublished] = useState(false);
    const [value, setValue] = useState<Value>([]);

    const mutation = useMutation({
        mutationFn: async (payload: { category: string; title: string; slug: string; published: boolean; value: Value }) => {
            const res = await fetch('/api/create-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create content.');
            }
            return res.json();
        },
        onSuccess: (data) => {
            alert('Content created! Moving to the new page.');
            if (published) {
                router.push(`/${category}/${slug}`);
            } else {
                router.refresh();
            }
        },
        onError: (error: any) => {
            setError(error.message);
        },
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(toKebabCase(newTitle));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value as 'blog' | 'dev');
    };

    const handlePublishedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublished(e.target.checked);
    };

    const handleContentChange = (newValue: Value) => {
        setValue(newValue);
    };

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Create Contents</h1>
            <div className="flex gap-4 items-center">
                <span>Category:</span>
                <label className="flex items-center gap-1">
                    <input
                        type="radio"
                        name="category"
                        value="blog"
                        checked={category === 'blog'}
                        onChange={handleCategoryChange}
                        disabled={mutation.isPending}
                    />
                    Blog
                </label>
                <label className="flex items-center gap-1">
                    <input
                        type="radio"
                        name="category"
                        value="dev"
                        checked={category === 'dev'}
                        onChange={handleCategoryChange}
                        disabled={mutation.isPending}
                    />
                    Dev
                </label>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="published-switch" className="font-medium">Published:</label>
                <input
                    id="published-switch"
                    type="checkbox"
                    checked={published}
                    onChange={handlePublishedChange}
                    disabled={mutation.isPending}
                    className="accent-blue-600 w-5 h-5"
                />
                <span className="text-sm text-gray-500">Set published status before saving</span>
            </div>
            <input
                className="border border-gray-300 rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
                disabled={mutation.isPending}
            />
            <input
                className="border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                placeholder="Slug (auto-generated)"
                value={slug}
                readOnly
                disabled
            />
            <PlateEditor onContentChange={handleContentChange} />
            <div className="flex gap-2">
                <Button onClick={() => mutation.mutate({ category, title, slug, published, value })} disabled={mutation.isPending}>
                    {mutation.isPending ? 'Saving...' : 'Save'}
                </Button>
            </div>
            {mutation.isError && <div className="text-red-500">{mutation.error.message}</div>}
        </div>
    );
};
