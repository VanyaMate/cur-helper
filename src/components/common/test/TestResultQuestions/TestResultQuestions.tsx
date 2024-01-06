import React from 'react';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Section from '@/components/ui/container/box/Section.tsx';
import TestResultAnswer
    from '@/components/common/test/TestResultQuestions/TestResultAnswer/TestResultAnswer.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import { TestQuestion } from '@/types/test/test.types.ts';


export type TestResultQuestionsProps = {
    questions: TestQuestion[];
}

const TestResultQuestions: React.FC<TestResultQuestionsProps> = (props) => {
    const { questions } = props;

    console.log('questions', questions);

    return (
        <Collapse title={ `Вопросы (${ questions.length })` } opened>
            <OrderedList
                list={ questions.map((question) => (
                    <Section
                        item={ 'main' }
                        size={ 'medium' }
                        type={ 'article' }
                        key={ question.id }
                    >
                        <Section size={ 'small' } type={ 'div' }>
                            <Title size={ 'medium' }>{ question.title }</Title>
                            <P item={ 'second' }>{ question.description }</P>
                            <OrderedList
                                title={ 'Ответы' }
                                list={ question.answers.map((answer) => (
                                    <TestResultAnswer
                                        answer={ answer }
                                        result={
                                            question.result.answerId === answer.id
                                            ? question.result.result
                                            : 'empty'
                                        }
                                        onClick={ () => {
                                            console.log('Show modal description');
                                        } }
                                    />
                                )) }
                            />
                            <Collapse
                                opened={ false }
                                title={ 'Темы' }
                                item={ 'default' }
                            >
                                <Section>
                                    {
                                        question.themes.map((theme) => (
                                            <Link
                                                key={ theme.id }
                                                size={ 'small' }
                                                target={ '_blank' }
                                                to={ `/guid/${ theme.id }` }
                                            >
                                                { theme.title }
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