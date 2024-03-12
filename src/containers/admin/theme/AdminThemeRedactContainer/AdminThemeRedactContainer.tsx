import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import RedactorItem from '@/containers/redactor/RedactorItem/RedactorItem.tsx';
import { StarterKit } from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { Image } from '@tiptap/extension-image';
import { Link as TiptapLink } from '@tiptap/extension-link';
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
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Toggle from '@/components/ui/input/checkbox/Toggle/Toggle.tsx';
import P from '@/components/ui/p/P/P.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import ContentBox from '@/components/common/ContentBox/ContentBox.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import AdminTestListHeaderExtraWidget
    from '@/widgets/admin/test/AdminTestListHeaderExtraWidget/AdminTestListHeaderExtraWidget.tsx';
import EditTestButtonFeature
    from '@/features/admin/test/AdminEditTestButtonFeature/AdminEditTestButtonFeature.tsx';
import LabelToggle from '@/components/ui/input/checkbox/LabelToggle/LabelToggle.tsx';
import Tag from '@/components/common/Tag/Tag.tsx';
import { Highlight } from '@tiptap/extension-highlight';
import TextColorRedactMenu
    from '@/components/tiptap/menu/redact-menu/TextColorRedactMenu/TextColorRedactMenu.tsx';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import BulletList from '@tiptap/extension-bullet-list';
import { ListItem } from '@tiptap/extension-list-item';
import ListAddMenu from '@/components/tiptap/menu/add-menu/ListAddMenu/ListAddMenu.tsx';
import LinkRedactMenu
    from '@/components/tiptap/menu/redact-menu/LinkRedactMenu/LinkRedactMenu.tsx';
import SaveInput from '@/components/ui/input/SaveInput/SaveInput.tsx';
import { useNavigate } from 'react-router-dom';
import DeleteThemeButton from '@/features/theme/DeleteThemeButton/DeleteThemeButton.tsx';


export type AdminThemeRedactContainerProps = {
    id: string;
};

