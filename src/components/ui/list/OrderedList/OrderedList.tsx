import React from 'react';
import css from './OrderedList.module.scss';
import Title from '@/components/ui/title/Title/Title.tsx';
import Section, {
    SectionType,
    SectionTag,
} from '@/components/ui/container/Section/Section.tsx';
import P from '@/components/ui/p/P/P.tsx';


export type OrderedListProps = {
    title?: React.ReactNode | string;
    prefix?: string;
    list: React.ReactNode[] | string[];
    item?: SectionType;
    type?: SectionTag;
    showPrefix?: boolean;
    orderLabelGenerator?: (index: number) => string;
    selfIndex?: string[];
}

const OrderedList: React.FC<OrderedListProps> = (props) => {
    const {
              title,
              prefix,
              list,
              item,
              type,
              showPrefix,
              orderLabelGenerator,
              selfIndex,
          } = props;

    return (
        <Section
            className={ css.container }
            size="small"
            tag={ type ?? 'section' }
            type={ item ?? undefined }
        >
            {
                title ? <Section type="default">
                    <Title className={ css.title } size="small">
                        {
                            showPrefix ? <P type="invisible">{ prefix }.</P> : null
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
                                    {
                                        selfIndex ? selfIndex[index] :
                                        <>
                                            { prefix ? `${ prefix }.` : '' }
                                            { orderLabelGenerator
                                              ? orderLabelGenerator(index)
                                              : (index + 1) }
                                        </>
                                    }
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