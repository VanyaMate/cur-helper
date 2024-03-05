import {
    ThemeChildrenType,
    ThemeFullType,
    ThemeRecursiveType,
} from '@vanyamate/cur-helper-types';
import { FetchData } from '@/services/types.ts';


export interface IThemesService {
    fullThemeData: Record<string, FetchData<ThemeFullType>>;
    themeChildren: Record<string, FetchData<ThemeChildrenType>>;
    themes: FetchData<ThemeRecursiveType[]>;

    getThemeFullDataByPublicId (publicId: string, token?: string): Promise<ThemeFullType>;

    getThemeListById (publicId: string, token?: string): Promise<ThemeChildrenType>;

    getThemesList (token?: string): Promise<ThemeRecursiveType[]>;
}