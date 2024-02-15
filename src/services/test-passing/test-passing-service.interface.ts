import {
    TestPassingFullType,
    TestResultFullType,
} from '@/services/test-passing/test-passing.types.ts';


export interface ITestPassingService {
    passingTests: Map<string, TestPassingFullType>;
    resultTests: Map<string, TestResultFullType>;

    start (token: string, testId: string): Promise<TestPassingFullType>;

    finish (token: string, testPassingId: string): Promise<TestResultFullType>;

    getById (token: string, testPassingId: string): Promise<TestPassingFullType>;

    getResultById (token: string, testPassingId: string): Promise<TestResultFullType>;

    setAnswer (token: string, testPassingId: string, questionId: string, answerId: string): Promise<boolean>;
}