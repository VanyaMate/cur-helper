import React from 'react';
import { TestQuestion } from '@/hooks/test/useFetchTestMockData.ts';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Section from '@/components/ui/container/box/Section.tsx';
import TestResultAnswer
    from '@/components/common/test/TestResultQuestions/TestResultAnswer/TestResultAnswer.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';


export type TestResultQuestionsProps = {
    questions: TestQuestion[];
}

const TestResultQuestions: React.FC<TestResultQuestionsProps> = (props) => {
    const { questions } = props;

    return (
        <Collapse title={ `Вопросы (${ questions.length })` } opened>
            <OrderedList
                list={ questions.map((question) => (
                    <Section item={ 'main' } size={ 'medium' }>
                        <Section size={ 'small' }>
                            <Title size={ 'medium' }>{ question.title }</Title>
                            <div>
                                <P>{ question.description }</P>
                                <Link
                                    style={ { fontSize: 12 } }
                                    target={ '_blank' }
                                    /**
                                     * TODO: Вынести генерацию ссылки во вне и передавать внутрь
                                     генератор
                                     */
                                    to={ `/guid/${ question.themeId.split('-').join('/') }` }
                                >
                                    Ссылка на материалы
                                </Link>
                            </div>
                        </Section>
                        <OrderedList
                            title={ 'Ответы' }
                            list={ question.answers.map((answer) => (
                                <TestResultAnswer
                                    answer={ answer }
                                    result={
                                        question.answerId === answer.id
                                        ? question.result
                                        : 'empty'
                                    }
                                />
                            )) }
                        />
                    </Section>
                )) }
            />
        </Collapse>
    );
};

export default React.memo(TestResultQuestions);