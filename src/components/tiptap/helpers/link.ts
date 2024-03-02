import { Editor } from '@tiptap/react';


export const isLink = (editor: Editor): boolean => editor.isActive('link');

export const setLink = (editor: Editor) => (href: string) => editor.chain().focus().setLink({
    href, target: '_blank',
}).run();

export const unsetLink = (editor: Editor) => editor.chain().focus().unsetLink().run();