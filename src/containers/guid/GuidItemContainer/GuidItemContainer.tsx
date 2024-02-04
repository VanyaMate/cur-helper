import React, { useEffect, useState } from 'react';
import { With } from '@/types/types.ts';
import {
    ThemeBreadcrumb,
    ThemeChildren,
    ThemeTests,
    ThemeType,
} from '@/types/theme/theme.types.ts';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
import { GUID_PAGE, GUIDS_PAGE } from '@/constants/pages.ts';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';


export type GuidItemContainerProps = {
    id: string
};

const GuidItemContainer: React.FC<GuidItemContainerProps> = (props) => {
    const { id } = props;

    // TODO: Temp
    const [ item, setItem ] = useState<With<ThemeType, [ ThemeChildren, ThemeBreadcrumb, ThemeTests ]> | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/themes/${ id }`)
            .then((response) => response.json())
            .then((data) => setItem(data));
    }, [ id ]);

    if (!item) {
        return '';
    }

    return (
        <Section size={ 'medium' }>
            <Breadcrumb
                items={ [
                    {
                        label: <IconM>home</IconM>,
                        url  : `/${ GUIDS_PAGE }`,
                    },
                    ...item.breadcrumb.map((breadcrumb) => ({
                        label: breadcrumb.title,
                        url  : `/${ GUID_PAGE }/${ breadcrumb.publicId }`,
                    })),
                ]
                }
            />
            <Section size={ 'extra-small' }>
                <Title>{ item.title }</Title>
                <P>{ item.description }</P>
            </Section>
            <OrderedList
                item={ 'main' }
                list={ item.children.map((child) => (
                    <Link
                        to={ `/${ GUID_PAGE }/${ child.publicId }` }>{ child.title }</Link>
                )) }
            />
            {
                item.additional &&
                <P item={ 'invisible' }>{ item.additional }</P>
            }
            <P>{ item.body }</P>
            <div>
                <Button styleType={ 'default' }>Следующая тема</Button>
            </div>
            <div>// tests</div>
            <div>// FAQ</div>
        </Section>
    );
};

export default React.memo(GuidItemContainer);