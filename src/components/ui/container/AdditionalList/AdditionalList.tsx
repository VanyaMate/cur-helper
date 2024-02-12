import React from 'react';
import css from './AdditionalList.module.scss';
import Section, { SectionItem } from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '@/components/ui/p/P/P.tsx';


export type AdditionalListItem = {
    label: React.ReactNode | string;
    value: React.ReactNode | string;
}

export type AdditionalListProps = {
    list: AdditionalListItem[];
    item?: SectionItem;
}

const AdditionalList: React.FC<AdditionalListProps> = (props) => {
    const { list, item: sectionItem } = props;

    return (
        <Section className={ css.container } type="section">
            {
                list.map((item, index) => (
                    <SpaceBetween
                        className={ css.row }
                        item={ sectionItem }
                        key={ index }
                        type="article"
                    >
                        <P
                            className={ css.label }
                            item="invisible"
                            type="span"
                        >
                            { item.label }:
                        </P>
                        <P
                            className={ css.value }
                            type="span"
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