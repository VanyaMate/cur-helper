import { Fetch, useFetch } from '@/hooks/useFetch.ts';
import { With } from '@/types/types.ts';
import { ThemeShortType } from '@/types/theme/theme.types.ts';
import { ThemeRecursiveChildren } from '@/types/themes/themes.types.ts';
import { API_HOST } from '@/constants/api.url.ts';


export const useFetchThemeList = function (): Fetch<With<ThemeShortType, [ ThemeRecursiveChildren ]>[]> {
    return useFetch<With<ThemeShortType, [ ThemeRecursiveChildren ]>[]>(`${ API_HOST }/api/v1/themes/list`);
};