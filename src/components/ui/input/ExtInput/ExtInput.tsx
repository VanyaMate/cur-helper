import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { cn } from '@vanyamate/helpers/react/classname';
import css from './ExtInput.module.scss';


export type InputProps =
    {
        onValueChange: (value: string) => any;
        defaultValue?: string;
        placeholder?: string;
        debounce?: number;
        block?: boolean;
        loading?: boolean;
    }
    & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
    const {
              onValueChange,
              defaultValue,
              placeholder,
              debounce,
              block,
              className,
              loading,
              ...other
          }                           = props;
    const [ value, setValue ]         = useState<string>(defaultValue ?? '');
    const [ prevValue, setPrevValue ] = useState<string>(defaultValue ?? '');

    useEffect(() => {
        setPrevValue(defaultValue ?? value);
        setValue(defaultValue ?? value);
    }, [ defaultValue ]);

    useEffect(() => {
        if (prevValue === value) {
            return;
        }

        if (debounce) {
            const timeout = setTimeout(() => {
                onValueChange(value);
                setPrevValue(value);
            }, debounce);
            return () => clearTimeout(timeout);
        } else {
            onValueChange(value);
            setPrevValue(value);
        }
    }, [ value, onValueChange ]);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, [ value ]);

    return (
        <input
            { ...other }
            placeholder={ placeholder }
            onChange={ onChange }
            value={ value }
            className={ cn(css.container, block && css.block, className, loading && css.loading) }
        />
    );
};

export default React.memo(Input);