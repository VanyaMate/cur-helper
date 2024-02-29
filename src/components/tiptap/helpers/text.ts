import { Editor } from '@tiptap/react';


export const isBold      = (editor: Editor) => editor.isActive('bold');
export const isItalic    = (editor: Editor) => editor.isActive('italic');
export const isStrike    = (editor: Editor) => editor.isActive('strike');
export const isHighlight = (editor: Editor) => editor.isActive('highlight');
export const isColor     = (editor: Editor) => editor.isActive('textStyle');

export const highlightColor = (editor: Editor): string => {
    const { $from }      = editor.state.selection;
    const node           = editor.state.doc.nodeAt($from.pos);
    const hightlightMark = node?.marks.find((mark) => mark.type.name === 'highlight');

    if (hightlightMark) {
        return hightlightMark.attrs['color'];
    } else {
        return 'transparent';
    }
};

export const textColor = (editor: Editor): string => {
    const { $from } = editor.state.selection;
    const node      = editor.state.doc.nodeAt($from.pos);
    const colorMark = node?.marks.find((mark) => mark.type.name === 'textStyle');
    console.log(node);

    if (colorMark) {
        console.log('es', colorMark.attrs['color']);
        return colorMark.attrs['color'];
    } else {
        return 'transparent';
    }
};

export const toggleBold      = (editor: Editor) => editor.chain().focus().toggleBold().run();
export const toggleItalic    = (editor: Editor) => editor.chain().focus().toggleItalic().run();
export const toggleStrike    = (editor: Editor) => editor.chain().focus().toggleStrike().run();
export const toggleHighlight = (editor: Editor) => (color?: string) =>
    editor.chain().focus().toggleHighlight(color ? { color } : undefined).run();
export const unsetHighlight  = (editor: Editor) => editor.chain().focus().unsetHighlight().run();
export const setColor        = (editor: Editor) => (color: string) =>
    editor.chain().focus().setColor(color).run();
export const unsetColor      = (editor: Editor) => editor.chain().focus().unsetColor().run();