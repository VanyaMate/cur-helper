import { Fetch, useFetch } from '@/hooks/useFetch.ts';
import { API_HOST } from '@/constants/api.url.ts';
import { TestType, TestShortResult, With, TestQuestionsThemesShort, TestThemeShort } from '@vanyamate/cur-helper-types';


export const useFetchTestItem = function (id: string): Fetch<With<TestType, [ TestShortResult, TestThemeShort, TestQuestionsThemesShort ]>> {
    return useFetch(`${ API_HOST }/api/v1/tests/${ id }`);
};