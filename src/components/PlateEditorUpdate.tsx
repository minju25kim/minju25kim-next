"use client";

import * as React from "react";
import {useState } from "react";

import { BlockquoteElement } from "@/components/ui/blockquote-element";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { FixedToolbar } from "@/components/ui/fixed-toolbar";
import { HeadingElement } from "@/components/ui/heading-element";
import { MarkToolbarButton } from "@/components/ui/mark-toolbar-button";
import { ParagraphElement } from "@/components/ui/paragraph-element";
import { ToolbarButton } from "@/components/ui/toolbar";
import { BasicElementsPlugin } from "@udecode/plate-basic-elements/react";
import { BasicMarksPlugin } from "@udecode/plate-basic-marks/react";
import {
  Plate,
  type PlateElementProps,
  PlateLeaf,
  type PlateLeafProps,
  usePlateEditor,
} from "@udecode/plate/react";

import { MarkdownPlugin } from '@udecode/plate-markdown';

export function PlateEditorWithSave({ initialMarkdown, slug }: { initialMarkdown: string, slug: string[] }) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/update-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, markdown }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${res.status}`);
      }
      
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert(`Failed to save: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  }

  const editor = usePlateEditor({
    components: {
      blockquote: BlockquoteElement,
      p: ParagraphElement,
      bold: function Bold(props: PlateLeafProps) {
        return <PlateLeaf {...props} as="strong" />;
      },
      h1: function H1(props: PlateElementProps) {
        return <HeadingElement {...props} variant="h1" />;
      },
      h2: function H2(props: PlateElementProps) {
        return <HeadingElement {...props} variant="h2" />;
      },
      h3: function H3(props: PlateElementProps) {
        return <HeadingElement {...props} variant="h3" />;
      },
      italic: function Italic(props: PlateLeafProps) {
        return <PlateLeaf {...props} as="em" />;
      },
      underline: function Underline(props: PlateLeafProps) {
        return <PlateLeaf {...props} as="u" />;
      },
    },
    plugins: [
      BasicElementsPlugin,
      BasicMarksPlugin,
      MarkdownPlugin,
    ],
    value: (editor) => editor.getApi(MarkdownPlugin).markdown.deserialize(initialMarkdown),
  });

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save"}
      </button>
      <div className="border border-gray-300 rounded-lg">
        <Plate
          editor={editor}
          onChange={({ editor }) => {
            const markdownOutput = editor.api.markdown.serialize();
            setMarkdown(markdownOutput);
          }}
        >
          <FixedToolbar className="flex justify-start gap-1 rounded-t-lg">
            <ToolbarButton onClick={() => editor.tf.toggleBlock("h1")}>
              H1
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.tf.toggleBlock("h2")}>
              H2
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.tf.toggleBlock("h3")}>
              H3
            </ToolbarButton>

            <ToolbarButton onClick={() => editor.tf.toggleBlock("blockquote")}>
              Quote
            </ToolbarButton>

            <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">
              B
            </MarkToolbarButton>
            <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">
              I
            </MarkToolbarButton>
            <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">
              U
            </MarkToolbarButton>
          </FixedToolbar>

          <EditorContainer>
            <Editor placeholder="Type your amazing content here..." />
          </EditorContainer>
        </Plate>
      </div>
    </>
  );
}