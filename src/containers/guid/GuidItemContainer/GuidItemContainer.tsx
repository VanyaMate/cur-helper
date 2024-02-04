import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
import { GUID_PAGE, GUIDS_PAGE } from '@/constants/pages.ts';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import { useFetchThemeById } from '@/hooks/theme/fetch/useFetchThemeById.ts';
import React from 'react';


export type GuidItemContainerProps = {
    id: string
};

const GuidItemContainer: React.FC<GuidItemContainerProps> = (props) => {
    const { id } = props;

    const { data, loading, error } = useFetchThemeById(id);

    if (loading && !data) {
        return 'Loading..';
    }

    if (error) {
        return `Error: ${ error.message }`;
    }

    if (!data) {
        return '404';
    }

    return (
        <Section size="small">
            <Breadcrumb
                items={ [
                    {
                        label: <IconM>home</IconM>,
                        url  : `/${ GUIDS_PAGE }`,
                    },
                    ...data.breadcrumb.map((breadcrumb) => ({
                        label: breadcrumb.title,
                        url  : `/${ GUID_PAGE }/${ breadcrumb.publicId }`,
                    })),
                ]
                }
            />
            <Section size="extra-small">
                <Title>{ data.title }</Title>
                {
                    data.description ? <P item="second">{ data.description }</P> : null
                }
            </Section>
            {
                data.children.length ?
                <OrderedList
                    item="main"
                    list={ data.children.map((child) => (
                        <Link
                            key={ child.publicId }
                            to={ `/${ GUID_PAGE }/${ child.publicId }` }>{ child.title }</Link>
                    )) }
                /> : null
            }
            {
                data.additional ? <P item="invisible">{ data.additional }</P> : null
            }
            {
                data.body ? <P>{ data.body }</P> : null
            }
            <div>
                <Button styleType="default">Следующая тема</Button>
            </div>
            <div>// tests</div>
            <div>// FAQ</div>
        </Section>
    );
};

export default React.memo(GuidItemContainer);