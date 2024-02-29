import React, { useState } from 'react';
import css from './Toggle.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type ToggleSize =
    'small'
    | 'medium'
    | 'large';

export type ToggleProps = {
    active: boolean;
    size?: ToggleSize;
    onToggle?: (value: boolean) => void;
    onToggleAsync?: (value: boolean) => Promise<boolean>;
};

const Toggle: React.FC<ToggleProps> = (props) => {
    const { active, size, onToggle, onToggleAsync } = props;
    const [ loading, setLoading ]                                             = useState<boolean>(false);

    return (
        <div
            className={ cn(
                css.container,
                active && css.active,
                size === 'small' && css.small,
                size === 'large' && css.large,
                (size === 'medium' || !size) && css.medium,
                (!onToggleAsync && !onToggle) && css.disabled,
                loading && css.loading,
                'material-symbols-outlined',
            ) }
            onClick={ () => {
                if (onToggle) {
                    onToggle(!active);
                } else if (onToggleAsync) {
                    setLoading(true);
                    onToggleAsync(!active).finally(() => setLoading(false));
                }
            } }
        />
    );
};

export default React.memo(Toggle);