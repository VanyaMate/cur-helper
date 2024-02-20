import { TestFullType, TestListType } from '@vanyamate/cur-helper-types';


export interface ITestsService {
    tests: Map<string, TestFullType>;
    testList: Map<string, TestListType[]>;


    getOneTestByIds (testId: string, token?: string): Promise<TestFullType>;

    getTestListByThemeId (themeId: string, token?: string): Promise<TestListType[]>;
}