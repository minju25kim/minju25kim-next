'use client'

import { PlateEditor } from './PlateEditor';

import { useEditorValueStore } from '@/store/editorValue';
import { Button } from '@/components/ui/button';

export const PlateEditorComponent = ({ initialMarkdown }: { initialMarkdown: string }) => {


    const { editorValue } = useEditorValueStore();
    console.log(editorValue);
    return (
        <div className="max-w-3xl mx-auto my-12 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Create Contents</h1>
            <PlateEditor initialMarkdown={initialMarkdown} />
            <Button>Save</Button>
        </div>
    );
}