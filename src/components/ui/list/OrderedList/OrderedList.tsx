import React from 'react';
import css from './OrderedList.module.scss';
import Title from '@/components/ui/title/Title/Title.tsx';
import Section, {
    SectionItem,
    SectionType,
} from '@/components/ui/container/Section/Section.tsx';
import P from '@/components/ui/p/P/P.tsx';


export type OrderedListProps = {
    title?: React.ReactNode | string;
    prefix?: string;
    list: React.ReactNode[] | string[];
    item?: SectionItem;
    type?: SectionType;
    showPrefix?: boolean;
}

const OrderedList: React.FC<OrderedListProps> = (props) => {
    const { title, prefix, list, item, type, showPrefix } = props;

    return (
        <Section
            type={ type ?? 'section' }
            item={ item ?? undefined }
            size={ 'medium' }
            className={ css.container }
        >
            {
                title &&
                <Section item={ 'default' }>
                    <Title size={ 'small' } className={ css.title }>
                        {
                            showPrefix &&
                            <P item={ 'invisible' }>{ prefix }.</P>
                        }
                        { title }
                    </Title>
                </Section>
            }
            <ol className={ css.list }>
                {
                    list.map((item, index) =>
                        <li key={ index } className={ css.row }>
                            <div className={ css.number }>
                                { prefix ? `${ prefix }.` : '' }
                                { index + 1 }
                            </div>
                            <div className={ css.item }>{ item }</div>
                        </li>,
                    )
                }
            </ol>
        </Section>
    );
};

export default React.memo(OrderedList);