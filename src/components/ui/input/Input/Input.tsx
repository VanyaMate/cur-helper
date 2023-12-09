import React, { useCallback } from 'react';
import css from './Input.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type OnInputChangeHandler = (value: string) => any;

export type InputSizeType =
    'small' | 'medium' | 'large';

export type InputProps = {
    size?: InputSizeType;
    onChangeHandler: OnInputChangeHandler;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
    const { size, onChangeHandler, className, ...other } = props;

    const onChangeMethod = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeHandler(event.target.value);
    }, [ onChangeHandler ]);

    return (
        <input onChange={ onChangeMethod } { ...other } className={ cn(className, css.container) }/>
    );
};

export default React.memo(Input);