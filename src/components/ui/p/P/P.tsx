import React from 'react';
import css from './P.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type PProps = React.HTMLAttributes<HTMLParagraphElement>;

const P: React.FC<PProps> = (props) => {
    const { className, ...other } = props;

    return (
        <div className={ cn(className, css.container) } { ...other }/>
    );
};

export default React.memo(P);