import React, { useCallback, useState } from 'react';
import { Editor, EditorContent, Extensions, useEditor } from '@tiptap/react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import Loader from '@/components/common/Loader/Loader.tsx';
import RedactorBubbleMenu
    from '@/containers/redactor/tiptap/RedactorBubbleMenu/RedactorBubbleMenu.tsx';
import RedactorFloatingMenu
    from '@/containers/redactor/tiptap/RedactorFloatingMenu/RedactorFloatingMenu.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import { RedactorEditorContext } from './RedactorItemContext';
import { EditorEvents } from '@tiptap/core';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import { SectionType } from '@/components/ui/container/Section/Section.tsx';
import css from './RedactorItem.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import { Simulate } from 'react-dom/test-utils';
import change = Simulate.change;


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
    blockType?: SectionType;
};

const RedactorItem: React.FC<RedactorItemProps> = (props) => {
    const {
              id,
              editable,
              extensions,
              html,
              title,
              blockType,
              type,
              onSave,
              floatingMenu,
              bubbleMenu,
          }                               = props;
    const [ redactState, setRedactState ] = useState<boolean>(editable);
    const onUpdateHandler                 = useCallback<(props: EditorEvents['update']) => void>(({ editor }) => {
        localStorage.setItem(
            id,
            type === 'text'
            ? editor.getText()
            : editor.getHTML(),
        );
    }, [ id, type ]);

    const editor = useEditor({
        content : localStorage.getItem(id) ?? html,
        extensions,
        editable,
        onUpdate: onUpdateHandler,
    });

    if (!editor) {
        return <Loader/>;
    }

    const cached: string | null = localStorage.getItem(id);
    const isChanged             = cached ? cached !== html : false;

    return (
        <TitleSection
            className={
                cn(
                    css.container,
                    redactState && css.redacted,
                    isChanged && css.changed,
                )
            }
            extra={
                <Flex>
                    <Button
                        disabled={ !isChanged }
                        onClickAsync={ async () => {
                            return onSave(type === 'text' ? editor.getText()
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
                        onClick={ () => {
                            editor.setEditable(!editor.isEditable);
                            setRedactState((prev) => !prev);
                        } }
                        quad
                        size="small"
                        styleType={ redactState ? 'main' : 'default' }
                    >
                        <IconM size="small">edit</IconM>
                    </Button>
                </Flex>
            }
            title={ title }
            type={ blockType }
        >
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
        </TitleSection>
    );
};

export default React.memo(RedactorItem);