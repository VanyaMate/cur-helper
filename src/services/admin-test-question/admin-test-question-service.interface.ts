export interface IAdminTestQuestionService {
    addQuestionToTest (token: string, testId: string, questionId: string): Promise<boolean>;

    removeQuestionFromTest (token: string, testId: string, questionId: string): Promise<boolean>;
}