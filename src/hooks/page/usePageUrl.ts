import {
    COMMON_PAGE,
    GUID_PAGE, GUIDS_PAGE,
    HOME_PAGE, PROFILE_PAGE,
    TEST_PAGE,
    TEST_PASSING_PAGE, TEST_RESULT_PAGE, TESTS_PAGE,
} from '@/constants/pages.ts';
import { useMemo } from 'react';


export interface PageUrlGetter {
    home (): string;

    common (id: string): string;

    guid (id?: string): string;

    test (id?: string): string;

    guids (id?: string): string;

    tests (id?: string): string;

    testResult (id: string): string;

    testPassing (id: string): string;

    profile (login?: string): string;
}

export const usePageUrl = function (prefix?: string): PageUrlGetter {
    const _prefix = prefix ? prefix + '/' : '';
    return useMemo(() => ({
        home (): string {
            return `/${ _prefix }${ HOME_PAGE }`;
        },
        common (id: string): string {
            return `/${ _prefix }${ COMMON_PAGE }/${ id }`;
        },
        guid (id: string): string {
            return `/${ _prefix }${ GUID_PAGE }${ id ? `/${ id }` : '' }`;
        },
        guids (id: string): string {
            return `/${ _prefix }${ GUIDS_PAGE }${ id ? `/${ id }` : '' }`;
        },
        test (id: string): string {
            const [ themeId, testId ] = (id ?? '').split('-');
            return `/${ _prefix }${ TEST_PAGE }${ themeId ? `/${ themeId }${ testId
                                                                             ? `/${ testId }`
                                                                             : '' }`
                                                          : '' }`;
        },
        tests (id: string): string {
            const [ themeId, testId ] = (id ?? '').split('-');
            return `/${ _prefix }${ TESTS_PAGE }${ themeId ? `/${ themeId }${ testId
                                                                              ? `/${ testId }`
                                                                              : '' }`
                                                           : '' }`;
        },
        testPassing (id: string): string {
            return `/${ _prefix }${ TEST_PAGE }/${ TEST_PASSING_PAGE }/${ id }`;
        },
        testResult (id: string): string {
            return `/${ _prefix }${ TEST_PAGE }/${ TEST_RESULT_PAGE }/${ id }`;
        },
        profile (login?: string): string {
            return `/${ _prefix }${ PROFILE_PAGE }${ login ? `/${ login }` : '' }`;
        },
    }), [ _prefix ]);
};