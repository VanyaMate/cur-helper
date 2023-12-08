import React from 'react';
import { Link as LinkRouterDom, LinkProps as LinkRouterDomProps } from 'react-router-dom';
import css from './Link.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type LinkProps = LinkRouterDomProps;

const Link: React.FC<LinkProps> = (props) => {
    const { className, ...other } = props;

    return (
        <LinkRouterDom { ...other } className={ cn(className, css.container) }/>
    );
};

export default React.memo(Link);