import React, { useCallback } from 'react';
import css from './Input.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '../../p/P/P';


export type OnInputChangeHandler = (value: string) => any;

export type InputSizeType =
    'small'
    | 'medium'
    | 'large';

export type InputProps =
    {
        inputSize?: InputSizeType;
        label?: React.ReactNode;
        extra?: React.ReactNode;
        onChangeHandler: OnInputChangeHandler;
    }
    & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
    // TODO: Add inputSize
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onChangeHandler, className, label, extra, inputSize, ...other } = props;

    const onChangeMethod = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeHandler(event.target.value);
    }, [ onChangeHandler ]);

    return (
        <Section block size="extra-small">
            {
                (label || extra)
                ? <SpaceBetween>
                    {
                        label ? <P type="invisible">{ label }</P> : null
                    }
                    {
                        extra
                    }
                </SpaceBetween> : null
            }
            <input onChange={ onChangeMethod } { ...other }
                   className={ cn(className, css.container) }/>
        </Section>
    );
};

export default React.memo(Input);