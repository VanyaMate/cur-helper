import React from 'react';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';
import { QuestionFullType } from '@vanyamate/cur-helper-types/types/question';
import Loader from '@/components/common/Loader/Loader.tsx';
import { observer } from 'mobx-react-lite';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import { authService } from '@/services/auth/auth.service.ts';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import RedactorItem from '@/containers/redactor/RedactorItem/RedactorItem.tsx';
import { StarterKit } from '@tiptap/starter-kit';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import TextFormattingRedactMenu
    from '@/components/tiptap/menu/redact-menu/TextFormattingRedactMenu/TextFormattingRedactMenu.tsx';
import Tag from '@/components/common/Tag/Tag.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import AdminOpenCreateQuestionAnswerFormButtonFeature
    from '@/features/admin/question-answer/AdminOpenCreateQuestionAnswerFormButtonFeature/AdminOpenCreateQuestionAnswerFormButtonFeature';
import LabelToggle from '@/components/ui/input/checkbox/LabelToggle/LabelToggle.tsx';
import {
    adminQuestionAnswerService,
} from '@/services/admin-question-answer/admin-question-answer.service.ts';
import TableRedactMenu
    from '@/components/tiptap/menu/redact-menu/TableRedactMenu/TableRedactMenu.tsx';
import ImageRedactMenu
    from '@/components/tiptap/menu/redact-menu/ImageRedactMenu/ImageRedactMenu.tsx';
import TextColorRedactMenu
    from '@/components/tiptap/menu/redact-menu/TextColorRedactMenu/TextColorRedactMenu.tsx';
import HeadingRedactMenu
    from '@/components/tiptap/menu/redact-menu/HeadingRedactMenu/HeadingRedactMenu.tsx';
import FootnoteRedactMenu
    from '@/components/tiptap/menu/redact-menu/FootnoteRedactMenu/FootnoteRedactMenu.tsx';
import ListAddMenu from '@/components/tiptap/menu/add-menu/ListAddMenu/ListAddMenu.tsx';
import LinkRedactMenu
    from '@/components/tiptap/menu/redact-menu/LinkRedactMenu/LinkRedactMenu.tsx';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Table } from '@tiptap/extension-table';
import { Link as TiptapLink } from '@tiptap/extension-link';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { Image } from '@tiptap/extension-image';
import {
    TipTapFootnote,
} from '@/components/tiptap/extensions/TipTapFootnote/TipTapFootnote.ts';
import { Highlight } from '@tiptap/extension-highlight';
import BulletList from '@tiptap/extension-bullet-list';
import { ListItem } from '@tiptap/extension-list-item';
import ImageAddMenu
    from '@/components/tiptap/menu/add-menu/ImageAddMenu/ImageAddMenu.tsx';
import AdminOpenQuestionAddFormButtonFeature
    from '@/features/admin/question/AdminOpenQuestionAddFormButtonFeature/AdminOpenQuestionAddFormButtonFeature.tsx';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import Toggle from '@/components/ui/input/checkbox/Toggle/Toggle.tsx';
import {
    adminTestQuestionService,
} from '@/services/admin-test-question/admin-test-question.service.ts';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import { useNavigate } from 'react-router-dom';
import DeleteQuestionButton
    from '@/features/question/DeleteQuestionButton/DeleteQuestionButton.tsx';


export type AdminQuestionRedactContainerProps = {
    id: string;
};

