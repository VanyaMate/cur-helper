import { Editor } from '@tiptap/react';


export const isList  = (editor: Editor): boolean => editor.isActive('bulletList');
export const canSink = (editor: Editor): boolean => editor.can().sinkListItem('listItem');
export const canLift = (editor: Editor): boolean => editor.can().liftListItem('listItem');

export const toggleList = (editor: Editor) => editor.chain().focus().toggleBulletList().run();

export const sinkList = (editor: Editor) => editor.chain().focus().sinkListItem('listItem').run();
export const liftList = (editor: Editor) => editor.chain().focus().liftListItem('listItem').run();