import React from 'react';
import Toggle, { ToggleProps } from '@/components/ui/input/checkbox/Toggle/Toggle.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import css from './LabelToggle.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type LabelToggleSide =
    'left'
    | 'right'

export type LabelToggleProps =
    {
        activeText?: React.ReactNode;
        unActiveText?: React.ReactNode;
        side?: LabelToggleSide;
    }
    & ToggleProps;

const LabelToggle: React.FC<LabelToggleProps> = (props) => {
    const {
              activeText, unActiveText, side, active, onToggle, onToggleAsync, ...other
          } = props;

    return (
        <Flex className={ cn(
            css.container,
            side === 'right' ? css.right : css.left,
        ) }>
            { active ? activeText : null }
            { !active ? unActiveText : null }
            {
                (onToggle || onToggleAsync)
                ? <Toggle
                    active={ active }
                    onToggle={ onToggle }
                    onToggleAsync={ onToggleAsync }
                    { ...other }
                />
                : null
            }
        </Flex>
    );
};

export default React.memo(LabelToggle);