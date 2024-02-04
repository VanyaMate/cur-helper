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
            className={ css.container }
            item={ item ?? undefined }
            size="small"
            type={ type ?? 'section' }
        >
            {
                title ? <Section item="default">
                    <Title className={ css.title } size="small">
                        {
                            showPrefix ? <P item="invisible">{ prefix }.</P> : null
                        }
                        { title }
                    </Title>
                </Section> : null
            }
            {
                list.length ?
                <ol className={ css.list }>
                    {
                        list.map((item, index) =>
                            <li className={ css.row } key={ index }>
                                <div className={ css.number }>
                                    { prefix ? `${ prefix }.` : '' }
                                    { index + 1 }
                                </div>
                                <div className={ css.item }>{ item }</div>
                            </li>,
                        )
                    }
                </ol> : null
            }
        </Section>
    );
};

export default React.memo(OrderedList);