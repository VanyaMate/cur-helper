import { QuestionToThemeType } from '@vanyamate/cur-helper-types';


export interface IAdminThemeQuestionService {
    addQuestionToTheme (token: string, data: QuestionToThemeType): Promise<boolean>;

    removeQuestionFromTheme (token: string, data: QuestionToThemeType): Promise<boolean>;
}