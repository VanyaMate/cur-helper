import { User } from '@/types/user/user.types.ts';


export type TestStatus =
    'not-started' | 'process' | 'finish';

export type TestQuestionResult =
    'error' | 'right' | 'selected' | 'empty';

export type TestAnswer = {
    id: string;
    body: string;
}

export type TestQuestion = {
    title: string;
    description: string;
    answerId: string;
    themeId: string;
    answers: TestAnswer[];
    themes: TestTheme[];
    result: TestQuestionResult;
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

export type TestUserResult = {
    test: Test;
    user: User;
    startTime: string;
    finishTime: string;
    try: number;
    result: TestResult;
    status: TestStatus;
}