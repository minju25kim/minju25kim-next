'use client'

import { Plate } from '@udecode/plate/react';
import { useCreateEditor } from '@/components/editor/use-create-editor';

import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Value } from '@udecode/plate';

export const PlateEditor = ({ onContentChange }: { onContentChange: (val: Value) => void }) => {
    const editor = useCreateEditor();

    return (
        <div className="border border-gray-200 rounded-lg">
            <DndProvider backend={HTML5Backend}>
                <Plate editor={editor} onChange={(editor) => {
                    onContentChange(editor.value);
                }}>
                    <EditorContainer>
                        <Editor />
                    </EditorContainer>

                    <SettingsDialog />
                </Plate>
            </DndProvider>
        </div>
    )
}