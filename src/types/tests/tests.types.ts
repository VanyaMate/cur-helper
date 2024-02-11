import { TestShortType } from '@/types/test/test.types.ts';
import { With } from '@/types/types.ts';
import { TestPassingShortInfo } from '@/types/test-passing/test-passing.types.ts';
import { ThemeShortType } from '@/types/theme/theme.types.ts';


export type TestChildren = {
    children: TestShortType[];
}

export type TestChildrenWithResults = {
    children: With<TestShortType, [ TestChildren, TestShortResult ]>[]
}

export type TestShortResult = {
    shortResult: TestPassingShortInfo | null
}

export type TestThemeShort = {
    theme: ThemeShortType;
}

export type TestQuestionsThemesShort = {
    themes: ThemeShortType[];
}