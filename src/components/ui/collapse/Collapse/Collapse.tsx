import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Title from '@/components/ui/title/Title/Title.tsx';
import css from './Collapse.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import Section, { SectionItem, SectionType } from '@/components/ui/container/box/Section.tsx';


export type CollapseProps = {
    opened?: boolean;
    title: React.ReactNode | string;
    children: React.ReactNode | string;
    item?: SectionItem;
}

const Collapse: React.FC<CollapseProps> = (props) => {
    const {
              opened,
              title,
              children,
              item,
          }                                   = props;
    const [ open, setOpen ]                   = useState<boolean>(opened ?? false);
    const toggle                              = useCallback(() => {
        setOpen((prev) => !prev);
    }, [ open ]);
/*    const ref                                 = useRef<HTMLDivElement | null>(null);
    const [ contentHeight, setContentHeight ] = useState<number>(0);

    useEffect(() => {
        if (ref.current) {
            console.log('ref.current', ref.current?.className);
            const child: HTMLElement | null = ref.current?.querySelector('article');
            console.log('child', child?.textContent);
            setContentHeight(ref.current?.querySelector('article')?.scrollHeight ?? 0);
        } else {
            setContentHeight(0);
        }
    }, [ ref.current ]);*/

    return (
        <Section
            type={ 'article' }
            size={ 'small' }
            item={ item }
            className={ cn(css.container, open && css.opened) }
        >
            {
                title &&
                <Title size={ 'small' } className={ css.title } onClick={ toggle }>
                    <span className={ css.text }>
                    { title }
                    </span>
                    <span className={ cn('material-symbols-outlined', css.icon) }>expand_more</span>
                </Title>
            }
            <div
                className={ css.content }
                /*ref={ ref }
                 style={ { height: open ? `${ contentHeight }px` : '0px' } }*/
            >
                { children }
            </div>
        </Section>
    );
};

export default React.memo(Collapse);