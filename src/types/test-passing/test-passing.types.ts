import {
    QuestionResult,
    QuestionSelect, QuestionShortType, QuestionThemes,
    QuestionType,
} from '@/types/question/question.types.ts';
import { With } from '@/types/types.ts';
import { TestShortType } from '@/types/test/test.types.ts';
import { UserType } from '@/types/user/user.types.ts';
import { ThemeShortType } from '@/types/theme/theme.types.ts';


export type TestPassingResult =
    'no-result'
    | 'satis'
    | 'unsatis'
    | 'perfect';

export type TestPassingState =
    'process'
    | 'finished';

export type TestPassingType = {
    id: string;
    isPrivate: boolean;
    status: TestPassingState;
    startTime: number;
}

export type TestPassingProcess = {
    questions: With<QuestionType, [ QuestionSelect ]>[];
    remainingTime: number;
}

export type TestPassingResults = {
    result: TestPassingResult;
    rightAnswers: number;
    finishTime: number;
    questions: With<QuestionType, [ QuestionSelect, QuestionResult, QuestionThemes ]>[];
}

export type TestPassingResultsShort = {
    result: TestPassingResult;
    rightAnswers: number;
    finishTime: number;
    questions: QuestionShortType[];
}

export type TestPassingTestShort = {
    test: TestShortType;
}

export type TestPassingUserShort = {
    user: UserType;
}

export type TestPassingThemes = {
    themes: ThemeShortType[];
}

export type TestPassingShortInfo =
    Pick<TestPassingType, 'id' | 'status'>
    & TestPassingResultsShort;