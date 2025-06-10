'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlateEditor } from './PlateEditor';
import { Button } from '@/components/ui/button';

// Utility to convert string to kebab-case
function toKebabCase(str: string) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphen
        .replace(/^-+|-+$/g, '')     // trim hyphens from start/end
        .replace(/-{2,}/g, '-');     // collapse multiple hyphens
}

type PlateEditorComponentProps = {
    initialMarkdown?: string;
    initialTitle?: string;
    initialSlug?: string;
    initialCategory?: 'blog' | 'dev';
    initialPublished?: boolean;
};

export const PlateEditorComponent = ({
    initialMarkdown = '',
    initialTitle = '',
    initialSlug = '',
    initialCategory = 'blog',
    initialPublished = false,
}: Omit<PlateEditorComponentProps, 'mode'>) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState(initialTitle);
    const [category, setCategory] = useState<'blog' | 'dev'>(initialCategory);
    const [slug, setSlug] = useState(initialSlug);
    const [published, setPublished] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setPublished(typeof initialPublished === 'boolean' ? initialPublished : false);
    }, [initialMarkdown, initialPublished]);

    useEffect(() => {
        setSlug(toKebabCase(title));
    }, [title]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value as 'blog' | 'dev');
    };

    const handlePublishedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublished(e.target.checked);
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);
        if (!title || !category || !slug) {
            setError('All fields are required.');
            setIsLoading(false);
            return;
        }
        try {
            const res = await fetch('/api/update-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldCategory: initialCategory,
                    oldSlug: initialSlug,
                    title,
                    slug,
                    markdown: initialMarkdown,
                    category,
                    published,
                }),
            });
            const data: unknown = await res.json();
            if (!res.ok) {
                const errorMsg = typeof data === 'object' && data !== null && 'error' in data ? (data as { error: string }).error : 'Failed to update content.';
                setError(errorMsg);
            } else {
                alert('Content updated! Moving to the updated page.');
                if (published) {
                    router.push(`/${category}/${slug}`);
                } else {
                    router.refresh();
                }
            }
        } catch {
            setError('Network error.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/delete-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category: initialCategory,
                    slug: initialSlug,
                }),
            });
            const data: unknown = await res.json();
            if (!res.ok) {
                const errorMsg = typeof data === 'object' && data !== null && 'error' in data ? (data as { error: string }).error : 'Failed to delete content.';
                setError(errorMsg);
            } else {
                alert('Content deleted.');
                router.push('/composer');
            }
        } catch {
            setError('Network error.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Edit Content</h1>
            <div className="flex gap-4 items-center">
                <span>Category:</span>
                <label className="flex items-center gap-1">
                    <input
                        type="radio"
                        name="category"
                        value="blog"
                        checked={category === 'blog'}
                        onChange={handleCategoryChange}
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                    disabled={isLoading}
                    className="accent-blue-600 w-5 h-5"
                />
                <span className="text-sm text-gray-500">Toggle to publish/unpublish</span>
            </div>
            <input
                className="border border-gray-300 rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
                disabled={isLoading}
            />
            <input
                className="border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                placeholder="Slug (auto-generated)"
                value={slug}
                readOnly
                disabled
            />
            <PlateEditor initialMarkdown={initialMarkdown} />
            <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isLoading}
                >
                    {isLoading ? 'Deleting...' : 'Delete'}
                </Button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
};