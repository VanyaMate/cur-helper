import { With } from '@/types/types.ts';
import { QuestionSelect, QuestionType } from '@/types/question/question.types.ts';


/**
 * TODO: Заполнить данными
 */
export const useTestCompletedQuestions = function (questions: With<QuestionType, [ QuestionSelect ]>[]): number {
    return questions.reduce(
        (acc, item) => acc += item.selectId !== null ? 1 : 0, 0,
    ) ?? 0;
};