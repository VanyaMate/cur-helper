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
        <Section type={ 'section' } className={ css.container }>
            {
                list.map((item, index) => (
                    <SpaceBetween
                        type={ 'article' }
                        item={ sectionItem }
                        className={ css.row }
                        key={ index }
                    >
                        <P
                            type={ 'span' }
                            item={ 'invisible' }
                            className={ css.label }
                        >
                            { item.label }:
                        </P>
                        <P
                            type={ 'span' }
                            className={ css.value }
                        >
                            { item.value }
                        </P>
                    </SpaceBetween>
                ))
            }
        </Section>
    );
};

export default AdditionalList;