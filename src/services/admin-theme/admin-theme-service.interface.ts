import { ThemeType, ThemeUpdateType } from '@/types/theme/theme.types.ts';


export interface IAdminThemeService {
    themes: Map<string, ThemeType>;

    create (): void;

    update (token: string, id: string, data: ThemeUpdateType): Promise<ThemeType>;

    delete (): void;

    getOne (token: string, id: string): Promise<ThemeType>;

    getMany (): void;
}