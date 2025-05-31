// src/store/editorValue.ts
// Purpose: Zustand store for Plate editor value as markdown string (global state for cross-page access)
import { create } from 'zustand';

interface EditorValueState {
  editorValue: string; // markdown string
  setEditorValue: (value: string) => void;
}

export const useEditorValueStore = create<EditorValueState>((set) => ({
  editorValue: '',
  setEditorValue: (value) => set({ editorValue: value }),
})); 