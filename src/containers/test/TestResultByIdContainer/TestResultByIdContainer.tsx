import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import TestResultQuestions
    from '@/components/common/test/TestResultQuestions/TestResultQuestions.tsx';
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
import { testPassingService } from '@/services/test-passing/test-passing.service.ts';
import Loader from '@/components/common/Loader/Loader.tsx';
import { observer } from 'mobx-react-lite';
import TestResultPreview
    from '@/components/common/test/TestResultPreview/TestResultPreview.tsx';


export type TestPassingByIdContainerProps = {
    id: string;
}

const TestResultByIdContainer: React.FC<TestPassingByIdContainerProps> = observer((props) => {
    const { id } = props;

    const test         = testPassingService.resultTests.get(id);
    const rightAnswers = useTestRightAnswersCalculator(test?.questions ?? []);
    const time         = useTestTimeCalculator(test?.startTime ?? 0, test?.finishTime ?? 0);
    const percent      = useMathPercent(rightAnswers, test?.questions.length ?? 0);
    const pageGetter   = usePageUrl();

    if (!test) {
        return <Loader/>;
    }

    return (
        <Section size="small" tag="section">
            <TestItemPageHeader
                publicId=""
                title={ test.test.title }
            />
            <Section size="extra-small">
                <TestResultPreview
                    shortResult={ { ...test, questionsAmount: test.questions.length } }/>
                <Section size="small" type="main">
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
                    <SpaceBetween size="small">
                        <TestResultProgressbarCircle
                            percent={ percent }
                            result={ test.result }
                        />
                        <AdditionalList
                            list={ [
                                { label: 'Вопросов', value: test.questions.length },
                                { label: 'Правильных ответов', value: rightAnswers },
                                { label: 'Попытка', value: '-' },
                                { label: 'Время', value: time + ' минут' },
                            ] }
                        />
                    </SpaceBetween>
                </Section>
            </Section>
            <TestResultQuestions
                questions={ test.questions }
                themeUrlGetter={ pageGetter.guid }
            />
        </Section>
    );

});

export default React.memo(TestResultByIdContainer);