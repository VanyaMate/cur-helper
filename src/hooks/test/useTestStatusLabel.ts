export const useTestStatusLabel = function (status: any) {
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