import {
    EndingTypes,
    getEndingByValue,
} from '@vanyamate/helpers/date/getEndingByValue/getEndingByValue';


export const useStringEndingByNumber = function (value: number, endings: EndingTypes, postfix: string) {
    return getEndingByValue(value, endings, postfix);
};