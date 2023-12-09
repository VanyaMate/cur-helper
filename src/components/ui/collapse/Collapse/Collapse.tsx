import React, { useCallback, useState } from 'react';
import Title from '@/components/ui/title/Title/Title.tsx';
import css from './Collapse.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import Section from '@/components/ui/container/box/Section.tsx';


export type CollapseProps = {
    opened?: boolean;
    title: React.ReactNode | string;
    children: React.ReactNode | string;
}

const Collapse: React.FC<CollapseProps> = (props) => {
    const {
              opened,
              title,
              children,
          }                 = props;
    const [ open, setOpen ] = useState<boolean>(opened ?? false);
    const toggle            = useCallback(() => {
        setOpen((prev) => !prev);
    }, [ open ]);

    return (
        <Section
            type={ 'article' }
            size={ 'small' }
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
            <div className={ css.content }>
                { children }
            </div>
        </Section>
    );
};

export default React.memo(Collapse);