import { TestPassingResult } from "@vanyamate/cur-helper-types";

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