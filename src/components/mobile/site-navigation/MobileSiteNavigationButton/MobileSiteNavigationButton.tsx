import React from 'react';
import css from './MobileSiteNavigationButton.module.scss';
import { cn } from '@/helpers/cn.react.ts';


export type MobileSiteNavigationButtonProps = {
    icon: string;
    label: string;
    active?: boolean;
    onClick: () => any;
}

const MobileSiteNavigationButton: React.FC<MobileSiteNavigationButtonProps> = (props) => {
    const { icon, label, active, onClick } = props;

    return (
        <div className={ cn(css.container, active && css.active) } onClick={ onClick }>
            <div style={ { backgroundImage: `url('${ icon }')` } } className={ css.icon }/>
            <span className={ css.label }>{ label }</span>
        </div>
    );
};

export default React.memo(MobileSiteNavigationButton);