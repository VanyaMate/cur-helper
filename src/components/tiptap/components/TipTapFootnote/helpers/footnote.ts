import { Editor } from '@tiptap/react';
import { FootnoteType } from '@/components/common/Footnote/Footnote.tsx';


export const isFootnote     = (editor: Editor) => editor.isActive('footnote');
export const isFootnoteType = (editor: Editor) => (type: FootnoteType) => editor.isActive('footnote', { type });

export const toggleFootnote = (editor: Editor) => (type: FootnoteType) => {
    if (editor.isActive('footnote', { type })) {
        editor.chain().focus().unsetFootnote().run();
    } else if (editor.isActive('footnote')) {
        editor.chain().focus().changeFootnote({ type }).run();
    } else {
        editor.chain().focus().setFootnote({ type }).run();
    }
};