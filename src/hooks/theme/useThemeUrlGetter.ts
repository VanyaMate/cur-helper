export type ThemeUrlType =
    'guid' | 'test';

export const useThemeUrlGetter = function (id: string, type: ThemeUrlType): string {
    return `/${ type }/` + id.split('-')[0];
};