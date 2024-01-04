import { TestQuestion } from '@/types/test/test.types.ts';


export const useTestCompletedQuestions = function (questions: TestQuestion[]): number {
    return questions.reduce((acc, item) => acc += item.result.result !== 'empty'
                                                  ? 1
                                                  : 0, 0) ?? 0;
};