import { Fetch } from '@/hooks/useFetch.ts';
import {
    ThemeRecursiveChildren,
    ThemeShortType,
} from '@/types/theme/theme.types.ts';
import { With } from '@/types/types.ts';


export const useFetchThemeList = function (): Fetch<With<ThemeShortType, [ ThemeRecursiveChildren ]>[]> {
    return {
        loading: false,
        error  : null,
        data   : [
            {
                publicId: '1',
                title   : 'Общие правила',
                url     : '',
                children: [
                    {
                        publicId: '1-1',
                        title   : 'Законы',
                        url     : '',
                        children: [],
                    },
                    {
                        publicId: '1-2',
                        title   : 'Правила',
                        url     : '',
                        children: [],
                    },
                    {
                        publicId: '1-3',
                        title   : 'Этикет',
                        url     : '',
                        children: [],
                    },
                ],
            },
            {
                publicId: '2',
                title   : 'Общие правила',
                url     : '',
                children: [
                    {
                        publicId: '2-1',
                        title   : 'Законы',
                        url     : '',
                        children: [],
                    },
                    {
                        publicId: '2-2',
                        title   : 'Правила',
                        url     : '',
                        children: [],
                    },
                    {
                        publicId: '2-3',
                        title   : 'Этикет',
                        url     : '',
                        children: [],
                    },
                ],
            },
            {
                publicId: '3',
                title   : 'Общие правила',
                url     : '',
                children: [
                    {
                        publicId: '3-1',
                        title   : 'Законы',
                        url     : '',
                        children: [],
                    },
                    {
                        publicId: '3-2',
                        title   : 'Правила',
                        url     : '',
                        children: [],
                    },
                    {
                        publicId: '3-3',
                        title   : 'Этикет',
                        url     : '',
                        children: [],
                    },
                ],
            },
        ],
    };
};