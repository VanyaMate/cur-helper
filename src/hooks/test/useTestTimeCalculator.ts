export const useTestTimeCalculator = function (start: number, finish: number): number {
    return Math.floor((+new Date(finish) - +new Date(start)) / 1000 / 60);
};