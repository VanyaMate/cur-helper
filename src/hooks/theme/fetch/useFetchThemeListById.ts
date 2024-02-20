import { Fetch, useFetch } from '@/hooks/useFetch.ts';
import {
    ThemeBreadcrumb,
    ThemeRecursiveChildren,
    ThemeShortType,
    With,
} from '@vanyamate/cur-helper-types';
import { API_HOST } from '@/constants/api.url.ts';


export const useFetchThemeListById = function (id: string): Fetch<With<ThemeShortType, [ ThemeRecursiveChildren, ThemeBreadcrumb ]>> {
    return useFetch(`${ API_HOST }/api/v1/themes/list/${ id }`);
};