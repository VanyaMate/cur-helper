import React, { useEffect } from 'react';
import { themesService } from '@/services/themes/themes.service.ts';
import { authService } from '@/services/auth/auth.service.ts';


const GuidListContainer = React.lazy(() => import('@/containers/guid/GuidListContainer/GuidListContainer.tsx'));


export type GuidListPageProps = {}

const GuidListPage: React.FC<GuidListPageProps> = (props) => {
    const {} = props;

    useEffect(() => {
        themesService.getThemesList(authService.token[0]);
    }, []);

    return <GuidListContainer/>;
};

export default React.memo(GuidListPage);