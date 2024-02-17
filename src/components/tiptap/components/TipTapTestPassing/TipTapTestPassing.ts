import { Extension } from '@tiptap/react';


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

export const TipTapTestPassing = Extension.create<TipTapTestPassingOptions>({
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
                setTimeout(() => {
                    commands.updateAttributes(this.name, {
                        innerHTML: 'Loaded + ' + options.testId,
                    });
                }, 1000);


                return commands.insertContent('<div><h3 onload="console.log(`loading`)">title</h3><p>paragraph</p></div>');
            },
        };
    },
});