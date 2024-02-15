import { useMemo } from 'react';
import { TestPassingFullType } from '@/services/test-passing/test-passing.types.ts';


export const useTestCurrentQuestion = function (test: TestPassingFullType, id: number) {
    return useMemo(() => {
        return test.questions[id] ?? test.questions[0];
    }, [ test, id ]);
};