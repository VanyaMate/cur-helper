import { Node } from '@tiptap/react';


export type TipTapTestPassingOptions = {
    testId: string;
    isLoading: boolean;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        testPassing: {
            setTestPassing: (options: { testId: string }) => ReturnType;
        };
    }
}

export const TipTapTestPassing = Node.create<TipTapTestPassingOptions>({
    name     : 'testPassing',
    draggable: true,

    onCreate () {
        console.log('oncreate');
    },

    addOptions () {
        return {
            isLoading: false,
            testId   : '',
        };
    },

    addAttributes () {
        return {};
    },

    parseHTML () {
        return [
            {
                tag: 'div',
            },
        ];
    },

    renderHTML () {
        return [ 'div', {}, 0 ];
    },

    addCommands () {
        return {
            setTestPassing: (options) => ({ commands }) => {
                console.log('test passing', options);
                return commands.insertContent({
                    type : this.name,
                    attrs: {
                        innerHTML: 'hello world',
                    },
                });
            },
        };
    },
});