const AdminThemeRedactContainer: React.FC<AdminThemeRedactContainerProps> = observer((props) => {
    const { id }          = props;
    const theme           = adminThemeService.themes[id];
    const pageGetter      = usePageUrl();
    const adminPageGetter = usePageUrl('admin');
    const navigate        = useNavigate();

    if (!theme) {
        return <Loader/>;
    }

    return (
        <Section size="medium">
            <Section size="extra-small">
                <SpaceBetween>
                    <Flex>
                        <P type="invisible">
                            <Link
                                target="_blank"
                                to={ pageGetter.guid(theme.publicId) }
                            >
                                Ссылка на тему
                            </Link>
                        </P>
                    </Flex>
                    <Flex>
                        <LabelToggle
                            active={ theme.enabled }
                            activeText={
                                <Tag type="main">Активна</Tag>
                            }
                            onToggleAsync={ (value) => adminThemeService.update(authService.token[0], theme.id, {
                                enabled: value,
                            }).then() }
                            size="small"
                            unActiveText={
                                <Tag type="invisible">Не активна</Tag>
                            }
                        />
                        <DeleteThemeButton themeId={ theme.id }/>
                    </Flex>
                </SpaceBetween>
            </Section>

            <ContentBox>
                <SaveInput
                    defaultValue={ theme.publicId }
                    label="Публичный ID"
                    onSave={
                        async (value) => adminThemeService
                            .update(authService.token[0], theme.id, {
                                publicId: value,
                            })
                            .then((data) => navigate(adminPageGetter.guid(data.publicId)))
                    }
                />
            </ContentBox>

            <ContentBox>
                <RedactorItem
                    editable={ false }
                    extensions={ [ StarterKit ] }
                    html={ theme.title }
                    id={ `title_${ theme.id }` }
                    onSave={ async (html: string) => adminThemeService.update(authService.token[0], theme.id, { title: html }).then() }
                    title="Заголовок"
                    type="text"
                />
            </ContentBox>

            <ContentBox>
                <RedactorItem
                    bubbleMenu={ [
                        TextFormattingRedactMenu,
                    ] }
                    editable={ false }
                    extensions={ [ StarterKit ] }
                    html={ theme.description }
                    id={ `desc_${ theme.id }` }
                    onSave={ async (html: string) => adminThemeService.update(authService.token[0], theme.id, { description: html }).then() }
                    title="Описание"
                />
            </ContentBox>

            <ContentBox>
                <RedactorItem
                    bubbleMenu={ [
                        TextFormattingRedactMenu,
                    ] }
                    editable={ false }
                    extensions={ [ StarterKit ] }
                    html={ theme.additional }
                    id={ `additional_${ theme.id }` }
                    onSave={ async (html: string) => adminThemeService.update(authService.token[0], theme.id, { additional: html }).then() }
                    title="Дополнительная информация"
                />
            </ContentBox>

            <ContentBox>
                <RedactorItem
                    bubbleMenu={ [
                        TableRedactMenu,
                        ImageRedactMenu,
                        TextFormattingRedactMenu,
                        TextColorRedactMenu,
                        HeadingRedactMenu,
                        FootnoteRedactMenu,
                        ListAddMenu,
                        LinkRedactMenu,
                    ] }
                    editable={ true }
                    extensions={ [
                        TextStyle,
                        Color,
                        StarterKit,
                        Table.configure({
                            resizable              : true,
                            cellMinWidth           : 20,
                            handleWidth            : 5,
                            lastColumnResizable    : false,
                            allowTableNodeSelection: true,
                        }),
                        TiptapLink.configure({
                            linkOnPaste: true,
                            autolink   : true,
                            protocols  : [ 'http', 'https' ],
                        }),
                        TableRow,
                        TableHeader,
                        TableCell,
                        Image,
                        TipTapFootnote,
                        Highlight.configure({ multicolor: true }),
                        BulletList,
                        ListItem,
                    ] }
                    floatingMenu={ [
                        HeadingRedactMenu,
                        FootnoteRedactMenu,
                        ImageAddMenu,
                        TableRedactMenu,
                        ListAddMenu,
                    ] }
                    html={ theme.body }
                    id={ `body_${ theme.id }` }
                    onSave={ async (html: string) => adminThemeService.update(authService.token[0], theme.id, { body: html }).then() }
                    title="Текст"
                />
            </ContentBox>

            <TitleSection
                extra={
                    <AdminTestListHeaderExtraWidget themeId={ theme.publicId }/>
                }
                title={ `Тесты (${ theme.tests.length })` }
            >
                <TileBox>
                    {
                        theme.tests.map((test) => (
                            <Section key={ test.id } size="extra-small" type="main">
                                <SpaceBetween>
                                    <Link hardColor target="_blank" to="#">
                                        <P type="invisible">Ссылка</P>
                                    </Link>
                                    <Flex>
                                        <LabelToggle
                                            active={ test.enabled }
                                            activeText={
                                                <Tag type="main">Активен</Tag>
                                            }
                                            size="small"
                                            unActiveText={
                                                <Tag type="invisible">Не активен</Tag>
                                            }
                                        />
                                        <EditTestButtonFeature testId={ test.id }/>
                                    </Flex>
                                </SpaceBetween>
                                <Title lines={ 2 }>{ test.title }</Title>
                            </Section>
                        ))
                    }
                </TileBox>
            </TitleSection>

            <TitleSection
                extra={
                    <Flex>
                        <Button
                            quad
                            size="small"
                            styleType="default"
                        >
                            <IconM size="small">add</IconM>
                        </Button>
                    </Flex>
                }
                title={ `Вопросы (${ theme.questions.length })` }
            >
                <TileBox>
                    {
                        theme.questions.map((question) => (
                            <Section key={ question.id } size="extra-small" type="main">
                                <SpaceBetween>
                                    <Toggle
                                        active={ true }
                                        onToggleAsync={ async () => {
                                            return new Promise<void>((resolve) => {
                                                setTimeout(() => resolve(), 1000);
                                            }).then();
                                        } }
                                        size="small"
                                    />
                                    <Flex>
                                        <LabelToggle
                                            active={ question.enabled }
                                            activeText={
                                                <Tag type="main">Активен</Tag>
                                            }
                                            size="small"
                                            unActiveText={
                                                <Tag type="invisible">Не активен</Tag>
                                            }
                                        />
                                        <Button
                                            quad
                                            size="small"
                                            styleType="default"
                                        >
                                            <IconM size="small">edit</IconM>
                                        </Button>
                                    </Flex>
                                </SpaceBetween>
                                <Title lines={ 2 }>{ question.title }</Title>
                                <P lines={ 2 }
                                   type="invisible">{ question.description }</P>
                            </Section>
                        ))
                    }
                </TileBox>
            </TitleSection>
        </Section>
    );
});

export default AdminThemeRedactContainer;