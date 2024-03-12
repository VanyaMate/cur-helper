import React from 'react';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import Loader from '@/components/common/Loader/Loader.tsx';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';
import { observer } from 'mobx-react-lite';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Toggle from '@/components/ui/input/checkbox/Toggle/Toggle.tsx';
import { authService } from '@/services/auth/auth.service.ts';
import Link from '@/components/ui/link/Link/Link.tsx';
import RedactorItem from '@/containers/redactor/RedactorItem/RedactorItem.tsx';
import { StarterKit } from '@tiptap/starter-kit';
import TextFormattingRedactMenu
    from '@/components/tiptap/menu/redact-menu/TextFormattingRedactMenu/TextFormattingRedactMenu.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import SaveInput from '@/components/ui/input/SaveInput/SaveInput.tsx';
import { useNavigate } from 'react-router-dom';
import LabelToggle from '@/components/ui/input/checkbox/LabelToggle/LabelToggle.tsx';
import Tag from '@/components/common/Tag/Tag.tsx';
import AdminOpenQuestionAddFormButtonFeature
    from '@/features/admin/question/AdminOpenQuestionAddFormButtonFeature/AdminOpenQuestionAddFormButtonFeature.tsx';
import {
    adminTestQuestionService,
} from '@/services/admin-test-question/admin-test-question.service.ts';
import DeleteTestButton from '@/features/test/DeleteTestButton/DeleteTestButton.tsx';


export type AdminTestRedactContainerProps = {
    id: string;
};

const AdminTestRedactContainer: React.FC<AdminTestRedactContainerProps> = observer((props) => {
    const { id }          = props;
    const test            = adminTestService.tests.get(id);
    const pageGetter      = usePageUrl();
    const adminPageGetter = usePageUrl('admin');
    const navigate        = useNavigate();

    if (!test) {
        return <Loader/>;
    }

    return (
        <Section size="medium">
            <Section size="extra-small">
                <SpaceBetween>
                    <Flex>
                        <P type="invisible">Публичный ID:</P>
                        <P>{ test.theme.publicId }</P>
                    </Flex>
                    <Flex>
                        <LabelToggle
                            active={ test.enabled }
                            activeText={ <Tag type="main">Активен</Tag> }
                            onToggleAsync={ (value) => adminTestService.update(authService.token[0], test.id, {
                                enabled: value,
                            }).then() }
                            size="small"
                            unActiveText={ <Tag type="invisible">Не активен</Tag> }
                        />
                        <DeleteTestButton testId={ test.id }/>
                    </Flex>
                </SpaceBetween>
                <Flex>
                    <P type="invisible">
                        <Link
                            target="_blank"
                            to={ pageGetter.test(test.id) }
                        >
                            Ссылка на тест
                        </Link>
                    </P>
                </Flex>
            </Section>

            <RedactorItem
                editable={ false }
                extensions={ [ StarterKit ] }
                html={ test.title }
                id={ `title_${ test.id }` }
                onSave={ async (html: string) => adminTestService.update(authService.token[0], test.id, { title: html }).then() }
                title="Заголовок"
                type="text"
            />

            <RedactorItem
                bubbleMenu={ [
                    TextFormattingRedactMenu,
                ] }
                editable={ false }
                extensions={ [ StarterKit ] }
                html={ test.description }
                id={ `desc_${ test.id }` }
                onSave={ async (html: string) => adminTestService.update(authService.token[0], test.id, { description: html }).then() }
                title="Описание"
            />

            <TitleSection
                tag="section"
                title="Настройки"
                type="main"
            >
                <TileBox>
                    <SaveInput
                        defaultValue={ Math.ceil(test.timeToPass / 1000 / 60) }
                        label="Время на выполнение (мин)"
                        onSave={ async (value: string) => adminTestService.update(authService.token[0], test.id, { timeToPass: Number(value) * 60 * 1000 }).then() }
                        type="number"
                    />
                    <SaveInput
                        defaultValue={ test.questionsAmount }
                        label="Количество вопросов"
                        onSave={ async (value: string) => adminTestService.update(authService.token[0], test.id, { questionsAmount: Number(value) }).then() }
                        type="number"
                    />
                    <SaveInput
                        defaultValue={ test.perfectScore }
                        label="Идеально"
                        onSave={ async (value: string) => adminTestService.update(authService.token[0], test.id, { perfectScore: Number(value) }).then() }
                        type="number"
                    />
                    <SaveInput
                        defaultValue={ test.satisfactoryScore }
                        label="Удовлетворительно"
                        onSave={ async (value: string) => adminTestService.update(authService.token[0], test.id, { satisfactoryScore: Number(value) }).then() }
                        type="number"
                    />
                    <SaveInput
                        defaultValue={ test.unsatisfactoryScore }
                        label="Неудовлетворительно"
                        onSave={ async (value: string) => adminTestService.update(authService.token[0], test.id, { unsatisfactoryScore: Number(value) }).then() }
                        type="number"
                    />
                </TileBox>
            </TitleSection>

            <TitleSection
                extra={
                    <AdminOpenQuestionAddFormButtonFeature testId={ test.id }/>
                }
                tag="section"
                title={ `Вопросы (${ test.questions.length })` }
            >
                <TileBox>
                    {
                        test.questions.map((question) => (
                            <Section
                                key={ question.id }
                                size="extra-small"
                                tag="article"
                                type="main"
                            >
                                <SpaceBetween>
                                    <Toggle
                                        active={ true }
                                        onToggleAsync={ async () =>
                                            adminTestQuestionService
                                                .removeQuestionFromTest(authService.token[0], test.id, question.id)
                                                .then((value: boolean) => {
                                                    if (value) {
                                                        const deletedQuestion: string = question.id;
                                                        test.questions                = test.questions.filter((question) => {
                                                            return question.id !== deletedQuestion;
                                                        });
                                                    }
                                                })
                                                .then()
                                        }
                                        size="small"
                                    />
                                    <Flex>
                                        <LabelToggle
                                            active={ question.enabled }
                                            activeText={ <Tag type="main">Активен</Tag> }
                                            size="small"
                                            unActiveText={
                                                <Tag type="invisible">Не активен</Tag>
                                            }
                                        />
                                        <Button
                                            onClick={ () => navigate(adminPageGetter.question(question.id)) }
                                            quad
                                            size="small"
                                            styleType="default"
                                        >
                                            <IconM size="small">edit</IconM>
                                        </Button>
                                    </Flex>
                                </SpaceBetween>
                                <Title lines={ 1 } size="small">{ question.title }</Title>
                                <P
                                    dangerouslySetInnerHTML={ { __html: question.description } }
                                    lines={ 2 }
                                    type="invisible"
                                />
                            </Section>
                        ))
                    }
                </TileBox>
            </TitleSection>
        </Section>
    );
});

export default React.memo(AdminTestRedactContainer);