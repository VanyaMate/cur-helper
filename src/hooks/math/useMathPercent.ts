import { useMemo } from 'react';


export const useMathPercent = function (value: number, max: number, digit?: number): number {
    return useMemo(() => parseInt((100 / (max - 1) * value).toFixed(digit ?? 0)), [ value, max, digit ]);
};