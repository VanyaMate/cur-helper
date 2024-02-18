import { FootnoteType } from '@/components/common/Footnote/Footnote.tsx';
import { Node } from '@tiptap/core';


export type TipTapFootnoteOptions = {
    type: FootnoteType
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        blockFootnote: {
            setFootnote: (options: { type: FootnoteType }) => ReturnType;
            changeFootnote: (options: { type: FootnoteType }) => ReturnType;
            unsetFootnote: () => ReturnType;
        };
    }
}

export const TipTapFootnote = Node.create<TipTapFootnoteOptions>({
    name    : 'footnote',
    content : 'text*',
    group   : 'block',
    defining: true,

    addOptions () {
        return {
            type: 'notify',
        };
    },

    parseHTML () {
        return [
            { tag: 'p' },
        ];
    },

    renderHTML ({ HTMLAttributes }) {
        return [
            'p',
            { class: 'footnote', ...HTMLAttributes },
        ];
    },

    addCommands () {
        return {
            setFootnote   : (options) => ({ commands }) => {
                return commands.setNode(this.name);
            },
            changeFootnote: (options) => ({ commands }) => {
                return commands.setNode(this.name);
            },
            unsetFootnote : () => ({ commands }) => {
                return commands.deleteNode(this.name);
            },
        };
    },
});