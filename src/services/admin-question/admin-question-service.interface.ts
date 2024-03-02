import {
    QuestionType,
    QuestionCreateType,
    QuestionUpdateType,
    AdminQuestionShortType,
    Filter, MultiplyResponse,
} from '@vanyamate/cur-helper-types';
import { QuestionFullType } from '@vanyamate/cur-helper-types/types/question';


export interface IAdminQuestionService {
    questions: Map<string, QuestionFullType>;
    questionList: MultiplyResponse<AdminQuestionShortType>;

    create (token: string, data: QuestionCreateType): Promise<QuestionType>;

    update (token: string, id: string, data: QuestionUpdateType): Promise<QuestionType>;

    delete (token: string, id: string): Promise<boolean>;

    findOne (token: string, id: string): Promise<QuestionFullType>;

    findMany (token: string, filter: Filter<QuestionType>): Promise<MultiplyResponse<AdminQuestionShortType>>;

    findManyUnlinkedForTest (token: string, testId: string, filter: Filter<QuestionType>): Promise<MultiplyResponse<AdminQuestionShortType>>;
}