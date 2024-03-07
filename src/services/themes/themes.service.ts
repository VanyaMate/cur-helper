import { IThemesService } from '@/services/themes/themes-service.interface.ts';
import { makeAutoObservable } from 'mobx';
import { API_HOST } from '@/constants/api.url.ts';
import {
    ThemeChildrenType,
    ThemeFullType,
    ThemeRecursiveType,
} from '@vanyamate/cur-helper-types';
import { FetchData } from '@/services/types.ts';
import { fetchService } from '@/services/fetch-service.ts';


class ThemesService implements IThemesService {
    public fullThemeData: Record<string, FetchData<ThemeFullType>>     = {};
    public themeChildren: Record<string, FetchData<ThemeChildrenType>> = {};
    public themes: Record<string, FetchData<ThemeRecursiveType[]>>     = {};

    constructor () {
        makeAutoObservable(this);
    }

    async getThemeFullDataByPublicId (publicId: string, token?: string): Promise<ThemeFullType> {
        return fetchService({
            url    : `${ API_HOST }/api/v1/themes/${ publicId }`,
            options: {
                method: 'GET',
            },
            token  : token,
        }, {
            record: this.fullThemeData,
            id    : publicId,
        });
    }

    async getThemeListById (publicId: string, token?: string): Promise<ThemeChildrenType> {
        return fetchService({
            url    : `${ API_HOST }/api/v1/themes/list/${ publicId }`,
            token  : token,
            options: {
                method: 'GET',
            },
        }, {
            record: this.themeChildren,
            id    : publicId,
        });
    }

    async getThemesList (token?: string): Promise<ThemeRecursiveType[]> {
        return fetchService({
            url    : `${ API_HOST }/api/v1/themes/list`,
            token  : token,
            options: {
                method: 'GET',
            },
        }, {
            record: this.themes,
            id    : '',
        });
    }
}

export const themesService: IThemesService = new ThemesService();