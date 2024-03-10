import {
    ThemeUpdateType,
    MultiplyResponse,
    AdminThemeShortType,
    AdminThemeType,
    ThemeCreateType,
} from '@vanyamate/cur-helper-types';


export interface IAdminThemeService {
    themes: Record<string, AdminThemeType>;
    themesList: MultiplyResponse<AdminThemeShortType>;

    create (token: string, data: ThemeCreateType): Promise<AdminThemeType>;

    update (token: string, id: string, data: ThemeUpdateType): Promise<AdminThemeType>;

    delete (): void;

    getOne (token: string, id: string): Promise<AdminThemeType>;

    getMany (token: string): Promise<MultiplyResponse<AdminThemeShortType>>;
}