import {
    ITestPassingService,
} from '@/services/test-passing/test-passing-service.interface.ts';
import { API_HOST } from '@/constants/api.url.ts';
import { makeAutoObservable } from 'mobx';
import { TestPassingFullType, TestResultFullType } from '@vanyamate/cur-helper-types';


export class TestPassingService implements ITestPassingService {
    public passingTests: Map<string, TestPassingFullType> = new Map<string, TestPassingFullType>();
    public resultTests: Map<string, TestResultFullType>   = new Map<string, TestResultFullType>();

    constructor () {
        makeAutoObservable(this, {}, { deep: true });
    }

    async start (token: string, testId: string): Promise<TestPassingFullType> {
        return fetch(`${ API_HOST }/api/v1/test-passing`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify({
                testId,
            }),
        })
            .then((response) => response.json())
            .then((data: TestPassingFullType) => {
                this.passingTests.set(data.id, data);
                return data;
            });
    }

    async finish (token: string, testPassingId: string): Promise<TestResultFullType> {
        return fetch(`${ API_HOST }/api/v1/test-passing/finish`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify({
                testPassingId,
            }),
        })
            .then((response) => response.json())
            .then((data: TestResultFullType) => {
                this.resultTests.set(testPassingId, data);
                this.passingTests.delete(data.test.id);
                return data;
            });
    }

    async getById (token: string, testPassingId: string): Promise<TestPassingFullType> {
        return fetch(`${ API_HOST }/api/v1/test-passing/passing/${ testPassingId }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((data: TestPassingFullType) => {
                this.passingTests.set(testPassingId, data);
                return data;
            });
    }

    async getResultById (token: string, testPassingId: string): Promise<TestResultFullType> {
        return fetch(`${ API_HOST }/api/v1/test-passing/result/${ testPassingId }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((data: TestResultFullType) => {
                this.resultTests.set(testPassingId, data);
                return data;
            });
    }

    async setAnswer (token: string, testPassingId: string, questionId: string, answerId: string): Promise<boolean> {
        return fetch(`${ API_HOST }/api/v1/test-passing`, {
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify({
                testPassingId,
                questionId,
                answerId,
            }),
        })
            .then((response) => response.json())
            .then((data: boolean) => {
                if (data) {
                    const test: TestPassingFullType | undefined = this.passingTests.get(testPassingId);
                    if (test) {
                        test.questions.forEach((question) => {
                            if (question.id === questionId) {
                                question.selectId = answerId;
                                return;
                            }
                        });
                    }
                }
                return data;
            });
    }
}

export const testPassingService: ITestPassingService = new TestPassingService();