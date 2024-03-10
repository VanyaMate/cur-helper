import {
    IAdminThemeService,
} from '@/services/admin-theme/admin-theme-service.interface.ts';
import { API_HOST } from '@/constants/api.url.ts';
import { makeAutoObservable } from 'mobx';
import {
    AdminThemeShortType,
    AdminThemeType,
    MultiplyResponse, ThemeCreateType,
    ThemeType,
} from '@vanyamate/cur-helper-types';


export class AdminThemeService implements IAdminThemeService {
    public themes: Record<string, AdminThemeType>            = {};
    public themesList: MultiplyResponse<AdminThemeShortType> = {
        list   : [],
        count  : 0,
        options: {},
    };

    constructor () {
        makeAutoObservable(this, {}, { deep: true });
    }

    async create (token: string, data: ThemeCreateType): Promise<AdminThemeType> {
        return fetch(`${ API_HOST }/api/v1/theme`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
            body   : JSON.stringify(data),
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    const error = await response.json();
                    return Promise.reject(error);
                }
            })
            .then((theme) => {
                return theme;
            });
    }

    async update (token: string, id: string, data: Partial<ThemeType>): Promise<AdminThemeType> {
        const cachedThemePublicId = Object.keys(this.themes).find((publicId) => this.themes[publicId]?.id === id) ?? '';
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
                const adminTheme: AdminThemeType = { ...(this.themes[cachedThemePublicId] ?? {}), ...theme };
                this.themes[theme.publicId]      = adminTheme;
                return adminTheme;
            });
    }

    delete (): void {
        throw new Error('Method not implemented.');
    }

    async getOne (token: string, publicId: string): Promise<AdminThemeType> {
        return fetch(`${ API_HOST }/api/v1/admin/themes/${ publicId }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((theme) => {
                this.themes[publicId] = theme;
                return theme;
            });
    }

    async getMany (token: string): Promise<MultiplyResponse<AdminThemeShortType>> {
        return fetch(`${ API_HOST }/api/v1/admin/themes`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Promise.reject(response.json());
                }
            })
            .then((multiplyResponse) => {
                this.themesList = multiplyResponse;
                return multiplyResponse;
            });
    }
}

export const adminThemeService: IAdminThemeService = new AdminThemeService();