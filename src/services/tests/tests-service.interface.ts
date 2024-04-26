import { TestFullType, TestListType } from '@vanyamate/cur-helper-types';
import { FetchData } from '@/services/types.ts';


export interface ITestsService {
    tests: Record<string, FetchData<TestFullType>>;
    testList: Record<string, FetchData<TestListType[]>>;


    getOneTestByIds (testId: string, token?: string): Promise<TestFullType>;

    getTestListByThemeId (themeId: string, token?: string): Promise<TestListType[]>;
}