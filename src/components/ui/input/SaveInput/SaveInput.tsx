import React, { useState } from 'react';
import Input, {
    InputProps,
    OnInputChangeHandler,
} from '@/components/ui/input/Input/Input.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';


export type SaveInputProps =
    {
        onSave: (value: string) => Promise<void>,
        onDiscard?: () => void,
        onChangeHandler?: OnInputChangeHandler,
        label: React.ReactNode,
    }
    & Omit<InputProps, 'onChangeHandler'>

const SaveInput: React.FC<SaveInputProps> = (props) => {
    const {
              onSave, onChangeHandler, onDiscard, title, defaultValue, ...other
          } = props;

    const [ value, setValue ]         = useState<string>(defaultValue?.toString() ?? '');
    const [ tempValue, setTempValue ] = useState<string>(defaultValue?.toString() ?? '');

    return (
        <Input
            extra={
                <Flex>
                    <Button
                        disabled={ tempValue === value }
                        onClick={ () => {
                            onSave(tempValue).then(() => setValue(tempValue));
                        } }
                        quad
                        size="small"
                        styleType={ tempValue !== value ? 'main' : 'default' }
                    >
                        <IconM size="small">save</IconM>
                    </Button>
                    <Button
                        disabled={ tempValue === value }
                        onClick={ () => {
                            onDiscard && onDiscard();
                            setTempValue(value);
                        } }
                        quad
                        size="small"
                        styleType={ tempValue !== value ? 'main' : 'default' }
                    >
                        <IconM size="small">scan_delete</IconM>
                    </Button>
                </Flex>
            }
            title={ title }
            { ...other }
            onChangeHandler={ (value) => {
                setTempValue(value);
                onChangeHandler && onChangeHandler(value);
            } }
            value={ tempValue }
        />
    );
};

export default React.memo(SaveInput);