import { QuestionSelect, QuestionType, With } from '@vanyamate/cur-helper-types';


export const useTestCompletedQuestions = function (questions: With<QuestionType, [ QuestionSelect ]>[]): number {
    return questions.reduce(
        (acc, item) => acc += item.selectId !== null ? 1 : 0, 0,
    ) ?? 0;
};