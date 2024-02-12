import { Fetch, useFetch } from '@/hooks/useFetch.ts';
import { With } from '@/types/types.ts';
import { ThemeTestsWithShortResults } from '@/types/themes/themes.types.ts';
import { ThemeShortType } from '@/types/theme/theme.types.ts';
import { API_HOST } from '@/constants/api.url.ts';


export const useFetchTestList = function (): Fetch<With<ThemeShortType, [ ThemeTestsWithShortResults ]>[]> {
    return useFetch(`${ API_HOST }/api/v1/tests`);
};