import { Editor } from '@tiptap/react';


type Level =
    1
    | 2
    | 3
    | 4
    | 5
    | 6;

export const isHeading      = (editor: Editor) => editor.isActive('heading');
export const isHeadingLevel = (editor: Editor) => (level: Level) => editor.isActive('heading', { level });

export const toggleHeading = (editor: Editor) => (level: Level) => editor.chain().focus().toggleHeading({ level }).run();