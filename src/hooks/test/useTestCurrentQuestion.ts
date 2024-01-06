import { Test } from '@/types/test/test.types.ts';
import { useMemo } from 'react';


export const useTestCurrentQuestion = function (test: Test | null, id: number) {
    return useMemo(() => {
        if (test) {
            return test.questions[id] ?? test.questions[0];
        } else {
            return null;
        }
    }, [ test, id ]);
};