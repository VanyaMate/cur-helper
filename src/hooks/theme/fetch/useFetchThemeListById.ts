import { Fetch, useFetch } from '@/hooks/useFetch.ts';
import { With } from '@/types/types.ts';
import {
    ThemeShortType,
} from '@/types/theme/theme.types.ts';
import { ThemeBreadcrumb, ThemeRecursiveChildren } from '@/types/themes/themes.types.ts';
import { API_HOST } from '@/constants/api.url.ts';


export const useFetchThemeListById = function (id: string): Fetch<With<ThemeShortType, [ ThemeRecursiveChildren, ThemeBreadcrumb ]>> {
    return useFetch(`${ API_HOST }/api/v1/themes/list/${ id }`);
};