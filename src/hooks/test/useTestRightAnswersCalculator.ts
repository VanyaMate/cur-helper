import { useMemo } from 'react';


export const useTestRightAnswersCalculator = function (questions: any[]): number {
    return useMemo(() => {
        return questions.reduce((acc, que) =>
            acc += (que.result.result === 'right' ? 1 : 0), 0,
        );
    }, [ questions ]);
};