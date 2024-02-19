import React, { useEffect } from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import RedactorItem from '@/containers/redactor/RedactorItem/RedactorItem.tsx';
import { StarterKit } from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { Image } from '@tiptap/extension-image';
import {
    TipTapFootnote,
} from '@/components/tiptap/extensions/TipTapFootnote/TipTapFootnote.ts';
import TextFormattingRedactMenu
    from '@/components/tiptap/menu/redact-menu/TextFormattingRedactMenu/TextFormattingRedactMenu.tsx';
import ImageRedactMenu
    from '@/components/tiptap/menu/redact-menu/ImageRedactMenu/ImageRedactMenu.tsx';
import TableRedactMenu
    from '@/components/tiptap/menu/redact-menu/TableRedactMenu/TableRedactMenu.tsx';
import HeadingRedactMenu
    from '@/components/tiptap/menu/redact-menu/HeadingRedactMenu/HeadingRedactMenu.tsx';
import FootnoteRedactMenu
    from '@/components/tiptap/menu/redact-menu/FootnoteRedactMenu/FootnoteRedactMenu.tsx';
import ImageAddMenu
    from '@/components/tiptap/menu/add-menu/ImageAddMenu/ImageAddMenu.tsx';
import Loader from '@/components/common/Loader/Loader.tsx';
import { observer } from 'mobx-react-lite';
import { adminThemeService } from '@/services/admin-theme/admin-theme.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import { reaction } from 'mobx';


export type AdminThemeRedactContainerProps = {
    id: string;
};

const AdminThemeRedactContainer: React.FC<AdminThemeRedactContainerProps> = observer((props) => {
    const { id } = props;
    const theme  = adminThemeService.themes.get(id);

    if (!theme) {
        return <Loader/>;
    }

    return (
        <Section>
            <RedactorItem
                editable={ false }
                extensions={ [ StarterKit ] }
                html={ theme.title }
                id={ `title_${ theme.id }` }
                onSave={ async (html: string) => adminThemeService.update(authService.token[0], theme.id, { title: html }).then() }
                title="Заголовок темы"
            />

            <RedactorItem
                bubbleMenu={ [
                    TextFormattingRedactMenu,
                ] }
                editable={ false }
                extensions={ [ StarterKit ] }
                html={ theme.description }
                id={ `desc_${ theme.id }` }
                onSave={ async (html: string) => adminThemeService.update(authService.token[0], theme.id, { description: html }).then() }
                title="Описание темы темы"
            />

            <RedactorItem
                bubbleMenu={ [
                    TextFormattingRedactMenu,
                ] }
                editable={ false }
                extensions={ [ StarterKit ] }
                html={ theme.additional }
                id={ `additional_${ theme.id }` }
                onSave={ async (html: string) => adminThemeService.update(authService.token[0], theme.id, { additional: html }).then() }
                title="Дополнительная информация темы"
            />

            <RedactorItem
                bubbleMenu={ [
                    TableRedactMenu,
                    ImageRedactMenu,
                    TextFormattingRedactMenu,
                    HeadingRedactMenu,
                    FootnoteRedactMenu,
                ] }
                editable={ false }
                extensions={ [
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
                ] }
                floatingMenu={ [
                    HeadingRedactMenu,
                    ImageAddMenu,
                ] }
                html={ theme.body }
                id={ `body_${ theme.id }` }
                onSave={ async (html: string) => adminThemeService.update(authService.token[0], theme.id, { body: html }).then() }
                title="Текст темы"
            />
        </Section>
    );
});

export default AdminThemeRedactContainer;