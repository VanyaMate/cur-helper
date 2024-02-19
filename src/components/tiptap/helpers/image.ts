import { Editor } from '@tiptap/react';


export type ImageOptions = {
    src: string;
    alt: string;
    title?: string;
}

export const isImage = (editor: Editor) => editor.isActive('image');

export const setImage = (editor: Editor) => (options: ImageOptions) => editor.chain().focus().setImage(options).run();

export const imageAttrs = (editor: Editor) => {
    const { $from } = editor.state.selection;
    const imageNode = editor.state.doc.nodeAt($from.pos);
    if (imageNode) {
        return {
            src  : imageNode.attrs.src,
            alt  : imageNode.attrs.alt,
            title: imageNode.attrs.title,
        };
    } else {
        return null;
    }
};

export const updateImage = (editor: Editor) => (options: Partial<ImageOptions>) => {
    const { $from }   = editor.state.selection;
    const imageNode   = editor.state.doc.nodeAt($from.pos);
    const transaction = editor.state.tr.setNodeMarkup($from.pos, null, {
        src: options.src ?? imageNode?.attrs.src ?? '',
        alt: options.alt ?? imageNode?.attrs.alt ?? '',
    });
    editor.view.dispatch(transaction);
};