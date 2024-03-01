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


export type AdminQuestionRedactContainerProps = {
    id: string;
};

const AdminQuestionRedactContainer: React.FC<AdminQuestionRedactContainerProps> = observer((props) => {
    const { id }                                 = props;
    const question: QuestionFullType | undefined = adminQuestionService.questions.get(id);

    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pageGetter                             = usePageUrl();

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
                bubbleMenu={ [ TextFormattingRedactMenu ] }
                editable={ false }
                extensions={ [ StarterKit ] }
                html={ question.body }
                id={ `body_${ question.id }` }
                onSave={ async (html: string) => adminQuestionService.update(authService.token[0], question.id, { body: html }).then() }
                title="Вопрос"
            />

            <TitleSection
                extra={
                    <Flex>
                        <AdminOpenCreateQuestionAnswerFormButtonFeature/>
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
                                        console.log(html);
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
                                        console.log(html);
                                    } }
                                    title="Описание"
                                />
                            </Section>
                        ))
                    }
                />
            </TitleSection>

            <TitleSection title="Темы">
                // Themes
            </TitleSection>

            <TitleSection title="Тесты">
                // Tests
            </TitleSection>
        </Section>
    );
});

export default React.memo(AdminQuestionRedactContainer);