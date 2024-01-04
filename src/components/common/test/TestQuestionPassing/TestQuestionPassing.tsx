import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TestQuestion } from '@/types/test/test.types.ts';
import Section from '@/components/ui/container/box/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import TestQuestionPassingButton
    from '@/components/common/test/TestQuestionPassingButton/TestQuestionPassingButton.tsx';
import SpaceBetween
    from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';


export type TestQuestionPassingProps = {
    question: TestQuestion;
    onSelect: (id: string) => Promise<any>;
}

const TestQuestionPassing: React.FC<TestQuestionPassingProps> = (props) => {
    const { question, onSelect }    = props;
    const [ selected, setSelected ] = useState<string>('');
    const [ process, setProcess ]   = useState<boolean>(false);

    useEffect(() => {
        setSelected('');
    }, [ question ]);

    const disabledSelectButton = useMemo(() => {
        if (process) return true;
        if (selected === '') return true;
        return selected === question.result.answerId;
    }, [ process, selected, question ]);

    const onSelectClick = useCallback((id: string) => {
        setSelected(id);
    }, [ selected ]);

    const onAcceptClick = useCallback(() => {
        setProcess(true);
        onSelect(selected)
            .finally(() => setProcess(false));
    }, [ selected ]);

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
                        selectedAnswer={ answer.id === question.result.answerId }
                        onSelect={ onSelectClick }
                        process={ process }
                    />
                )) }
            />
            <SpaceBetween>
                <Button
                    styleType={
                        process
                        ? 'default'
                        : (selected !== question.result.answerId)
                          ? 'main'
                          : 'default'
                    }
                    disabled={ disabledSelectButton }
                    prefix={
                        (process)
                        ? <span
                            className={ 'material-symbols-outlined loading' }>cached</span>
                        : <span
                            className={ 'material-symbols-outlined' }>check</span>
                    }
                    onClick={ onAcceptClick }
                >
                    Выбрать
                </Button>
            </SpaceBetween>
        </Section>
    );
};

export default React.memo(TestQuestionPassing);