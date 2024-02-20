import { ThemeType, ThemeUpdateType } from "@vanyamate/cur-helper-types";

export interface IAdminThemeService {
    themes: Map<string, ThemeType>;

    create (): void;

    update (token: string, id: string, data: ThemeUpdateType): Promise<ThemeType>;

    delete (): void;

    getOne (token: string, id: string): Promise<ThemeType>;

    getMany (): void;
}