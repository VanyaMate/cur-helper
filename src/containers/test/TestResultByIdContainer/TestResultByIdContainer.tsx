import React from 'react';
import {
    useFetchTestUserResultMockData,
} from '@/hooks/test/fetch/useFetchTestUserResultMockData.ts';
import Section from '@/components/ui/container/box/Section.tsx';
import TestResultQuestions
    from '@/components/common/test/TestResultQuestions/TestResultQuestions.tsx';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
import TestItemPageHeader
    from '@/components/common/test/TestItemPageHeader/TestItemPageHeader.tsx';
import {
    useTestRightAnswersCalculator,
} from '@/hooks/test/useTestRightAnswersCalculator.ts';
import { useTestTimeCalculator } from '@/hooks/test/useTestTimeCalculator.ts';
import TestResultProgressbarCircle
    from '@/components/common/test/TestResultProgressbarCircle/TestResultProgressbarCircle.tsx';
import AdditionalList from '@/components/ui/container/AdditionalList/AdditionalList.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import { useMathPercent } from '@/hooks/math/useMathPercent.ts';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import IconM from '@/components/ui/icon/IconM.tsx';


export type TestPassingByIdContainerProps = {
    id: string;
}

const TestResultByIdContainer: React.FC<TestPassingByIdContainerProps> = (props) => {
    const { id }                  = props;
    const { loading, data: test } = useFetchTestUserResultMockData(id);
    const rightAnswers            = useTestRightAnswersCalculator(test?.test.questions ?? []);
    const time                    = useTestTimeCalculator(test?.startTime ?? '', test?.finishTime ?? '');
    const percent                 = useMathPercent(rightAnswers, test?.test.questions.length ?? 0);
    const pageGetter              = usePageUrl();

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
                            label: <IconM>home</IconM>,
                            url  : pageGetter.test(),
                        },
                        {
                            label: 'Общие правила',
                            url  : pageGetter.test(test.test.id.split('-')[0]),
                        },
                        {
                            label: test.test.title,
                            url  : pageGetter.test(test.test.id),
                        },
                    ]
                }
            />
            <TestItemPageHeader
                title={ test.test.title }
                status={ test.result }
                date={ test.finishTime }
            />
            <Section item={ 'main' } size={ 'small' }>
                <AdditionalList
                    list={ [
                        {
                            label: 'Пользователь',
                            value: <Link to={ pageGetter.profile(test.user.login) }>
                                { test.user.login }
                            </Link>,
                        },
                    ] }
                />
                <SpaceBetween size={ 'small' }>
                    <TestResultProgressbarCircle
                        result={ 'satisfactorily' }
                        percent={ percent }
                    />
                    <AdditionalList
                        list={ [
                            { label: 'Вопросов', value: test.test.questions.length },
                            { label: 'Правильных ответов', value: rightAnswers },
                            { label: 'Попытка', value: test.try },
                            { label: 'Время', value: time + ' минут' },
                        ] }
                    />
                </SpaceBetween>
            </Section>
            <TestResultQuestions
                questions={ test.test.questions }
                themeUrlGetter={ pageGetter.guid }
            />
        </Section>
    );
};

export default React.memo(TestResultByIdContainer);