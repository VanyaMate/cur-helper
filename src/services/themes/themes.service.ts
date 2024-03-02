import { IThemesService } from '@/services/themes/themes-service.interface.ts';
import { makeAutoObservable } from 'mobx';
import { API_HOST } from '@/constants/api.url.ts';
import {
    ThemeChildrenType,
    ThemeFullType,
    ThemesType,
} from '@vanyamate/cur-helper-types';


class ThemesService implements IThemesService {
    public fullThemeData: Map<string, ThemeFullType>     = new Map();
    public themeChildren: Map<string, ThemeChildrenType> = new Map();
    public themes: ThemesType[]                          = [];

    constructor () {
        makeAutoObservable(this);
    }

    async getThemeFullDataByPublicId (publicId: string, token?: string): Promise<ThemeFullType> {
        /*        const cached: ThemeFullType | undefined = this.fullThemeData.get(publicId);
         if (cached) {
         return cached;
         } else {
         return fetch(`${ API_HOST }/api/v1/themes/${ publicId }`, {
         method : 'GET',
         headers: {
         'Content-Type' : 'application/json',
         'Authorization': token ?? '',
         },
         })
         .then((response) => response.json())
         .then((data) => {
         this.fullThemeData.set(publicId, data);
         return data;
         });
         }*/

        return fetch(`${ API_HOST }/api/v1/themes/${ publicId }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.fullThemeData.set(publicId, data);
                return data;
            });
    }

    async getThemeListById (publicId: string, token?: string): Promise<ThemeChildrenType> {
        /*        const cached: ThemeChildrenType | undefined = this.themeChildren.get(publicId);
         if (cached) {
         return cached;
         } else {
         return fetch(`${ API_HOST }/api/v1/themes/list/${ publicId }`, {
         method : 'GET',
         headers: {
         'Content-Type' : 'application/json',
         'Authorization': token ?? '',
         },
         })
         .then((response) => response.json())
         .then((data) => {
         this.themeChildren.set(publicId, data);
         return data;
         });
         }*/

        return fetch(`${ API_HOST }/api/v1/themes/list/${ publicId }`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.themeChildren.set(publicId, data);
                return data;
            });
    }

    async getThemesList (token?: string): Promise<ThemesType[]> {
        /*        if (this.themes.length) {
         return this.themes;
         } else {
         return fetch(`${ API_HOST }/api/v1/themes/list`, {
         method : 'GET',
         headers: {
         'Content-Type' : 'application/json',
         'Authorization': token ?? '',
         },
         })
         .then((response) => response.json())
         .then((data) => {
         this.themes = data;
         return data;
         });
         }*/

        return fetch(`${ API_HOST }/api/v1/themes/list`, {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token ?? '',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.themes = data;
                return data;
            });
    }
}

export const themesService: IThemesService = new ThemesService();