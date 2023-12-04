import React, { useCallback } from 'react';


export type OnInputChangeHandler = (value: string) => any;

export type InputSizeType =
    'small' | 'medium' | 'large';

export type InputProps = {
    size?: InputSizeType;
    onChangeHandler: OnInputChangeHandler;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
    const { size, onChangeHandler, ...other } = props;

    const onChangeMethod = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeHandler(event.target.value);
    }, [ onChangeHandler ]);

    return (
        <input onChange={ onChangeMethod } { ...other }/>
    );
};

export default React.memo(Input);