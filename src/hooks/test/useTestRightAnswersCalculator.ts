import { useMemo } from 'react';
import { TestUserQuestion } from '@/types/test/test.types.ts';


export const useTestRightAnswersCalculator = function (questions: TestUserQuestion[]): number {
    return useMemo(() => {
        return questions.reduce((acc, que) =>
            acc += (que.result.result === 'right' ? 1 : 0), 0,
        );
    }, [ questions ]);
};