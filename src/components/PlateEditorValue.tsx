'use client'

import { Plate } from '@udecode/plate/react';
import { useCreateEditor } from '@/components/editor/use-create-editor';

import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Value } from '@udecode/plate';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const PlateEditorValue = ({ value: initialValue, data, category, slug:oldSlug }: { value: Value, data: any, category: string, slug: string }) => {
    const router = useRouter();
    const [title, setTitle] = useState(data.title || '');
    const [published, setPublished] = useState(!!data.published);
    const [slug, setSlug] = useState(oldSlug || '');
    const [editorValue, setEditorValue] = useState<Value>(initialValue);
    const [saved, setSaved] = useState(false);

    // Sync state with new data if it changes
    useEffect(() => {
        setTitle(data.title || '');
        setPublished(!!data.published);
        setSlug(data.slug || '');
        setEditorValue(initialValue);
    }, [data, initialValue]);
    
    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch('/api/update-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category,   
                    oldSlug: oldSlug,
                    title,
                    slug,
                    published,
                    value: editorValue
                })
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to update content.');
            }
            return res.json();
        },
        onSuccess: () => {
            setSaved(true);
            if (published) {
                router.push(`/${category}/${slug}`);
            } else {
                router.push(`/composer`);
            }
        },
        onError: () => {
            setSaved(false);
        }
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch('/api/delete-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category,
                    slug: oldSlug
                })
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete content.');
            }
            return res.json();
        },
        onSuccess: () => {
            // Redirect to category root or another suitable page
            router.push(`/composer`);
        }
    });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <input
                    className="border border-gray-300 rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    disabled={mutation.isPending || deleteMutation.isPending}
                />
                <input
                    className="border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    placeholder="Slug"
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    disabled={mutation.isPending || deleteMutation.isPending}
                />
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={e => setPublished(e.target.checked)}
                        disabled={mutation.isPending || deleteMutation.isPending}
                        className="accent-blue-600 w-5 h-5"
                    />
                    <span>Published</span>
                </label>
            </div>
            <div className="border border-gray-200 rounded-lg">
                <DndProvider backend={HTML5Backend}>
                    <Plate editor={useCreateEditor({ value: editorValue })} onChange={editor => setEditorValue(editor.value)}>
                        <EditorContainer>
                            <Editor />
                        </EditorContainer>
                        <SettingsDialog />
                    </Plate>
                </DndProvider>
            </div>
            <div className="flex gap-2">
                <Button onClick={() => mutation.mutate()} disabled={mutation.isPending || deleteMutation.isPending}>
                    {mutation.isPending ? 'Saving...' : 'Save'}
                </Button>
                <Button 
                    variant="destructive" 
                    disabled={mutation.isPending || deleteMutation.isPending}
                    onClick={() => {
                        // TODO: Add confirmation dialog before deleting
                        deleteMutation.mutate();
                    }}
                >
                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </Button>
            </div>
            {mutation.isError && <div className="text-red-500">{mutation.error.message}</div>}
            {deleteMutation.isError && <div className="text-red-500">{deleteMutation.error.message}</div>}
            {saved && !published && <div className="text-green-600">Saved!</div>}
        </div>
    );
}