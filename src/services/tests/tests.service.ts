import { TestFullType, TestListType } from '@/services/tests/tests.types.ts';
import { ITestsService } from '@/services/tests/tests-service.interface.ts';
import { API_HOST } from '@/constants/api.url.ts';
import { makeAutoObservable } from 'mobx';


class TestsService implements ITestsService {
    public tests: Map<string, TestFullType>      = new Map<string, TestFullType>();
    public testList: Map<string, TestListType[]> = new Map<string, TestListType[]>();

    constructor () {
        makeAutoObservable(this);
    }

    async getOneTestByIds (testId: string, token?: string): Promise<TestFullType> {
        return fetch(`${ API_HOST }/api/v1/tests/one/${ testId }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.tests.set(testId, data);
                return data;
            });
    }

    async getTestListByThemeId (themeId: string, token?: string): Promise<TestListType[]> {
        const url: string = themeId
                            ? `${ API_HOST }/api/v1/tests/theme/${ themeId }`
                            : `${ API_HOST }/api/v1/tests/list`;
        return fetch(url, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.testList.set(themeId, data);
                return data;
            });
    }
}

export const testsService: ITestsService = new TestsService();