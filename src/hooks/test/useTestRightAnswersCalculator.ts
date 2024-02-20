import { useMemo } from 'react';
import { QuestionResult, QuestionSelect, QuestionThemes, QuestionType, With } from '@vanyamate/cur-helper-types';


export const useTestRightAnswersCalculator = function (questions: With<QuestionType, [ QuestionSelect, QuestionResult, QuestionThemes ]>[]): number {
    return useMemo(() => {
        return questions.reduce((acc, que) =>
            acc += que.answers.reduce((sum, ans) => sum += ans.correct ? 1 : 0, 0), 0,
        );
    }, [ questions ]);
};