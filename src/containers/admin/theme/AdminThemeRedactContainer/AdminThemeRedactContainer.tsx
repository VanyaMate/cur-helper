import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import Loader from '@/components/common/Loader/Loader.tsx';
import { Image } from '@tiptap/extension-image';
import ThemeFloatingMenu
    from '@/components/tiptap/menu/floating-menu/ThemeFloatingMenu/ThemeFloatingMenu.tsx';
import ThemeBubbleMenu
    from '@/components/tiptap/menu/bubble-menu/ThemeBubbleMenu/ThemeBubbleMenu.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import {
    TipTapFootnote,
} from '@/components/tiptap/extensions/TipTapFootnote/TipTapFootnote.ts';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import TipTapChangeImagePopup
    from '@/containers/admin/tiptap/forms/TipTapChangeImagePopup/TipTapChangeImagePopup.tsx';
import TipTapCreateImagePopup
    from '@/containers/admin/tiptap/forms/TipTapCreateImagePopup/TipTapCreateImagePopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import ContentBox from '@/components/common/ContentBox/ContentBox.tsx';
import { TableHeader } from '@tiptap/extension-table-header';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';


export type AdminThemeRedactContainerProps = {};

const AdminThemeRedactContainer: React.FC<AdminThemeRedactContainerProps> = (props) => {
    const {} = props;

    const editor = useEditor({
        extensions: [
            StarterKit,
            Table.configure({
                resizable              : true,
                cellMinWidth           : 20,
                handleWidth            : 5,
                lastColumnResizable    : false,
                allowTableNodeSelection: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Image,
            TipTapFootnote,
        ],
        content   : localStorage.getItem('tiptap') ?? '<p>Hello world</p>',
        editable  : true,
    });

    const createImagePopup = useWindowPopupController();
    const updateImagePopup = useWindowPopupController();

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
                    <TipTapChangeImagePopup
                        controller={ updateImagePopup }
                        editor={ editor }
                    />
                    <TipTapCreateImagePopup
                        controller={ createImagePopup }
                        editor={ editor }
                    />
                    <Flex>
                        <Button
                            onClick={ () => localStorage.setItem('tiptap', editor?.getHTML()) }>Save</Button>
                        <Button
                            onClick={ () => editor?.setEditable(!editor?.isEditable) }>Edit</Button>
                    </Flex>
                    <ContentBox>
                        <EditorContent editor={ editor }/>
                    </ContentBox>
                    <ThemeFloatingMenu
                        editor={ editor }
                        imageCreatePopup={ createImagePopup }
                    />
                    <ThemeBubbleMenu
                        editor={ editor }
                        imageRedactorController={ updateImagePopup }
                    />
                </> : <Loader/>
            }
        </Section>
    );
};

export default React.memo(AdminThemeRedactContainer);