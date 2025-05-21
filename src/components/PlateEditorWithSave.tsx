// path: src/components/PlateEditorWithSave.tsx
'use client';

import { useState } from "react";
import { PlateEditor } from "@/components/PlateEditor";

export function PlateEditorWithSave({ initialMarkdown, slug }: { initialMarkdown: string, slug: string[] }) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    const res = await fetch('/api/update-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, markdown }),
    });
    setSaving(false);
    if (!res.ok) alert('Failed to save!');
    // Optionally: show success, refresh, etc.
    alert('Saved!');
  }

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
        <PlateEditor markdownString={markdown} setMarkdown={setMarkdown} />
      </div>
    </>
  );
}