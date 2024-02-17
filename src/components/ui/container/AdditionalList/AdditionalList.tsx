import React from 'react';
import css from './AdditionalList.module.scss';
import Section, { SectionType } from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '@/components/ui/p/P/P.tsx';


export type AdditionalListItem = {
    label: React.ReactNode | string;
    value: React.ReactNode | string;
}

export type AdditionalListProps = {
    list: AdditionalListItem[];
    item?: SectionType;
}

const AdditionalList: React.FC<AdditionalListProps> = (props) => {
    const { list, item: sectionItem } = props;

    return (
        <Section className={ css.container } tag="section">
            {
                list.map((item, index) => (
                    <SpaceBetween
                        className={ css.row }
                        key={ index }
                        tag="article"
                        type={ sectionItem }
                    >
                        <P
                            className={ css.label }
                            tag="span"
                            type="invisible"
                        >
                            { item.label }:
                        </P>
                        <P
                            className={ css.value }
                            tag="span"
                        >
                            { item.value }
                        </P>
                    </SpaceBetween>
                ))
            }
        </Section>
    );
};

export default React.memo(AdditionalList);