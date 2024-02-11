import { Fetch, useFetch } from '@/hooks/useFetch.ts';
import { With } from '@/types/types.ts';
import {

    ThemeType,
} from '@/types/theme/theme.types.ts';
import {
    ThemeBreadcrumb,
    ThemeChildren,
    ThemeTests,
} from '@/types/themes/themes.types.ts';


export const useFetchThemeById = function (id: string): Fetch<With<ThemeType, [ ThemeChildren, ThemeBreadcrumb, ThemeTests ]>> {
    return useFetch(`http://localhost:3000/api/v1/themes/${ id }`);
};