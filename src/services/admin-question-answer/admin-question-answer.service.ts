import {
    IAdminQuestionAnswerService,
} from '@/services/admin-question-answer/admin-question-answer-service.interface.ts';
import {
    QuestionAnswerCreateType,
    QuestionAnswerType,
} from '@vanyamate/cur-helper-types';
import { API_HOST } from '@/constants/api.url.ts';


export class AdminQuestionAnswerService implements IAdminQuestionAnswerService {
    async create (token: string, data: QuestionAnswerCreateType): Promise<QuestionAnswerType> {
        return fetch(`${ API_HOST }/api/v1/question-answer`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify(data),
        })
            .then((response) => response.json());
    }

    update (token: string, id: string, data: Partial<Omit<QuestionAnswerType, 'correct' | 'questionId' | 'id'>>): Promise<QuestionAnswerType> {
        return fetch(`${ API_HOST }/api/v1/question-answer/${ id }`, {
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify(data),
        })
            .then((response) => response.json());
    }

    delete (token: string, id: string): Promise<boolean> {
        return fetch(`${ API_HOST }/api/v1/question-answer/${ id }`, {
            method : 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json());
    }
}

export const adminQuestionAnswerService = new AdminQuestionAnswerService();