import {
    COMMON_PAGE,
    GUID_PAGE,
    HOME_PAGE, PROFILE_PAGE,
    TEST_PAGE,
    TEST_PASSING_PAGE, TEST_RESULT_PAGE,
} from '@/constants/pages.ts';
import { useMemo } from 'react';


export interface PageUrlGetter {
    home (): string;

    common (id: string): string;

    guid (id?: string): string;

    test (id?: string): string;

    testResult (id: string): string;

    testPassing (id: string): string;

    profile (login?: string): string;
}

export const usePageUrl = function (): PageUrlGetter {
    return useMemo(() => ({
        home (): string {
            return `/${ HOME_PAGE }`;
        },
        common (id: string): string {
            return `/${ COMMON_PAGE }/${ id }`;
        },
        guid (id: string): string {
            const [ themeId, guidId ] = (id ?? '').split('-');
            return `/${ GUID_PAGE }${ themeId ? `/${ themeId }${ guidId ? `/${ guidId }`
                                                                        : '' }` : '' }`;
        },
        test (id: string): string {
            const [ themeId, testId ] = (id ?? '').split('-');
            return `/${ TEST_PAGE }${ themeId ? `/${ themeId }${ testId ? `/${ testId }`
                                                                        : '' }` : '' }`;
        },
        testPassing (id: string): string {
            return `/${ TEST_PAGE }/${ TEST_PASSING_PAGE }/?id=${ id }`;
        },
        testResult (id: string): string {
            return `/${ TEST_PAGE }/${ TEST_RESULT_PAGE }/?id=${ id }`;
        },
        profile (login?: string): string {
            return `/${ PROFILE_PAGE }${ login ? `/${ login }` : '' }`;
        },
    }), []);
};