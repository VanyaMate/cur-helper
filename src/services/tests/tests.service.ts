import { ITestsService } from '@/services/tests/tests-service.interface.ts';
import { API_HOST } from '@/constants/api.url.ts';
import { makeAutoObservable } from 'mobx';
import { TestFullType, TestListType } from '@vanyamate/cur-helper-types';
import { FetchData } from '@/services/types.ts';
import { fetchService } from '@/services/fetch-service.ts';


class TestsService implements ITestsService {
    public tests: Record<string, FetchData<TestFullType>>      = {};
    public testList: Record<string, FetchData<TestListType[]>> = {};

    constructor () {
        makeAutoObservable(this);
    }

    async getOneTestByIds (testId: string, token?: string): Promise<TestFullType> {
        return fetchService({
            url    : `${ API_HOST }/api/v1/tests/one/${ testId }`,
            token  : token,
            options: {
                method: 'GET',
            },
        }, {
            record: this.tests,
            id    : testId,
        });
    }

    async getTestListByThemeId (themeId: string, token?: string): Promise<TestListType[]> {
        const url: string = themeId
                            ? `${ API_HOST }/api/v1/tests/theme/${ themeId }`
                            : `${ API_HOST }/api/v1/tests/list`;

        return fetchService({
            url    : url,
            token  : token,
            options: {
                method: 'GET',
            },
        }, {
            record: this.testList,
            id    : themeId,
        });
    }
}

export const testsService: ITestsService = new TestsService();