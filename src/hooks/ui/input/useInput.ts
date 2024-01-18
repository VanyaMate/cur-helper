import { OnInputChangeHandler } from '@/components/ui/input/Input/Input.tsx';
import { useCallback, useEffect, useMemo, useState } from 'react';


export type UseInputProps = {
    initialValue?: string;
    debounce?: number;
    onChange?: (value: string) => any;
}

export const useInput = function (props: UseInputProps): [ string, OnInputChangeHandler ] {
    const [ value, setValue ]         = useState<string>(props.initialValue ?? '');
    const [ nextValue, setNextValue ] = useState<string>(props.initialValue ?? '');

    const onChangeHandler = useCallback((value: string) => {
        setNextValue(value);

        if (!props.debounce) {
            setValue(value);
        }
    }, [ props.debounce ]);

    useEffect(() => {
        if (props.debounce) {
            const timeout = setTimeout(() => {
                setValue(nextValue);
            }, props.debounce);
            return () => clearTimeout(timeout);
        }
    }, [ nextValue, props.debounce ]);

    useEffect(() => {
        if (value === nextValue) {
            props.onChange && props.onChange(value);
        }
    }, [ value, nextValue, props, props.onChange ]);

    return useMemo(() => [ nextValue, onChangeHandler ], [ nextValue, onChangeHandler ]);
};