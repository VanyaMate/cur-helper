import { useMemo } from 'react';
import { TestPassingFullType } from '@vanyamate/cur-helper-types';


export const useTestCurrentQuestion = function (test: TestPassingFullType, id: number) {
    return useMemo(() => {
        return test.questions[id] ?? test.questions[0];
    }, [ test, id ]);
};