import {
    IAdminQuestionService,
} from '@/services/admin-question/admin-question-service.interface.ts';
import {
    QuestionType,
    MultiplyResponse,
    AdminQuestionShortType,
    QuestionCreateType,
    QuestionFullType,
} from '@vanyamate/cur-helper-types';
import { makeAutoObservable } from 'mobx';
import { API_HOST } from '@/constants/api.url.ts';


export class AdminQuestionService implements IAdminQuestionService {
    public questions: Map<string, QuestionFullType>                                = new Map<string, QuestionFullType>();
    public questionList: MultiplyResponse<AdminQuestionShortType>                  = {
        options: {},
        list   : [],
        count  : 0,
    };
    public unlinkedForTest: Map<string, MultiplyResponse<AdminQuestionShortType>>  = new Map<string, MultiplyResponse<AdminQuestionShortType>>();
    public unlinkedForTheme: Map<string, MultiplyResponse<AdminQuestionShortType>> = new Map<string, MultiplyResponse<AdminQuestionShortType>>();

    constructor () {
        makeAutoObservable(this);
    }

    async create (token: string, data: QuestionCreateType): Promise<QuestionType> {
        return fetch(`${ API_HOST }/api/v1/question`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((question: QuestionType) => {
                this.questions.set(question.id, {
                    ...question, themes: [], answers: [], tests: [],
                });
                return question;
            });
    }

    async update (token: string, id: string, data: Partial<QuestionType>): Promise<QuestionType> {
        return fetch(`${ API_HOST }/api/v1/question/${ id }`, {
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((question: QuestionType) => {
                const cachedQuestion: QuestionFullType | undefined = this.questions.get(id);
                this.questions.set(question.id, {
                    ...(cachedQuestion ?? {
                        themes: [], answers: [], tests: [],
                    }), ...question,
                });
                return question;
            });
    }

    async delete (token: string, id: string): Promise<boolean> {
        return fetch(`${ API_HOST }/api/v1/question/${ id }`, {
            method : 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json());
    }

    async findOne (token: string, id: string): Promise<QuestionFullType> {
        return fetch(`${ API_HOST }/api/v1/admin/questions/${ id }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((question: QuestionFullType) => {
                this.questions.set(question.id, question);
                return question;
            });
    }

    // TODO: Add filter
    async findMany (token: string): Promise<MultiplyResponse<AdminQuestionShortType>> {
        return fetch(`${ API_HOST }/api/v1/admin/questions/list`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((list: MultiplyResponse<AdminQuestionShortType>) => {
                this.questionList = list;
                return list;
            });
    }

    async findManyUnlinkedForTest (token: string, testId: string): Promise<MultiplyResponse<AdminQuestionShortType>> {
        return fetch(`${ API_HOST }/api/v1/admin/questions/unlinked-for-test/${ testId }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((list: MultiplyResponse<AdminQuestionShortType>) => {
                const cached: MultiplyResponse<AdminQuestionShortType> | undefined = this.unlinkedForTest.get(testId);
                if (cached) {
                    // slice
                    // else
                    // add
                }
                this.unlinkedForTest.set(testId, list);
                return list;
            });
    }

    async findManyUnlinkedForTheme (token: string, themeId: string): Promise<MultiplyResponse<AdminQuestionShortType>> {
        return fetch(`${ API_HOST }/api/v1/admin/questions/unlinked-for-theme/${ themeId }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((list: MultiplyResponse<AdminQuestionShortType>) => {
                const cached: MultiplyResponse<AdminQuestionShortType> | undefined = this.unlinkedForTheme.get(themeId);
                if (cached) {
                    // slice
                    // else
                    // add
                }
                this.unlinkedForTheme.set(themeId, list);
                return list;
            });
    }
}

export const adminQuestionService = new AdminQuestionService();