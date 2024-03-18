import {
    IAdminThemeQuestionService,
} from '@/services/admin-theme-question/admin-theme-question-service.interface.ts';
import { API_HOST } from '@/constants/api.url.ts';
import { QuestionToThemeType } from '@vanyamate/cur-helper-types';


export class AdminThemeQuestionService implements IAdminThemeQuestionService {
    async addQuestionToTheme (token: string, data: QuestionToThemeType): Promise<boolean> {
        return fetch(`${ API_HOST }/api/v1/question-to-theme`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify(data),
        })
            .then((response) => response.json());
    }

    async removeQuestionFromTheme (token: string, data: QuestionToThemeType): Promise<boolean> {
        return fetch(`${ API_HOST }/api/v1/question-to-theme`, {
            method : 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify(data),
        })
            .then((response) => response.json());
    }
}

export const adminThemeQuestionService = new AdminThemeQuestionService();