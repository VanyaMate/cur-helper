import { Fetch, useFetch } from '@/hooks/useFetch.ts';
import { API_HOST } from '@/constants/api.url.ts';
import { ThemeShortType, ThemeTestsWithShortResults, With } from '@vanyamate/cur-helper-types';


export const useFetchTestList = function (): Fetch<With<ThemeShortType, [ ThemeTestsWithShortResults ]>[]> {
    return useFetch(`${ API_HOST }/api/v1/tests`);
};