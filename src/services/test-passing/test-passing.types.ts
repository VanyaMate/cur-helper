import {
    TestPassingProcess, TestPassingResults, TestPassingTestShort, TestPassingThemes,
    TestPassingType, TestPassingUserShort,
} from '@/types/test-passing/test-passing.types.ts';
import { With } from '@/types/types.ts';


export type TestPassingFullType = With<TestPassingType, [ TestPassingProcess ]>;
export type TestResultFullType = With<TestPassingType, [ TestPassingResults, TestPassingUserShort, TestPassingThemes, TestPassingTestShort ]>;