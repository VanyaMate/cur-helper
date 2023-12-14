import React, { useMemo } from 'react';
import { useFetchTestPassingMockData } from '@/hooks/test/useFetchTestPassingMockData.ts';
import Title from '@/components/ui/title/Title/Title.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import { useTestPassingQuestionHash } from '@/hooks/test/useTestPassingQuestionHash.ts';
import { useNavigate } from 'react-router-dom';
import { useTestPassingQuestionController } from '@/hooks/test/useTestPassingQuestionController.ts';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Section from '@/components/ui/container/box/Section.tsx';
import TestPassingProgress
    from '@/components/common/test/TestPassingProgress/TestPassingProgress.tsx';
import P from '@/components/ui/p/P/P.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import TestResultAnswer
    from '@/components/common/test/TestResultQuestions/TestResultAnswer/TestResultAnswer.tsx';
import Footnote from '@/components/common/Footnote/Footnote.tsx';


export type TestPassingByIdContainerProps = {
    id: string;
}

const TestPassingByIdContainer: React.FC<TestPassingByIdContainerProps> = (props) => {
    const { id }              = props;
    const { loading, data }   = useFetchTestPassingMockData(id);
    const hash                = useTestPassingQuestionHash(data?.questions.length ?? 0);
    const { next, set, prev } = useTestPassingQuestionController(hash);
    const question            = useMemo(() => {
        if (data) {
            return data.questions[hash.current - 1];
        } else {
            return null;
        }
    }, [ hash.current, data?.questions ]);


    if (loading) {
        return 'loading..';
    }

    if (!data) {
        return 'no find';
    }

    return (
        <Section size={ 'large' }>
            <SpaceBetween>
                <TestPassingProgress questions={ data.questions.length } answers={ 4 }/>
                <Button quad><span className="material-symbols-outlined">menu</span></Button>
            </SpaceBetween>
            <Section size={ 'medium' }>
                <Title>{ question?.title }</Title>
                <P>{ question?.description }</P>
                <Footnote type={ 'notify' } header={ 'Важно' }>
                    { question?.description }
                </Footnote>
                <P item={ 'invisible' }>{ question?.description }</P>
                <OrderedList
                    title={ 'Важно учесть' }
                    list={ [
                        <P>Ночь</P>,
                        <P>Котики</P>,
                        <P>Завтрак</P>,
                    ] }
                />
                <P>{ question?.description }</P>
            </Section>
            <OrderedList
                title={ 'Варианты' }
                list={ question?.answers.map((answer) => (
                    <TestResultAnswer
                        key={ answer.id }
                        answer={ answer }
                        result={ 'empty' }
                        onClick={ next }
                    />
                )) ?? [] }
            />
        </Section>
    );
};

export default React.memo(TestPassingByIdContainer);