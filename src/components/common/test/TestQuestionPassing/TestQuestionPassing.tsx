import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import {
    QuestionAnswerType,
    QuestionSelect,
    QuestionType,
    With,
} from '@vanyamate/cur-helper-types';


export type TestQuestionPassingProps = {
    question: With<QuestionType, [ QuestionSelect ]>;
    onSelect: (id: string) => Promise<boolean>;
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
        return selected === question.selectId;
    }, [ process, selected, question ]);

    const onSelectClick = useCallback((id: string) => {
        setSelected(id);
    }, [ setSelected ]);

    const onAcceptClick = useCallback(() => {
        setProcess(true);
        // TODO: Возможно если true -> менять, false -> не менять
        onSelect(selected)
            .finally(() => setProcess(false));
    }, [ selected, setProcess, onSelect ]);

    return (
        <Section tag="section">
            <Section size="medium">
                <Title>{ question.title }</Title>
                <P>{ question.description }</P>
                <Section type="main">
                    <OrderedList
                        list={ question.answers.map((answer: QuestionAnswerType) => (
                            <TestQuestionPassingButton
                                answer={ answer }
                                key={ question.id + answer.id }
                                onSelect={ onSelectClick }
                                process={ process }
                                selected={ answer.id === selected }
                                selectedAnswer={ answer.id === question.selectId }
                            />
                        )) }
                        title="Варианты"
                    />
                </Section>
            </Section>
            <SpaceBetween>
                <div/>
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
                        : (selected !== question.selectId)
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