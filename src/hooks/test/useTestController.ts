import { Test, TestQuestion } from '@/types/test/test.types.ts';
import { useFetchTestPassingMockData } from '@/hooks/test/useFetchTestPassingMockData.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';


export interface ITestController {
    loading: boolean;
    test: Test | null;
    questionsAmount: number;

    select (questionId: string, answerId: string): Promise<any>;
}

export const useTestController = function (testId: string): ITestController {
    const [ process, setProcess ]                 = useState<boolean>(true);
    const [ test, setTest ]                       = useState<Test | null>(null);
    const [ questionsAmount, setQuestionsAmount ] = useState<number>(0);
    const { loading, data }                       = useFetchTestPassingMockData(testId);

    useEffect(() => {
        if (loading) {
            setProcess(true);
            setTest(null);
            setQuestionsAmount(0);
        } else {
            setProcess(false);
            if (data) {
                setTest(data);
                setQuestionsAmount(data.questions.length);
            } else {
                setTest(null);
                setQuestionsAmount(0);
            }
        }
    }, [ loading, data ]);

    const selectAnswer = useCallback(async (questionId: string, answerId: string) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                if (test?.questions) {
                    const question: TestQuestion | undefined = test.questions.find((question) => question.id === questionId);
                    if (question) {
                        question.result.answerId = answerId;
                        question.result.result   = 'selected';
                        setTest({ ...test });
                    }
                }
                resolve();
            }, 1000);
        });
    }, [ test ]);

    return useMemo(() => ({
        loading        : process,
        test           : test,
        questionsAmount: questionsAmount,
        select         : selectAnswer,
    }), [ process, test, questionsAmount, selectAnswer ]);
};