'use client'

import { Plate } from '@udecode/plate/react';
import { useCreateEditor } from '@/components/editor/use-create-editor';

import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MarkdownPlugin } from '@udecode/plate-markdown';

export const PlateEditorReadOnly = ({ initialMarkdown }: { initialMarkdown: string }) => {

    const editor = useCreateEditor({
        value: (editor) => editor.getApi(MarkdownPlugin).markdown.deserialize(initialMarkdown),
    });

    return (
        <div className="border border-gray-200 rounded-lg">
            <DndProvider backend={HTML5Backend}>
                <Plate editor={editor} readOnly>
                    <EditorContainer>
                        <Editor className='px-2 md:px-8'/>
                    </EditorContainer>

                    <SettingsDialog />
                </Plate>
            </DndProvider>
        </div>
    )
}