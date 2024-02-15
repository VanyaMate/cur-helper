import { With } from '@/types/types.ts';
import { ThemeShortType, ThemeType } from '@/types/theme/theme.types.ts';
import {
    ThemeBreadcrumb,
    ThemeChildren, ThemeNext, ThemePrev, ThemeRecursiveChildren,
    ThemeTests,
} from '@/types/themes/themes.types.ts';
import {
    ThemeChildrenType,
    ThemeFullType,
    ThemesType,
} from '@/services/themes/themes.types.ts';


export interface IThemesService {
    fullThemeData: Map<string, ThemeFullType>;
    themeChildren: Map<string, ThemeChildrenType>;
    themes: ThemesType[];

    getThemeFullDataByPublicId (publicId: string, token?: string): Promise<With<ThemeType, [ ThemeChildren, ThemeTests, ThemeBreadcrumb, ThemeNext, ThemePrev ]>>;

    getThemeListById (publicId: string, token?: string): Promise<With<ThemeShortType, [ ThemeRecursiveChildren ]> & ThemeBreadcrumb>;

    getThemesList (token?: string): Promise<With<ThemeShortType, [ ThemeRecursiveChildren ]>[]>;
}