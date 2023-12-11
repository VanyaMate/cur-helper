import { useMemo } from 'react';
import {
    getStringDeltaByDates,
} from '@vanyamate/helpers/date/getStringDeltaByDates/getStringDeltaByDates';
import { DateType, getDeltaByDates } from '@vanyamate/helpers/date/getDeltaByDates/getDeltaByDates';


export const useDateDeltaWithPostfix = function (start: DateType, finish: DateType): string {
    return useMemo(() => {
        return getStringDeltaByDates(getDeltaByDates(start, finish));
    }, [ start, finish ]);
};