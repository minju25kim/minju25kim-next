'use client'

import { Plate } from '@udecode/plate/react';
import { useCreateEditor } from '@/components/editor/use-create-editor';

import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MarkdownPlugin } from '@udecode/plate-markdown';
import { useEditorValueStore } from '@/store/editorValue';

export const PlateEditor = ({ initialMarkdown }: { initialMarkdown: string }) => {
    const { setEditorValue } = useEditorValueStore();

    const editor = useCreateEditor({
        value: (editor) => editor.getApi(MarkdownPlugin).markdown.deserialize(initialMarkdown),
    });

    return (
        <div className="border border-gray-200 rounded-lg">
            <DndProvider backend={HTML5Backend}>
                <Plate editor={editor} onChange={(value) => {
                    const markdown = editor.getApi(MarkdownPlugin).markdown.serialize(value);
                    setEditorValue(markdown);
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