import { TestStatus } from '@/components/common/test/TestItemLink/TestItemLink.tsx';


export const useTestStatusLabel = function (status: TestStatus) {
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