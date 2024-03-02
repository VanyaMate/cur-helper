import {
    IAdminTestQuestionService,
} from '@/services/admin-test-question/admin-test-question-service.interface.ts';
import { API_HOST } from '@/constants/api.url.ts';


export class AdminTestQuestionService implements IAdminTestQuestionService {
    async addQuestionToTest (token: string, testId: string, questionId: string): Promise<boolean> {
        return fetch(`${ API_HOST }/api/v1/question-to-test`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify({ testId, questionId }),
        })
            .then((response) => response.json());
    }

    async removeQuestionFromTest (token: string, testId: string, questionId: string): Promise<boolean> {
        return fetch(`${ API_HOST }/api/v1/question-to-test`, {
            method : 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify({ testId, questionId }),
        })
            .then((response) => response.json());
    }
}

export const adminTestQuestionService = new AdminTestQuestionService();