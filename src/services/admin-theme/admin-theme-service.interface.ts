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
    unlinkedForQuestion: Map<string, MultiplyResponse<AdminThemeShortType>>;

    create (token: string, data: ThemeCreateType): Promise<AdminThemeType>;

    update (token: string, id: string, data: ThemeUpdateType): Promise<AdminThemeType>;

    delete (token: string, id: string): Promise<boolean>;

    getOne (token: string, id: string): Promise<AdminThemeType>;

    getMany (token: string): Promise<MultiplyResponse<AdminThemeShortType>>;

    getManyUnlinkedForQuestion (token: string, questionId: string): Promise<MultiplyResponse<AdminThemeShortType>>;
}