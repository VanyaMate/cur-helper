import { TestResult } from '@/types/test/test.types.ts';


export const useTestStatusLabel = function (status: TestResult) {
    if (status === 'not-started') {
        return 'Не пройден';
    } else if (status === 'unsatisfactory') {
        return 'Неудовлетворительно';
    } else if (status === 'satisfactorily') {
        return 'Удовлетворительно';
    } else if (status === 'perfect') {
        return 'Идеально';
    }
};