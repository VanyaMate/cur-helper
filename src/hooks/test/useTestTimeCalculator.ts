export const useTestTimeCalculator = function (start: string, finish: string): number {
    return Math.floor((+new Date(finish) - +new Date(start)) / 1000 / 60);
};