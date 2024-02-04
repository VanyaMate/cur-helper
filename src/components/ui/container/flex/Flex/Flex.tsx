import React from 'react';
import Section, { SectionProps } from '@/components/ui/container/Section/Section.tsx';
import { cn } from '@vanyamate/helpers/react/classname.ts';
import css from './Flex.module.scss';


export type FlexProps = SectionProps;

const Flex: React.FC<FlexProps> = (props) => {
    const { className, ...other } = props;

    return (
        <Section { ...other } className={ cn(className, css.container) }/>
    );
};

export default React.memo(Flex);