'use client';

import { Plate } from '@udecode/plate/react';

import { Editor, EditorContainer } from '@/components/ui/editor';

import { MarkdownPlugin, remarkMdx, remarkMention } from '@udecode/plate-markdown';

import { withProps } from '@udecode/cn';
import { BasicElementsPlugin } from '@udecode/plate-basic-elements/react';
import {
    BasicMarksPlugin,
    BoldPlugin,
    ItalicPlugin,
    StrikethroughPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import {
    ParagraphPlugin,
    PlateElement,
    PlateLeaf,
    usePlateEditor,
} from '@udecode/plate/react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';


export function PlateReadOnlyEditor({ children }: { children: string }) {
    const editor = usePlateEditor({
        components: {
            blockquote: withProps(PlateElement, {
                as: 'blockquote',
                className: 'mb-4 border-l-4 border-[#d0d7de] pl-4 text-[#636c76]',
            }),
            [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
            h1: withProps(PlateElement, {
                as: 'h1',
                className:
                    'mb-4 mt-6 text-3xl font-semibold tracking-tight lg:text-4xl',
            }),
            h2: withProps(PlateElement, {
                as: 'h2',
                className: 'mb-4 mt-6 text-2xl font-semibold tracking-tight',
            }),
            h3: withProps(PlateElement, {
                as: 'h3',
                className: 'mb-4 mt-6 text-xl font-semibold tracking-tight',
            }),
            [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
            [ParagraphPlugin.key]: withProps(PlateElement, {
                as: 'p',
                className: 'mb-4',
            }),
            [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
            [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
        },
        plugins: [
            BasicElementsPlugin,
            BasicMarksPlugin,
            MarkdownPlugin.configure({
                options: {
                    remarkPlugins: [remarkMath, remarkGfm, remarkMdx, remarkMention],
                },
            }),
        ],
        value: (editor) => editor.getApi(MarkdownPlugin).markdown.deserialize(children),
    });

    return (
        <Plate editor={editor} readOnly>
            <EditorContainer>
                <Editor />
            </EditorContainer>
        </Plate>
    );
}
