import React, { useMemo } from 'react';
import {
    useFetchTestPassingMockData,
} from '@/hooks/test/useFetchTestPassingMockData.ts';
import Button from '@/components/ui/button/Button/Button.tsx';
import {
    useTestPassingQuestionHash,
} from '@/hooks/test/useTestPassingQuestionHash.ts';
import SpaceBetween
    from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Section from '@/components/ui/container/box/Section.tsx';
import TestPassingProgress
    from '@/components/common/test/TestPassingProgress/TestPassingProgress.tsx';
import {
    useTestPassingQuestionPageController,
} from '@/hooks/test/useTestPassingQuestionPageController.ts';
import { useTestController } from '@/hooks/test/useTestController.ts';
import TestQuestionPassing
    from '@/components/common/test/TestQuestionPassing/TestQuestionPassing.tsx';
import { TestQuestion } from '@/types/test/test.types.ts';


export type TestPassingByIdContainerProps = {
    id: string;
}

const TestPassingByIdContainer: React.FC<TestPassingByIdContainerProps> = (props) => {
    const { id }                                     = props;
    const { loading, test, select, questionsAmount } = useTestController(id);
    // Получить текущую страницу
    const hash                                       = useTestPassingQuestionHash(test?.questions.length ?? 0);
    // Констроллер для управления страницами
    const {
              next, set, prev,
          }                                          = useTestPassingQuestionPageController(test, hash);
    // Получить текущий question и loading
    const currentQuestion: TestQuestion | null       = useMemo(() => {
        if (test) {
            return test.questions[hash.current - 1] ?? test.questions[0];
        } else {
            return null;
        }
    }, [ test, hash.current ]);


    if (loading) {
        return 'loading..';
    }

    if (!currentQuestion) {
        return 'no find';
    }

    return (
        <Section size={ 'large' }>
            <SpaceBetween>
                <TestPassingProgress
                    questions={ questionsAmount }
                    answers={ hash.current - 1 }
                />
                <Button quad>
                    <span className="material-symbols-outlined">menu</span>
                </Button>
            </SpaceBetween>
            <TestQuestionPassing
                question={ currentQuestion }
                onSelect={ async (answerId) => select(currentQuestion.id, answerId) }
            />
            <SpaceBetween>
                <Button
                    styleType={ 'simple' }
                    disabled={ hash.current === 1 }
                    prefix={
                        <span
                            className={ 'material-symbols-outlined' }>arrow_back</span>
                    }
                    onClick={ prev }
                >
                    Назад
                </Button>
                <Button
                    styleType={ questionsAmount === hash.current ? 'default' : 'simple' }
                    postfix={
                        <span
                            className={ 'material-symbols-outlined' }>arrow_forward</span>
                    }
                    onClick={ next }
                >
                    { questionsAmount === hash.current ? 'Закончить' : 'Вперед' }
                </Button>
            </SpaceBetween>
        </Section>
    );
};

export default React.memo(TestPassingByIdContainer);