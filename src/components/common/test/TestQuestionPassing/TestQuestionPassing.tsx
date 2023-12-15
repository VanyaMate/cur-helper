import React, { useCallback, useState } from 'react';
import { TestQuestion } from '@/types/test/test.types.ts';
import Section from '@/components/ui/container/box/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import TestQuestionPassingButton
    from '@/components/common/test/TestQuestionPassingButton/TestQuestionPassingButton.tsx';


export type TestQuestionPassingProps = {
    question: TestQuestion;
    onSelect: (id: string) => Promise<any>;
}

const TestQuestionPassing: React.FC<TestQuestionPassingProps> = (props) => {
    const { question, onSelect }    = props;
    const [ selected, setSelected ] = useState<string>('');
    const [ process, setProcess ]   = useState<boolean>(false);

    const onSelectClick = useCallback((id: string) => {
        setSelected(id);
    }, [ selected ]);

    const onAcceptClick = useCallback((id: string) => {
        setProcess(true);
        onSelect(id)
            .finally(() => setProcess(false));
    }, [ onSelect ]);

    return (
        <Section>
            <Title>{ question.title }</Title>
            <P>{ question.description }</P>
            <OrderedList
                title={ 'Варианты' }
                list={ question.answers.map((answer) => (
                    <TestQuestionPassingButton
                        key={ question.id + answer.id }
                        answer={ answer }
                        selected={ answer.id === selected }
                        selectedAnswer={ answer.id === question.answerId }
                        onSelect={ onAcceptClick }
                        onClick={ onSelectClick }
                        process={ process }
                    />
                )) }
            />
        </Section>
    );
};

export default React.memo(TestQuestionPassing);