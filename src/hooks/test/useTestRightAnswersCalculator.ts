import { useMemo } from 'react';
import {
    QuestionResult,
    QuestionSelect,
    QuestionThemes,
    QuestionType,
} from '@/types/question/question.types.ts';
import { With } from '@/types/types.ts';


export const useTestRightAnswersCalculator = function (questions: With<QuestionType, [ QuestionSelect, QuestionResult, QuestionThemes ]>[]): number {
    return useMemo(() => {
        return questions.reduce((acc, que) =>
            acc += que.answers.reduce((sum, ans) => sum += ans.correct ? 1 : 0, 0), 0,
        );
    }, [ questions ]);
};