import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';


export type TestPassingQuestionHash = {
    nextHash: string | null;
    prevHash: string | null;
    currentHash: string;
    current: number;
}

export const useTestPassingQuestionHash = function (questionsAmount: number): TestPassingQuestionHash {
    const { hash }         = useLocation();
    const question: number = useMemo(() => {
        const questionNumber: number = parseInt(hash.split('#')[1]);
        if (isNaN(questionNumber)) {
            return 1;
        } else {
            return questionNumber;
        }
    }, [ hash ]);

    return useMemo(() => {
        const next: number = question + 1;
        const prev: number = question - 1;

        return {
            nextHash   : next <= questionsAmount ? `#${ next }` : null,
            prevHash   : prev > 0 ? `#${ prev }` : null,
            currentHash: `#${ question }`,
            current    : question,
        };
    }, [ question ]);
};