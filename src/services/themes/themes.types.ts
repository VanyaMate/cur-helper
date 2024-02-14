import {
    ThemeBreadcrumb,
    ThemeChildren, ThemeNext, ThemePrev, ThemeRecursiveChildren,
    ThemeTestsWithShortResults,
} from '@/types/themes/themes.types.ts';
import { ThemeShortType, ThemeType } from '@/types/theme/theme.types.ts';


export type ThemeFullType =
    ThemeChildren
    & ThemeTestsWithShortResults
    & ThemeBreadcrumb
    & ThemeNext
    & ThemePrev
    & ThemeType;

export type ThemeChildrenType =
    ThemeRecursiveChildren
    & ThemeShortType
    & ThemeBreadcrumb;

export type ThemesType =
    ThemeRecursiveChildren
    & ThemeShortType;