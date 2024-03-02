import React from 'react';
import css from './ColorPicker.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type ColorPickerSize =
    'small'
    | 'medium';

export type ColorPickerProps = {
    value: string;
    onColorChange: (value: string) => void;
    size?: ColorPickerSize;
};

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const { value, onColorChange, size } = props;

    return (
        <input
            className={ cn(
                css.container,
                size === 'medium' && css.medium,
                (size === 'small' || !size) && css.small,
            ) }
            onChange={ (e) => onColorChange(e.target.value) }
            type="color"
            value={ value }
        />
    );
};

export default React.memo(ColorPicker);