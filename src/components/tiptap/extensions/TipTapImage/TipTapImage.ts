/*
import { Node } from '@tiptap/core';
import { mergeAttributes } from '@tiptap/react';
import { cn } from '@vanyamate/helpers/react/classname';


export type TipTapImageOptions = {
    rounded: boolean,
    width: boolean,
    HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        extImage: {
            setExtImage: (options: { src: string, alt: string }) => ReturnType;
            changeExtImage: (options: { src?: string, alt?: string }) => ReturnType;
            updateExtImage: (options: { rounded?: boolean, width?: boolean }) => ReturnType;
        };
    }
}

export const TipTapImage = Node.create<TipTapImageOptions>({
    name     : 'extImage',
    draggable: true,
    group    : 'block',
    priority : 10000,

    addOptions () {
        return {
            rounded       : true,
            width         : true,
            HTMLAttributes: {},
        };
    },

    addAttributes () {
        return {
            src: {
                default  : null,
                parseHTML: (element) => element.getAttribute('src'),
            },
            alt: {
                default  : null,
                parseHTML: (element) => element.getAttribute('alt'),
            },
        };
    },

    parseHTML () {
        return [
            { tag: 'img[questions-ext]' },
        ];
    },

    renderHTML ({ HTMLAttributes }) {
        return [
            'img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class     : cn(this.options.width && 'rounded', this.options.width && 'width'),
                'questions-ext': true,
            }),
        ];
    },

    addCommands () {
        return {
            setExtImage   : (options) => ({ commands }) => {
                return commands.insertContent({
                    type : this.name,
                    attrs: options,
                });
            },
            changeExtImage: (options) => ({ commands, state }) => {
                return commands.updateAttributes(this.name, options);
            },
            updateExtImage: (options) => ({ commands }) => {
                commands.deleteNode(this.name);
                return commands.insertContent({
                    type : this.name,
                    attrs: options,
                });
            },
        };
    },
});*/
