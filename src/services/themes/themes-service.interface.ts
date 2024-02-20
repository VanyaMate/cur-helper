import {
    ThemeChildrenType,
    ThemeFullType,
    ThemeRecursiveChildren,
    ThemeShortType,
    ThemesType,
    With,
} from '@vanyamate/cur-helper-types';


export interface IThemesService {
    fullThemeData: Map<string, ThemeFullType>;
    themeChildren: Map<string, ThemeChildrenType>;
    themes: ThemesType[];

    getThemeFullDataByPublicId (publicId: string, token?: string): Promise<ThemeFullType>;

    getThemeListById (publicId: string, token?: string): Promise<ThemeChildrenType>;

    getThemesList (token?: string): Promise<With<ThemeShortType, [ ThemeRecursiveChildren ]>[]>;
}