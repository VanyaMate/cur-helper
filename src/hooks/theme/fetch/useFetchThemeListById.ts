import { Fetch, useFetch } from '@/hooks/useFetch.ts';
import { With } from '@/types/types.ts';
import {
    ThemeBreadcrumb,
    ThemeRecursiveChildren,
    ThemeShortType,
} from '@/types/theme/theme.types.ts';


export const useFetchThemeListById = function (id: string): Fetch<With<ThemeShortType, [ ThemeRecursiveChildren, ThemeBreadcrumb ]>> {
    return useFetch(`http://localhost:3000/api/v1/themes/list/${ id }`);
};