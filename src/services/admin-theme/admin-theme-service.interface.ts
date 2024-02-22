import {
    ThemeUpdateType,
    MultiplyResponse,
    AdminThemeShortType,
    AdminThemeType,
} from '@vanyamate/cur-helper-types';


export interface IAdminThemeService {
    themes: Map<string, AdminThemeType>;
    themesList: MultiplyResponse<AdminThemeShortType>;

    create (): void;

    update (token: string, id: string, data: ThemeUpdateType): Promise<AdminThemeType>;

    delete (): void;

    getOne (token: string, id: string): Promise<AdminThemeType>;

    getMany (token: string): Promise<MultiplyResponse<AdminThemeShortType>>;
}