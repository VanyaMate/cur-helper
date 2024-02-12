import { ThemeShortType } from '@/types/theme/theme.types.ts';
import { With } from '@/types/types.ts';
import { TestShortType, TestType } from '@/types/test/test.types.ts';
import { TestShortResult } from '@/types/tests/tests.types.ts';
import { QuestionType } from '@/types/question/question.types.ts';


export type ThemeChildren = {
    children: ThemeShortType[]
}

export type ThemeNext = {
    next: ThemeShortType | null;
}

export type ThemePrev = {
    prev: ThemeShortType | null;
}

export type ThemeRecursiveChildren = {
    children: With<ThemeShortType, [ ThemeRecursiveChildren ]>[]
}

export type ThemeBreadcrumb = {
    breadcrumb: ThemeShortType[];
}

export type ThemeTests = {
    tests: TestType[];
}

export type ThemeTestsShort = {
    tests: TestShortType[];
}

export type ThemeTestsWithShortResults = {
    tests: With<TestType, [ TestShortResult ]>[]
}

export type ThemeQuestions = {
    questions: QuestionType[];
}