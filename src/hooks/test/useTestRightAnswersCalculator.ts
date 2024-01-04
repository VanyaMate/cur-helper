import { useMemo } from 'react';
import { TestQuestion } from '@/types/test/test.types.ts';


export const useTestRightAnswersCalculator = function (questions: TestQuestion[]): number {
    return useMemo(() => {
        return questions.reduce((acc, que) =>
            acc += (que.result.result === 'right' ? 1 : 0), 0,
        );
    }, [ questions ]);
};