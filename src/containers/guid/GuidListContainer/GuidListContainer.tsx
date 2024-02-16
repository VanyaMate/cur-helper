import React from 'react';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import { GUID_PAGE } from '@/constants/pages.ts';
import { themesService } from '@/services/themes/themes.service.ts';
import { observer } from 'mobx-react-lite';
import Loader from '@/components/common/Loader/Loader.tsx';


export type GuidListContainerProps = {};


const GuidListContainer: React.FC<GuidListContainerProps> = observer((props) => {
    const {} = props;

    if (!themesService.themes.length) {
        return <Loader/>;
    }

    return (
        <TileBox>
            {
                themesService.themes.map((item) => (
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
});

export default React.memo(GuidListContainer);