import { Fetch, useFetch } from '@/hooks/useFetch.ts';
import { With } from '@/types/types.ts';
import { ThemeTestsWithShortResults } from '@/types/themes/themes.types.ts';
import { ThemeShortType } from '@/types/theme/theme.types.ts';


export const useFetchTestList = function (): Fetch<With<ThemeShortType, [ ThemeTestsWithShortResults ]>[]> {
    return useFetch('http://localhost:3000/api/v1/tests');
};