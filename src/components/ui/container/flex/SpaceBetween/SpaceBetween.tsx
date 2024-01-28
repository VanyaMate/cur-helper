import React from 'react';
import Section, { SectionProps } from '@/components/ui/container/Section/Section.tsx';
import { cn } from '@vanyamate/helpers/react/classname';
import css from './SpaceBetween.module.scss';


export type SpaceBetweenProps = SectionProps;

const SpaceBetween: React.FC<SpaceBetweenProps> = (props) => {
    const { className, ...other } = props;

    return (
        <Section { ...other } className={ cn(className, css.container) }/>
    );
};

export default SpaceBetween;