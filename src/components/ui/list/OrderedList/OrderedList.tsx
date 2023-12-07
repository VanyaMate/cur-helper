import React from 'react';
import css from './OrderedList.module.scss';
import Title from '@/components/ui/title/Title/Title.tsx';


export type OrderedListProps = {
    title: React.ReactNode | string;
    number: number;
    list: React.ReactNode[] | string[];
}

const OrderedList: React.FC<OrderedListProps> = (props) => {
    const { title, number, list } = props;

    return (
        <article className={ css.container }>
            <Title size={ 'small' } className={ css.title }>{ title }</Title>
            <ol className={ css.list }>
                {
                    list.map((item, index) =>
                        <li key={ index } className={ css.row }>
                            <div className={ css.number }>{ number }.{ index + 1 }</div>
                            <div className={ css.item }>{ item }</div>
                        </li>,
                    )
                }
            </ol>
        </article>
    );
};

export default React.memo(OrderedList);