import { createPlateEditor } from '@udecode/plate/react';
import { MarkdownPlugin, remarkMention, remarkMdx } from '@udecode/plate-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export const editor = createPlateEditor({
  plugins: [
    // ...other Plate plugins
    MarkdownPlugin.configure({
      options: {
        // Add remark plugins for syntax extensions (GFM, Math, MDX)
        remarkPlugins: [remarkMath, remarkGfm, remarkMdx, remarkMention],
        // Define custom rules if needed
        rules: {
          // date: { /* ... rule implementation ... */ },
        },
      },
    }),
  ],
});

// To disable Markdown paste handling:
// const editorWithoutPaste = createPlateEditor({
//   plugins: [
//     // ...other Plate plugins
//     MarkdownPlugin.configure(() => ({ parser: null })),
//   ],
// });
