import React from 'react';
import { Editor, EditorContent, Extensions, useEditor } from '@tiptap/react';
import ContentBox from '@/components/common/ContentBox/ContentBox.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import Loader from '@/components/common/Loader/Loader.tsx';
import RedactorBubbleMenu
    from '@/containers/redactor/tiptap/RedactorBubbleMenu/RedactorBubbleMenu.tsx';
import RedactorFloatingMenu
    from '@/containers/redactor/tiptap/RedactorFloatingMenu/RedactorFloatingMenu.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import { RedactorEditorContext } from './RedactorItemContext';


export type RedactorItemProps = {
    id: string;
    title: string;
    extensions: Extensions;
    floatingMenu?: React.FC<{ editor: Editor }>[];
    bubbleMenu?: React.FC<{ editor: Editor }>[];
    html: string;
    editable: boolean;
    onSave: (html: string) => Promise<void>;
    type?: 'html' | 'text';
};

const RedactorItem: React.FC<RedactorItemProps> = (props) => {
    const {
              id, editable, extensions, html, title, type, onSave, floatingMenu,
              bubbleMenu,
          } = props;

    const editor = useEditor({
        content : localStorage.getItem(id) ?? html,
        extensions,
        editable,
        onUpdate: ({ editor }) => {
            localStorage.setItem(id, type === 'text' ? editor.getText()
                                                     : editor.getHTML());
        },
    });

    if (!editor) {
        return <Loader/>;
    }

    const isChanged = localStorage.getItem(id)
                      ? (localStorage.getItem(id) !== html)
                      : false;

    return (
        <ContentBox>
            <Section>
                <SpaceBetween>
                    <P type="invisible">{ title }</P>
                    <Flex>
                        <Button
                            disabled={ !isChanged }
                            onClick={ () => {
                                onSave(type === 'text' ? editor.getText()
                                                       : editor.getHTML()).then();
                            } }
                            quad
                            size="small"
                            styleType={ isChanged ? 'main' : 'default' }
                        >
                            <IconM size="small">save</IconM>
                        </Button>
                        <Button
                            disabled={ !isChanged }
                            onClick={ () => {
                                localStorage.removeItem(id);
                                editor.commands.setContent(html);
                            } }
                            quad
                            size="small"
                            styleType={ isChanged ? 'main' : 'default' }
                        >
                            <IconM size="small">scan_delete</IconM>
                        </Button>
                        <Button
                            onClick={ () => editor.setEditable(!editor.isEditable) }
                            quad
                            size="small"
                        >
                            <IconM size="small">edit</IconM>
                        </Button>
                    </Flex>
                </SpaceBetween>
                <EditorContent editor={ editor }/>
                {
                    (floatingMenu || bubbleMenu)
                    ? <RedactorEditorContext.Provider value={ editor }>
                        {
                            bubbleMenu
                            ? <RedactorBubbleMenu menu={ bubbleMenu }/> : null
                        }
                        {
                            floatingMenu
                            ? <RedactorFloatingMenu menu={ floatingMenu }/>
                            : null
                        }
                    </RedactorEditorContext.Provider>
                    : null
                }
            </Section>
        </ContentBox>
    );
};

export default React.memo(RedactorItem);