import { Editor } from '@tiptap/react';


export const isBold   = (editor: Editor) => editor.isActive('bold');
export const isItalic = (editor: Editor) => editor.isActive('italic');
export const isStrike = (editor: Editor) => editor.isActive('strike');

export const toggleBold   = (editor: Editor) => editor.chain().focus().toggleBold().run();
export const toggleItalic = (editor: Editor) => editor.chain().focus().toggleItalic().run();
export const toggleStrike = (editor: Editor) => editor.chain().focus().toggleStrike().run();