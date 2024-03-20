import {
    IAdminThemeService,
} from '@/services/admin-theme/admin-theme-service.interface.ts';
import { API_HOST } from '@/constants/api.url.ts';
import { makeAutoObservable } from 'mobx';
import {
    AdminQuestionShortType,
    AdminThemeShortType,
    AdminThemeType,
    MultiplyResponse, ThemeCreateType,
    ThemeType,
} from '@vanyamate/cur-helper-types';


export class AdminThemeService implements IAdminThemeService {
    public themes: Record<string, AdminThemeType>                                  = {};
    public themesList: MultiplyResponse<AdminThemeShortType>                       = {
        list   : [],
        count  : 0,
        options: {},
    };
    public unlinkedForQuestion: Map<string, MultiplyResponse<AdminThemeShortType>> = new Map<string, MultiplyResponse<AdminThemeShortType>>();

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

    async delete (token: string, themeId: string): Promise<boolean> {
        return fetch(`${ API_HOST }/api/v1/theme/${ themeId }`, {
            method : 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json());
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

    async getManyUnlinkedForQuestion (token: string, questionId: string): Promise<MultiplyResponse<AdminThemeShortType>> {
        return fetch(`${ API_HOST }/api/v1/admin/themes/unlinked-for-question/${ questionId }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((list: MultiplyResponse<AdminThemeShortType>) => {
                const cached: MultiplyResponse<AdminThemeShortType> | undefined = this.unlinkedForQuestion.get(questionId);
                if (cached) {
                    // slice
                    // else
                    // add
                }
                this.unlinkedForQuestion.set(questionId, list);
                return list;
            });
    }
}

export const adminThemeService: IAdminThemeService = new AdminThemeService();