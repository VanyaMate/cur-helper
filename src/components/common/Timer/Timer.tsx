import React, { useEffect, useRef, useState } from 'react';
import {
    getStringDeltaByDates,
} from '@vanyamate/helpers/date/getStringDeltaByDates/getStringDeltaByDates.ts';
import {
    getDeltaByDates,
} from '@vanyamate/helpers/date/getDeltaByDates/getDeltaByDates.ts';


export type TimerProps = {
    ms: number;
};

const Timer: React.FC<TimerProps> = (props) => {
    const { ms }                            = props;
    const timeInit                          = useRef<number>(Date.now());
    const [ currentValue, setCurrentValue ] = useState<string>(getStringDeltaByDates(getDeltaByDates(Date.now(), timeInit.current + ms), ''));

    useEffect(() => {
        const timeout = setInterval(() => {
            setCurrentValue(getStringDeltaByDates(getDeltaByDates(Date.now(), timeInit.current + ms), ''));
        }, 1000);

        return () => clearInterval(timeout);
    }, [ ms ]);

    return <span>{ currentValue }</span>;
};

export default React.memo(Timer);