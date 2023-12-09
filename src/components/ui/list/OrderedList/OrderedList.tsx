import React from 'react';
import css from './OrderedList.module.scss';
import Title from '@/components/ui/title/Title/Title.tsx';
import Section from '@/components/ui/container/box/Section.tsx';


export type OrderedListProps = {
    title?: React.ReactNode | string;
    prefix?: string;
    list: React.ReactNode[] | string[];
}

const OrderedList: React.FC<OrderedListProps> = (props) => {
    const { title, prefix, list } = props;

    return (
        <Section
            type={ 'article' }
            size={ 'medium' }
            className={ css.container }
        >
            {
                title &&
                <Title size={ 'small' } className={ css.title }>{ title }</Title>
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