import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TestQuestion } from '@/types/test/test.types.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import TestQuestionPassingButton
    from '@/components/common/test/TestQuestionPassingButton/TestQuestionPassingButton.tsx';
import SpaceBetween
    from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';


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
    }, [ setSelected ]);

    const onAcceptClick = useCallback(() => {
        setProcess(true);
        onSelect(selected)
            .finally(() => setProcess(false));
    }, [ selected, setProcess, onSelect ]);

    return (
        <Section>
            <Section size="medium" type="div">
                <Title>{ question.title }</Title>
                <P>{ question.description }</P>
                <Section item="main" type="div">
                    <OrderedList
                        list={ question.answers.map((answer) => (
                            <TestQuestionPassingButton
                                answer={ answer }
                                key={ question.id + answer.id }
                                onSelect={ onSelectClick }
                                process={ process }
                                selected={ answer.id === selected }
                                selectedAnswer={ answer.id === question.result.answerId }
                            />
                        )) }
                        title="Варианты"
                    />
                </Section>
            </Section>
            <SpaceBetween type="div">
                <div />
                <Button
                    disabled={ disabledSelectButton }
                    onClick={ onAcceptClick }
                    prefix={
                        (process)
                        ? <IconM className="loading">cached</IconM>
                        : <IconM>check</IconM>
                    }
                    styleType={
                        process
                        ? 'default'
                        : (selected !== question.result.answerId)
                          ? 'main'
                          : 'default'
                    }
                >
                    Выбрать
                </Button>
            </SpaceBetween>
        </Section>
    );
};

export default React.memo(TestQuestionPassing);