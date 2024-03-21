import {
    IAdminTestService,
} from '@/services/admin-tests/admin-test-service.interface.ts';
import {
    AdminTestThemeShort,
    AdminTestQuestionsShort,
    TestType,
    MultiplyResponse,
    AdminTestShortType, TestCreateType, With, AdminQuestionShortType,
} from '@vanyamate/cur-helper-types';
import { API_HOST } from '@/constants/api.url.ts';
import { makeAutoObservable } from 'mobx';


export class AdminTestService implements IAdminTestService {
    public tests: Map<string, AdminTestThemeShort & AdminTestQuestionsShort & TestType> = new Map<string, AdminTestThemeShort & AdminTestQuestionsShort & TestType>();
    public testsList: MultiplyResponse<AdminTestShortType>                              = {
        options: {},
        count  : 0,
        list   : [],
    };
    public unlinkedForQuestion: Map<string, MultiplyResponse<AdminTestShortType>>       = new Map<string, MultiplyResponse<AdminTestShortType>>();

    constructor () {
        makeAutoObservable(this);
    }

    async create (token: string, data: TestCreateType): Promise<With<TestType, [ AdminTestThemeShort, AdminTestQuestionsShort ]>> {
        return fetch(`${ API_HOST }/api/v1/test`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }

    async update (token: string, id: string, data: Partial<TestType>): Promise<TestType> {
        return fetch(`${ API_HOST }/api/v1/test/${ id }`, {
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                const finish: AdminTestThemeShort & AdminTestQuestionsShort & TestType = {
                    ...this.tests.get(id), ...data,
                };
                this.tests.set(id, finish);
                return data;
            });
    }

    async delete (token: string, id: string): Promise<boolean> {
        return fetch(`${ API_HOST }/api/v1/test/${ id }`, {
            method : 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json());
    }

    async getOne (token: string, id: string): Promise<AdminTestThemeShort & AdminTestQuestionsShort & TestType> {
        return fetch(`${ API_HOST }/api/v1/admin/tests/${ id }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((theme) => {
                this.tests.set(id, theme);
                return theme;
            });
    }

    async getMany (token: string): Promise<MultiplyResponse<AdminTestShortType>> {
        return fetch(`${ API_HOST }/api/v1/admin/tests`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((multiplyResponse) => {
                this.testsList = multiplyResponse;
                return multiplyResponse;
            });
    }

    async getManyUnlinkedForQuestion (token: string, questionId: string): Promise<MultiplyResponse<AdminTestShortType>> {
        return fetch(`${ API_HOST }/api/v1/admin/tests/unlinked-for-question/${ questionId }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((list: MultiplyResponse<AdminTestShortType>) => {
                const cached: MultiplyResponse<AdminTestShortType> | undefined = this.unlinkedForQuestion.get(questionId);
                if (cached) {
                    // slice
                    // else
                    // add
                }
                this.unlinkedForQuestion.set(questionId, list);
                return list;
            });
    }
}

export const adminTestService = new AdminTestService();