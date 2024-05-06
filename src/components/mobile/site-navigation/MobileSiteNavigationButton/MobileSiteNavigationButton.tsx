import React from 'react';
import css from './MobileSiteNavigationButton.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import Button from '@/components/ui/button/Button/Button.tsx';


export type MobileSiteNavigationButtonProps = {
    icon: string;
    label: string;
    active?: boolean;
    onClick: () => any;
}

const MobileSiteNavigationButton: React.FC<MobileSiteNavigationButtonProps> = (props) => {
    const { icon, label, active, onClick } = props;

    return (
        <Button className={ cn(css.container, active && css.active) }
                onClick={ onClick }
                styleType={ active ? 'main' : 'simple' }
        >
            <span className={ css.box }>
                <span className={ css.icon }
                      style={ { backgroundImage: `url('${ icon }')` } }/>
                <span className={ css.label }>{ label }</span>
            </span>
        </Button>
    );
};

export default React.memo(MobileSiteNavigationButton);