import { Fetch, useFetch } from '@/hooks/useFetch.ts';
import { API_HOST } from '@/constants/api.url.ts';
import { ThemeBreadcrumb, ThemeChildren, ThemeTests, ThemeType, With } from '@vanyamate/cur-helper-types';


export const useFetchThemeById = function (id: string): Fetch<With<ThemeType, [ ThemeChildren, ThemeBreadcrumb, ThemeTests ]>> {
    return useFetch(`${ API_HOST }/api/v1/themes/${ id }`);
};