import {
    QuestionAnswerCreateType,
    QuestionAnswerUpdateType,
    QuestionAnswerType,
} from '@vanyamate/cur-helper-types';


export interface IAdminQuestionAnswerService {
    create (token: string, data: QuestionAnswerCreateType): Promise<QuestionAnswerType>;

    update (token: string, id: string, data: QuestionAnswerUpdateType): Promise<QuestionAnswerType>;

    delete (token: string, id: string): Promise<boolean>;
}