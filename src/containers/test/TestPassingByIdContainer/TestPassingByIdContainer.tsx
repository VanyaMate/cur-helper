import React from 'react';
import { useFetchTestMockData } from '@/hooks/test/useFetchTestMockData.ts';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Section from '@/components/ui/container/box/Section.tsx';
import TestResultQuestions
    from '@/components/common/test/TestResultQuestions/TestResultQuestions.tsx';
import TestResultProgressbar
    from '@/components/common/test/TestResultProgressbar/TestResultProgressbar.tsx';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
import TestItemPageHeader from '@/components/common/test/TestItemPageHeader/TestItemPageHeader.tsx';
import { useTestRightAnswersCalculator } from '@/hooks/test/useTestRightAnswersCalculator.ts';
import { useTestTimeCalculator } from '@/hooks/test/useTestTimeCalculator.ts';
import { useTestUrlGetter } from '@/hooks/test/useTestUrlGetter.ts';
import { useThemeUrlGetter } from '@/hooks/theme/useThemeUrlGetter.ts';
import { useDateDeltaWithPostfix } from '@/hooks/date/useDateDeltaWithPostfix.ts';


export type TestPassingByIdContainerProps = {
    id: string;
}

const TestPassingByIdContainer: React.FC<TestPassingByIdContainerProps> = (props) => {
    const { id }            = props;
    const { loading, test } = useFetchTestMockData(id);
    const rightAnswers      = useTestRightAnswersCalculator(test?.questions ?? []);
    const time              = useTestTimeCalculator(test?.startTime ?? '', test?.finishTime ?? '');
    const themeUrl          = useThemeUrlGetter(test?.id ?? '', 'test');
    const deltaTime         = useDateDeltaWithPostfix(test?.finishTime ?? 0, new Date());

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
                date={ deltaTime }
            />
            <Section item={ 'main' }>
                <TestResultProgressbar
                    questions={ test.questions.length }
                    rightAnswers={ rightAnswers }
                    time={ time }
                    result={ test.result }
                    trying={ test.try }
                />
            </Section>
            <TestResultQuestions questions={ test.questions }/>
        </Section>
    );
};

export default React.memo(TestPassingByIdContainer);