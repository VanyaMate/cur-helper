import { useLocation, useNavigate } from 'react-router-dom';
import {
    TestPassingQuestionHash,
    useTestPassingQuestionHash,
} from '@/hooks/test/useTestPassingQuestionHash.ts';
import { useMemo } from 'react';


export interface ITestPassingQuestionController {
    next (): void;

    prev (): void;

    set (questionNumber: number): void;
}

export const useTestPassingQuestionController = function (hash: TestPassingQuestionHash): ITestPassingQuestionController {
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
    }), [ hash, pathname, search, navigate ]);
};