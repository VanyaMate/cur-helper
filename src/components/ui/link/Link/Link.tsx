import React from 'react';
import { Link as LinkRouterDom, LinkProps as LinkRouterDomProps } from 'react-router-dom';
import css from './Link.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type LinkSize =
    'small' | 'medium';

export type LinkProps = LinkRouterDomProps & {
    size?: LinkSize;
};

const Link: React.FC<LinkProps> = (props) => {
    const { className, size, ...other } = props;

    return (
        <LinkRouterDom { ...other } className={ cn(
            className,
            css.container,
            size === 'small' && css.small,
        ) }/>
    );
};

export default React.memo(Link);