const AdminQuestionRedactContainer: React.FC<AdminQuestionRedactContainerProps> = observer((props) => {
    const { id }                                 = props;
    const question: QuestionFullType | undefined = adminQuestionService.questions.get(id);
    const adminPageGetter                        = usePageUrl('admin');
    const navigate                               = useNavigate();

    if (!question) {
        return <Loader/>;
    }

    return (
        <Section size="medium">
            <Section size="extra-small">
                <SpaceBetween>
                    <Flex/>
                    <Flex>
                        <LabelToggle
                            active={ question.enabled }
                            activeText={ <Tag type="main">Активен</Tag> }
                            onToggleAsync={ (value) => adminQuestionService.update(authService.token[0], question.id, {
                                enabled: value,
                            }).then() }
                            size="small"
                            unActiveText={ <Tag type="invisible">Не активен</Tag> }
                        />
                        <DeleteQuestionButton questionId={ question.id }/>
                    </Flex>
                </SpaceBetween>
            </Section>

            <RedactorItem
                editable={ false }
                extensions={ [ StarterKit ] }
                html={ question.title }
                id={ `title_${ question.id }` }
                onSave={ async (html: string) => adminQuestionService.update(authService.token[0], question.id, { title: html }).then() }
                title="Заголовок"
                type="text"
            />

            <RedactorItem
                editable={ false }
                extensions={ [ StarterKit ] }
                html={ question.description }
                id={ `description_${ question.id }` }
                onSave={ async (html: string) => adminQuestionService.update(authService.token[0], question.id, { description: html }).then() }
                title="Описание"
                type="text"
            />

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
                editable={ false }
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
                html={ question.body }
                id={ `body_${ question.id }` }
                onSave={ async (html: string) => adminQuestionService.update(authService.token[0], question.id, { body: html }).then() }
                title="Вопрос"
            />

            <TitleSection
                extra={
                    <Flex>
                        <AdminOpenCreateQuestionAnswerFormButtonFeature
                            questionId={ question.id }
                        />
                    </Flex>
                }
                title="Ответы"
            >
                <OrderedList
                    list={
                        question.answers.map((answer) => (
                            <Section key={ answer.id } type="main">
                                <SpaceBetween>
                                    <Flex>
                                        <Tag type={ answer.correct ? 'main' : 'danger' }>
                                            { answer.correct ? 'Верный' : 'Не верный' }
                                        </Tag>
                                    </Flex>
                                    <Flex>
                                        <LabelToggle
                                            active={ answer.enabled }
                                            activeText={ <Tag type="main">Активен</Tag> }
                                            onToggleAsync={ async (value: boolean) => {
                                                return adminQuestionAnswerService
                                                    .update(authService.token[0], answer.id, {
                                                        enabled: value,
                                                    })
                                                    .then((data) => answer.enabled = data.enabled);
                                            } }
                                            size="small"
                                            unActiveText={
                                                <Tag type="invisible">Не активен</Tag>
                                            }
                                        />
                                    </Flex>
                                </SpaceBetween>
                                <RedactorItem
                                    blockType="default"
                                    editable={ false }
                                    extensions={ [ StarterKit ] }
                                    html={ answer.title }
                                    id={ `answer-title_${ answer.id }` }
                                    key={ 1 }
                                    onSave={ async (html: string) => {
                                        return adminQuestionAnswerService
                                            .update(authService.token[0], answer.id, {
                                                title: html,
                                            })
                                            .then((data) => answer.title = data.title)
                                            .then();
                                    } }
                                    title="Заголовок"
                                    type="text"
                                />
                                <RedactorItem
                                    blockType="default"
                                    bubbleMenu={ [ TextFormattingRedactMenu ] }
                                    editable={ false }
                                    extensions={ [ StarterKit ] }
                                    html={ answer.description }
                                    id={ `answer-description_${ answer.id }` }
                                    key={ 2 }
                                    onSave={ async (html: string) => {
                                        adminQuestionAnswerService
                                            .update(authService.token[0], answer.id, {
                                                description: html,
                                            })
                                            .then((data) => answer.description = data.description);
                                    } }
                                    title="Описание"
                                />
                            </Section>
                        ))
                    }
                />
            </TitleSection>

            <TitleSection
                extra={
                    <AdminOpenQuestionAddFormButtonFeature testId={ question.id }/>
                }
                tag="section"
                title={ `Темы (${ question.themes.length })` }
            >
                <TileBox>
                    {
                        question.themes.map((theme) => (
                            <Section
                                key={ theme.id }
                                size="extra-small"
                                tag="article"
                                type="main"
                            >
                                <SpaceBetween>
                                    <Toggle
                                        active={ true }
                                        onToggleAsync={ async () => {
                                            return true;
                                        } }
                                        size="small"
                                    />
                                    <Flex>
                                        <LabelToggle
                                            active={ theme.enabled }
                                            activeText={ <Tag type="main">Активен</Tag> }
                                            size="small"
                                            unActiveText={
                                                <Tag type="invisible">Не активен</Tag>
                                            }
                                        />
                                        <Button
                                            onClick={ () => navigate(adminPageGetter.guid(theme.publicId)) }
                                            quad
                                            size="small"
                                            styleType="default"
                                        >
                                            <IconM size="small">edit</IconM>
                                        </Button>
                                    </Flex>
                                </SpaceBetween>
                                <Title lines={ 1 } size="small">{ theme.title }</Title>
                                <P
                                    dangerouslySetInnerHTML={ { __html: theme.description } }
                                    lines={ 2 }
                                    type="invisible"
                                />
                            </Section>
                        ))
                    }
                </TileBox>
            </TitleSection>

            <TitleSection
                extra={
                    <AdminOpenQuestionAddFormButtonFeature testId={ question.id }/>
                }
                tag="section"
                title={ `Тесты (${ question.tests.length })` }
            >
                <TileBox>
                    {
                        question.tests.map((test) => (
                            <Section
                                key={ test.id }
                                size="small"
                                tag="article"
                                type="main"
                            >
                                <SpaceBetween>
                                    <LabelToggle
                                        active={ test.enabled }
                                        activeText={ <Tag type="main">Активен</Tag> }
                                        size="small"
                                        unActiveText={
                                            <Tag type="invisible">Не активен</Tag>
                                        }
                                    />
                                    <Button
                                        onClick={ () => navigate(adminPageGetter.test(test.id)) }
                                        quad
                                        size="small"
                                        styleType="default"
                                    >
                                        <IconM size="small">edit</IconM>
                                    </Button>
                                </SpaceBetween>
                                <Title lines={ 1 } size="small">{ test.title }</Title>
                            </Section>
                        ))
                    }
                </TileBox>
            </TitleSection>
        </Section>
    );
});

export default React.memo(AdminQuestionRedactContainer);