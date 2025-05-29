'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { BasicElementsPlugin } from '@udecode/plate-basic-elements/react';
import { BasicMarksPlugin } from '@udecode/plate-basic-marks/react';
import {
  type PlateElementProps,
  type PlateLeafProps,
  Plate,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react';

import { BlockquoteElement } from '@/components/ui/blockquote-element';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { FixedToolbar } from '@/components/ui/fixed-toolbar';
import { HeadingElement } from '@/components/ui/heading-element';
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button';
import { ParagraphElement } from '@/components/ui/paragraph-element';
import { ToolbarButton } from '@/components/ui/toolbar'; // Generic toolbar button
import { MarkdownPlugin } from '@udecode/plate-markdown';

import { Value } from '@udecode/plate';


export function PlateEditorCreate({ initialValue }: { initialValue: Value }) {

  const [markdown, setMarkdown] = useState("");
  const [saving, setSaving] = useState(false);
  const [category, setCategory] = useState("blog");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();

  function toKebabCase(str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // replace non-alphanum with hyphen
      .replace(/^-+|-+$/g, '');    // trim leading/trailing hyphens
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/create-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown, category, title, slug }),
      });
      
      if (!res.ok) {
        throw new Error(`Failed to save: ${res.status} ${res.statusText}`);
      }
      
      router.push(`/${category}/${slug}`);
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save content. Please try again.');
    } finally {
      setSaving(false);
    }
  }


  const editor = usePlateEditor({
    components: {
      blockquote: BlockquoteElement,
      p: ParagraphElement,
      h1: (props: PlateElementProps) => <HeadingElement {...props} variant="h1" />,
      h2: (props: PlateElementProps) => <HeadingElement {...props} variant="h2" />,
      h3: (props: PlateElementProps) => <HeadingElement {...props} variant="h3" />,
      bold: (props: PlateLeafProps) => <PlateLeaf {...props} as="strong" />,
      italic: (props: PlateLeafProps) => <PlateLeaf {...props} as="em" />,
      underline: (props: PlateLeafProps) => <PlateLeaf {...props} as="u" />,
    },
    plugins: [BasicElementsPlugin, BasicMarksPlugin, MarkdownPlugin],
    value: initialValue,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 mb-2">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="category"
            value="dev"
            checked={category === "dev"}
            onChange={() => setCategory("dev")}
            className="accent-blue-500"
          />
          Dev
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="category"
            value="blog"
            checked={category === "blog"}
            onChange={() => setCategory("blog")}
            className="accent-blue-500"
          />
          Blog
        </label>
      </div>
      <input type="text" placeholder="Title" value={title}
        onChange={e => {
          const val = e.target.value;
          setTitle(val);
          setSlug(toKebabCase(val));
        }} className="border border-gray-200 rounded-md p-2" />
      <div className="border border-gray-200 rounded-md p-4">
        <Plate
          editor={editor}
          onChange={({ value, editor }) => {
            const markdownString = editor.getApi(MarkdownPlugin).markdown.serialize({ value });
            setMarkdown(markdownString);
          }}>
          <FixedToolbar className="flex justify-start gap-1 rounded-t-lg">
            {/* Element Toolbar Buttons */}
            <ToolbarButton onClick={() => editor.tf.toggleBlock('h1')}>H1</ToolbarButton>
            <ToolbarButton onClick={() => editor.tf.toggleBlock('h2')}>H2</ToolbarButton>
            <ToolbarButton onClick={() => editor.tf.toggleBlock('h3')}>H3</ToolbarButton>
            <ToolbarButton onClick={() => editor.tf.toggleBlock('blockquote')}>Quote</ToolbarButton>
            {/* Mark Toolbar Buttons */}
            <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">B</MarkToolbarButton>
            <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">I</MarkToolbarButton>
            <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">U</MarkToolbarButton>
          </FixedToolbar>
          <EditorContainer>
            <Editor placeholder="Type your amazing content here..." />
          </EditorContainer>

        </Plate>
      </div>
  const isValid = title.trim().length > 0;

  // Update the save button to use validation
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
    onClick={handleSave}
    disabled={saving || !isValid}
  >
    {saving ? "Saving..." : "Save"}
  </button>
}
