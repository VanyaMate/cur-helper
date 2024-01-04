import React from 'react';
import { cn } from '@vanyamate/helpers/react/classname';


export type IconMProps = {
    children: string;
    className?: string;
};

const IconM: React.FC<IconMProps> = (props) => {
    const { children, className } = props;

    return (
        <span className={ cn('material-symbols-outlined', className) }>{ children }</span>
    );
};

export default React.memo(IconM);