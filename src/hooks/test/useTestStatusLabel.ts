import { TestPassingResult } from '@/types/test-passing/test-passing.types.ts';


export const useTestStatusLabel = function (status: TestPassingResult | null | undefined) {
    if (status === 'unsatis') {
        return 'Неудовлетворительно';
    } else if (status === 'satis') {
        return 'Удовлетворительно';
    } else if (status === 'perfect') {
        return 'Идеально';
    } else {
        return 'Не пройден';
    }
};