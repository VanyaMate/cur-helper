import { Fetch, useFetch } from '@/hooks/useFetch.ts';
import { TestType } from '@/types/test/test.types.ts';
import {
    TestQuestionsThemesShort,
    TestShortResult,
    TestThemeShort,
} from '@/types/tests/tests.types.ts';
import { With } from '@/types/types.ts';


export const useFetchTestItem = function (id: string): Fetch<With<TestType, [ TestShortResult, TestThemeShort, TestQuestionsThemesShort ]>> {
    return useFetch(`http://localhost:3000/api/v1/tests/${ id }`);
};