/**
 * TODO: Заполнить данными
 */
export const useTestCompletedQuestions = function (questions: any[]): number {
    return questions.reduce((acc, item) => acc += item.result.result !== 'empty'
                                                  ? 1
                                                  : 0, 0) ?? 0;
};