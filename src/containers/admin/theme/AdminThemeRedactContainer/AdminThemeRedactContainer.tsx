import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import Loader from '@/components/common/Loader/Loader.tsx';
import { Image } from '@tiptap/extension-image';
import ThemeFloatingMenu
    from '@/components/tiptap/floating-menu/ThemeFloatingMenu/ThemeFloatingMenu.tsx';
import ThemeBubbleMenu
    from '@/components/tiptap/bubble-menu/ThemeBubbleMenu/ThemeBubbleMenu.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import {
    TipTapFootnote,
} from '@/components/tiptap/components/TipTapFootnote/TipTapFootnote.tsx';


export type AdminThemeRedactContainerProps = {};

const AdminThemeRedactContainer: React.FC<AdminThemeRedactContainerProps> = (props) => {
    const {} = props;

    const editor = useEditor({
        extensions    : [ StarterKit, Image, TipTapFootnote ],
        content       : '<p>Hello world</p>',
        onBeforeCreate: () => <button>hi</button>,
        editable      : true,
    });

    return (
        <Section>
            <OrderedList
                item="main"
                list={ [
                    'Короткая информация о теме',
                    <OrderedList
                        item
                        key="item"
                        list={ [
                            'Редактирование',
                            'Добавить тему (ребенка)',
                            'Добавить тест',
                        ] }
                        title="Кнопки для управления"
                    />,
                    'Информация о теме (связанная с пользователями)',
                ] }
                selfIndex={ [ '1', '', '3' ] }
            />
            <br/>
            {
                editor ?
                <>
                    <Button
                        onClick={ () => editor?.setEditable(!editor?.isEditable) }>Edit</Button>
                    <EditorContent editor={ editor }/>
                    <ThemeFloatingMenu editor={ editor }/>
                    <ThemeBubbleMenu editor={ editor }/>
                </> : <Loader/>
            }
        </Section>
    );
};

export default React.memo(AdminThemeRedactContainer);