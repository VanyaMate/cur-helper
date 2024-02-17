import React from 'react';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import { GUID_PAGE } from '@/constants/pages.ts';
import { themesService } from '@/services/themes/themes.service.ts';
import { observer } from 'mobx-react-lite';
import Loader from '@/components/common/Loader/Loader.tsx';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';


export type GuidListContainerProps = {};


const GuidListContainer: React.FC<GuidListContainerProps> = observer((props) => {
    const {}         = props;
    const pageGetter = usePageUrl();

    if (!themesService.themes.length) {
        return <Loader/>;
    }

    return (
        <TileBox>
            {
                themesService.themes.map((theme) => (
                    <OrderedList
                        item="main"
                        key={ theme.publicId }
                        list={
                            theme.children.map((child) => (
                                <Link
                                    key={ child.publicId }
                                    to={ `/${ GUID_PAGE }/${ child.publicId }` }>
                                    { child.title }
                                </Link>
                            ))
                        }
                        prefix={ theme.publicId.replace(/-/gi, '.') }
                        selfIndex={ theme.children.map((themeChild) => themeChild.publicId.replace(/-/g, '.')) }
                        showPrefix
                        title={
                            <Link
                                to={ pageGetter.guid(theme.publicId) }
                            >
                                { theme.title }
                            </Link>
                        }
                    />
                ))
            }
        </TileBox>
    );
});

export default React.memo(GuidListContainer);