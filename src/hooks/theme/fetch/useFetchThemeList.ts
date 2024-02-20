import { API_HOST } from '@/constants/api.url.ts';
import { Fetch, useFetch } from '@/hooks/useFetch.ts';
import {
    ThemeRecursiveChildren,
    ThemeShortType,
    With,
} from '@vanyamate/cur-helper-types';


export const useFetchThemeList = function (): Fetch<With<ThemeShortType, [ ThemeRecursiveChildren ]>[]> {
    return useFetch<With<ThemeShortType, [ ThemeRecursiveChildren ]>[]>(`${ API_HOST }/api/v1/themes/list`);
};