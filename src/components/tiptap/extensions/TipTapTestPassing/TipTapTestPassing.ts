import { mergeAttributes, Node } from '@tiptap/react';


export type TipTapTestPassingOptions = {
    HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        testPassing: {
            addTestPassing: () => ReturnType;
        };
    }
}

// TODO: Ну ладно. В целом это можно +- сделать
export const TipTapTestPassing = Node.create<TipTapTestPassingOptions>({
    name    : 'testPassing',
    group   : 'block',
    atom    : true,
    priority: 10000,

    addAttributes () {
        return {
            testId: {
                default  : '',
                renderer : false,
                parseHTML: (element) => {
                    return element.getAttribute('testid');
                },
            },
        };
    },

    parseHTML () {
        return [
            {
                tag: 'test-passing',
            },
        ];
    },

    renderHTML ({ HTMLAttributes }) {
        return [ 'test-passing', mergeAttributes(HTMLAttributes) ];
    },

    addNodeView () {
        return ({ node }) => {
            if (node.attrs.testId) {
                const doc = Object.assign(document.createElement('test-passing'), {
                    innerHTML: `Fetchig...`,
                });

                doc.setAttribute('testid', node.attrs.testId);

                setTimeout(() => {
                    doc.innerHTML = `Render test by id: ${ node.attrs.testId }`;
                }, 1500);

                return { dom: doc };
            } else {
                const doc = Object.assign(document.createElement('test-passing'), {
                    innerHTML: `
                    <h2>Введите номер теста</h2>
                    <input type="text" placeholder="id теста"/>
                    <button>Подтвердить</button>
                `,
                    testid   : '',
                });

                const input  = doc.querySelector('input');
                const button = doc.querySelector('button');


                input!.addEventListener('change', () => {

                });

                button!.addEventListener('click', () => {
                    doc.innerHTML = 'Fetchig..';
                    doc.setAttribute('test-id', input!.value);

                    setTimeout(() => {
                        doc.innerHTML = `Render test by id: ${ input!.value }`;
                    }, 1500);
                });

                return {
                    dom: doc,
                };
            }
        };
    },

    addCommands () {
        return {
            addTestPassing: () => ({ commands }) => {
                return commands.wrapIn(this.name);
            },
        };
    },
});