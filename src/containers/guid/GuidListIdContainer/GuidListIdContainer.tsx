import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
import { GUID_PAGE } from '@/constants/pages.ts';
import { themesService } from '@/services/themes/themes.service.ts';
import { observer } from 'mobx-react-lite';
import Loader from '@/components/common/Loader/Loader.tsx';


export type GuidListIdContainerProps = {
    id: string;
};

const GuidListIdContainer: React.FC<GuidListIdContainerProps> = observer((props) => {
    const { id } = props;
    const data   = themesService.themeChildren.get(id);

    if (!data) {
        return <Loader/>;
    }

    return (
        <Section size="medium" tag="section">
            <Breadcrumb
                items={ data?.breadcrumb.map((item) => ({
                    label: item.title, url: `/guids/${ item.publicId }`,
                })) ?? [] }
            />
            <Title>
                <Link to={ `/${ GUID_PAGE }/${ data?.publicId }` }>{ data?.title }</Link>
            </Title>
            <TileBox>
                {
                    data ? data.children.map((child) => (
                        <OrderedList
                            item="main"
                            key={ child.publicId }
                            list={
                                child.children.map((child) => (
                                    <Link key={ child.publicId }
                                          to={ `/${ GUID_PAGE }/${ child.publicId }` }>
                                        { child.title }
                                    </Link>
                                ))
                            }
                            prefix={ child.publicId.replace(/-/gi, '.') }
                            showPrefix
                            title={
                                <Link key={ child.publicId }
                                      to={ `/${ GUID_PAGE }/${ child.publicId }` }>
                                    { child.title }
                                </Link>
                            }
                            type="article"
                        />
                    )) : null
                }
            </TileBox>
        </Section>
    );
});

export default GuidListIdContainer;