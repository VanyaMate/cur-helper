import {
    IAdminThemeService,
} from '@/services/admin-theme/admin-theme-service.interface.ts';
import { API_HOST } from '@/constants/api.url.ts';
import { makeAutoObservable } from 'mobx';
import { ThemeType } from '@vanyamate/cur-helper-types';


export class AdminThemeService implements IAdminThemeService {
    public themes: Map<string, ThemeType> = new Map<string, ThemeType>();

    constructor () {
        makeAutoObservable(this, {}, { deep: true });
    }

    create (): void {
        throw new Error('Method not implemented.');
    }

    async update (token: string, id: string, data: Partial<ThemeType>): Promise<ThemeType> {
        return fetch(`${ API_HOST }/api/v1/theme/${ id }`, {
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((theme) => {
                this.themes.set(theme.publicId, theme);
                return theme;
            });
    }

    delete (): void {
        throw new Error('Method not implemented.');
    }

    async getOne (token: string, publicId: string): Promise<ThemeType> {
        return fetch(`${ API_HOST }/api/v1/admin/themes/${ publicId }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((theme) => {
                this.themes.set(publicId, theme);
                return theme;
            });
    }

    getMany (): void {
        throw new Error('Method not implemented.');
    }
}

export const adminThemeService: IAdminThemeService = new AdminThemeService();