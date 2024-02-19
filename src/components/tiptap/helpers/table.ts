import { Editor } from '@tiptap/react';


export type TableOptions = {
    rows?: number;
    cols?: number;
    withHeaderRow?: boolean;
}

export const isTable = (editor: Editor) => editor.isActive('table');

export const insertTable        = (editor: Editor) => (options: TableOptions) => editor.chain().focus().insertTable(options).run();
export const addColumnBefore    = (editor: Editor) => editor.chain().focus().addColumnBefore().run();
export const addColumnAfter     = (editor: Editor) => editor.chain().focus().addColumnAfter().run();
export const deleteColumn       = (editor: Editor) => editor.chain().focus().deleteColumn().run();
export const addRowBefore       = (editor: Editor) => editor.chain().focus().addRowBefore().run();
export const addRowAfter        = (editor: Editor) => editor.chain().focus().addRowAfter().run();
export const deleteRow          = (editor: Editor) => editor.chain().focus().deleteRow().run();
export const deleteTable        = (editor: Editor) => editor.chain().focus().deleteTable().run();
export const mergeCells         = (editor: Editor) => editor.chain().focus().mergeCells().run();
export const splitCell          = (editor: Editor) => editor.chain().focus().splitCell().run();
export const toggleHeaderColumn = (editor: Editor) => editor.chain().focus().toggleHeaderColumn().run();
export const toggleHeaderRow    = (editor: Editor) => editor.chain().focus().toggleHeaderRow().run();
export const toggleHeaderCell   = (editor: Editor) => editor.chain().focus().toggleHeaderCell().run();
export const mergeOrSplit       = (editor: Editor) => editor.chain().focus().mergeOrSplit().run();
export const setCellAttribute   = (editor: Editor) => (type: 'rowspan' | 'colspan', value: number) => editor.chain().focus().setCellAttribute(type, value).run();
export const fixTables          = (editor: Editor) => editor.chain().focus().fixTables().run();
export const goToNextCell       = (editor: Editor) => editor.chain().focus().goToNextCell().run();
export const goToPreviousCell   = (editor: Editor) => editor.chain().focus().goToPreviousCell().run();