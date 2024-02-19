import { FootnoteType } from '@/components/common/Footnote/Footnote.tsx';
import { mergeAttributes, wrappingInputRule } from '@tiptap/react';
import { Blockquote } from '@tiptap/extension-blockquote';


export type TipTapFootnoteOptions = {
    type: FootnoteType,
    HTMLAttributes: Record<string, any>,
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

export const TipTapFootnote = Blockquote.extend<TipTapFootnoteOptions>({
    name     : 'footnote',
    content  : 'block+',
    group    : 'block',
    defining : true,
    priority : 1000,

    addOptions () {
        return {
            type          : 'notify',
            HTMLAttributes: {},
        };
    },

    addAttributes () {
        return {
            type: {
                default  : 'notify',
                rendered : false,
                parseHTML: (element) => {
                    return element.getAttribute('data-footnote');
                },
            },
        };
    },

    parseHTML () {
        return [
            {
                tag: 'blockquote',
            },
        ];
    },

    renderHTML ({ HTMLAttributes, node }) {
        return [
            'blockquote', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class            : node.attrs.type,
                ['data-footnote']: node.attrs.type,
            }), 0,
        ];
    },

    addCommands () {
        return {
            setFootnote   : (options) => ({ commands }) => {
                return commands.wrapIn(
                    this.name, options,
                );
            },
            changeFootnote: (options) => ({ commands }) => {
                return commands.updateAttributes(
                    this.name, options,
                );
            },
            unsetFootnote : () => ({ commands }) => {
                return commands.lift(this.name);
            },
        };
    },

    addInputRules () {
        return [
            wrappingInputRule({
                find: /^\s*>\s$/,
                type: this.type,
            }),
        ];
    },
});