import React from 'react';
import { useFetchTestMockData } from '@/hooks/test/useFetchTestMockData.ts';
import Section from '@/components/ui/container/box/Section.tsx';
import TestResultQuestions
    from '@/components/common/test/TestResultQuestions/TestResultQuestions.tsx';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
import TestItemPageHeader from '@/components/common/test/TestItemPageHeader/TestItemPageHeader.tsx';
import { useTestRightAnswersCalculator } from '@/hooks/test/useTestRightAnswersCalculator.ts';
import { useTestTimeCalculator } from '@/hooks/test/useTestTimeCalculator.ts';
import { useThemeUrlGetter } from '@/hooks/theme/useThemeUrlGetter.ts';
import { useDateDeltaWithPostfix } from '@/hooks/date/useDateDeltaWithPostfix.ts';
import TestResultProgressbarCircle
    from '@/components/common/test/TestResultProgressbarCircle/TestResultProgressbarCircle.tsx';
import AdditionalList from '@/components/ui/container/AdditionalList/AdditionalList.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';


export type TestPassingByIdContainerProps = {
    id: string;
}

const TestPassingByIdContainer: React.FC<TestPassingByIdContainerProps> = (props) => {
    const { id }            = props;
    const { loading, test } = useFetchTestMockData(id);
    const rightAnswers      = useTestRightAnswersCalculator(test?.questions ?? []);
    const time              = useTestTimeCalculator(test?.startTime ?? '', test?.finishTime ?? '');
    const themeUrl          = useThemeUrlGetter(test?.id ?? '', 'test');

    if (loading) {
        return 'loading...';
    }

    if (!test) {
        return 'not found';
    }

    return (
        <Section size={ 'small' }>
            <Breadcrumb
                items={
                    [
                        {
                            label: <span className="material-symbols-outlined">home</span>,
                            url  : '/test',
                        },
                        { label: 'Общие правила', url: themeUrl },
                    ]
                }
            />
            <TestItemPageHeader
                title={ `Законы` }
                status={ test.result }
                date={ test.finishTime }
            />
            <SpaceBetween size={ 'small' } item={ 'main' }>
                <TestResultProgressbarCircle
                    result={ 'unsatisfactory' }
                    percent={ 31 }
                />
                <AdditionalList
                    list={ [
                        { label: 'Вопросов', value: 21 },
                        { label: 'Правильных ответов', value: 5 },
                        { label: 'Попыток', value: 2 },
                        { label: 'Время', value: 21 },
                    ] }
                />
            </SpaceBetween>
            <TestResultQuestions questions={ test.questions }/>
        </Section>
    );
};

export default React.memo(TestPassingByIdContainer);