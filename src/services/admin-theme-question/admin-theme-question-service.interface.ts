import { QuestionToThemeType } from '@vanyamate/cur-helper-types';


export interface IAdminThemeQuestionService {
    addQuestionToTheme (token: string, data: QuestionToThemeType): Promise<boolean>;

    addQuestionToThemeByPublicId (token: string, data: QuestionToThemeType): Promise<boolean>;

    removeQuestionFromTheme (token: string, data: QuestionToThemeType): Promise<boolean>;

    removeQuestionFromThemeByPublicId (token: string, data: QuestionToThemeType): Promise<boolean>;
}