import { useLocation, useNavigate } from 'react-router-dom';
import {
    TestPassingQuestionHash,
} from '@/hooks/test/useTestPassingQuestionHash.ts';
import { useMemo } from 'react';


export interface ITestPassingQuestionPageController {
    next (): void;

    prev (): void;

    set (questionNumber: number): void;
}

export const useTestPassingQuestionPageController = function (test: any | null, hash: TestPassingQuestionHash) {
    const navigate             = useNavigate();
    const { pathname, search } = useLocation();

    return useMemo(() => ({
        next (): void {
            if (hash.nextHash) {
                navigate([ pathname, search, hash.nextHash ].join(''));
            }
        },
        prev (): void {
            if (hash.prevHash) {
                navigate([ pathname, search, hash.prevHash ].join(''));
            }
        },
        set (questionNumber: number): void {
            navigate([ pathname, search, `#${ questionNumber }` ].join(''));
        },
    }), [ hash.nextHash, hash.prevHash, pathname, search, navigate ]);
};