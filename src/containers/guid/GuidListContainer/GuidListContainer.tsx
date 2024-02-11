import React from 'react';
import { useInput } from '@/hooks/ui/input/useInput.ts';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import { GUID_PAGE } from '@/constants/pages.ts';
import { useFetchThemeList } from '@/hooks/theme/fetch/useFetchThemeList.ts';


export type GuidListContainerProps = {};

const GuidListContainer: React.FC<GuidListContainerProps> = (props) => {
    const {}                       = props;
    const { data, loading, error } = useFetchThemeList();

    if (loading) {
        return 'loading..';
    }

    if (error) {
        return `Error: ${ error.message }`;
    }

    if (!data || !data.length) {
        return 'Not found';
    }

    return (
        <TileBox>
            {
                data.map((item) => (
                    <OrderedList
                        item="main"
                        key={ item.publicId }
                        list={
                            item.children.map((child) => (
                                <Link
                                    key={ child.publicId }
                                    to={ `/${ GUID_PAGE }/${ child.publicId }` }>
                                    { child.title }
                                </Link>
                            ))
                        }
                        prefix={ item.publicId.replace(/-/gi, '.') }
                        showPrefix
                        title={
                            <Link
                                to={ `/${ GUID_PAGE }/${ item.publicId }` }>
                                { item.title }
                            </Link>
                        }
                    />
                ))
            }
        </TileBox>
    );
};

export default React.memo(GuidListContainer);