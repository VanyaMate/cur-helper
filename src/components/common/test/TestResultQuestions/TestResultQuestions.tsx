import React from 'react';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import TestResultAnswer
    from '@/components/common/test/TestResultQuestions/TestResultAnswer/TestResultAnswer.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import { TestQuestion } from '@/types/test/test.types.ts';


export type TestResultQuestionsProps = {
    questions: TestQuestion[];
    themeUrlGetter: (id: string) => string;
}

const TestResultQuestions: React.FC<TestResultQuestionsProps> = (props) => {
    const { questions, themeUrlGetter } = props;

    return (
        <Collapse opened title={ `Вопросы (${ questions.length })` }>
            <OrderedList
                list={ questions.map((question) => (
                    <Section
                        item="main"
                        key={ question.id }
                        size="medium"
                        type="article"
                    >
                        <Section size="small" type="div">
                            <Title size="medium">{ question.title }</Title>
                            <P item="second">{ question.description }</P>
                            <OrderedList
                                list={ question.answers.map((answer) => (
                                    <TestResultAnswer
                                        answer={ answer }
                                        key={ answer.title }
                                        result={
                                            question.result.answerId === answer.id
                                            ? question.result.result
                                            : 'empty'
                                        }
                                    />
                                )) }
                                title="Ответы"
                            />
                            <Collapse
                                item="default"
                                opened={ false }
                                title="Темы"
                            >
                                <Section>
                                    {
                                        question.themes.map((theme) => (
                                            <Link
                                                key={ theme.id }
                                                size="small"
                                                target="_blank"
                                                to={ theme.url ? theme.url
                                                               : themeUrlGetter(theme.id) }
                                            >
                                                { theme.url ? ''
                                                            : theme.id } { theme.title }
                                            </Link>
                                        ))
                                    }
                                </Section>
                            </Collapse>
                        </Section>
                    </Section>
                )) }
            />
        </Collapse>
    );
};

export default React.memo(TestResultQuestions);