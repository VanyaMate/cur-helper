import { User } from '@/types/user/user.types.ts';


export type TestStatus =
    'not-started' | 'process' | 'finish';

export type TestQuestionResult =
    'error' | 'right' | 'selected' | 'empty';

export type TestAnswer = {
    id: string;
    body: string;
}

export type TestQuestionUserResult = {
    answerId: string;
    result: TestQuestionResult;
}

export type TestQuestion = {
    id: string;
    title: string;
    description: string;
    answerId: string;
    themes: TestTheme[];
    answers: TestAnswer[];
}

export type TestUserQuestion = TestQuestion & {
    result: TestQuestionUserResult;
}

export type TestTheme = {
    id: string;
    title: string;
    addition: string;
}

export type TestResult =
    'not-started' | 'unsatisfactory' | 'satisfactorily' | 'perfect';

export type Test = {
    id: string;
    title: string;
    description: string;
    questions: TestQuestion[];
}

export type TestUser = Omit<Test, 'questions'> & {
    questions: TestUserQuestion[];
}

export type TestUserResult = {
    test: TestUser;
    user: User;
    startTime: string;
    finishTime: string;
    try: number;
    result: TestResult;
    status: TestStatus;
}