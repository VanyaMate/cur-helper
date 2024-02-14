import {
    TestQuestionsThemesShort,
    TestShortResult,
    TestThemeShort,
} from '@/types/tests/tests.types.ts';
import { With } from '@/types/types.ts';
import { TestType } from '@/types/test/test.types.ts';
import { ThemeTestsWithShortResults } from '@/types/themes/themes.types.ts';
import { ThemeShortType } from '@/types/theme/theme.types.ts';


export type TestFullType = With<TestType, [ TestShortResult, TestThemeShort, TestQuestionsThemesShort ]>;
export type TestListType = With<ThemeShortType, [ ThemeTestsWithShortResults ]>;