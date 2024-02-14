import React, { useEffect } from 'react';
import GuidListContainer from '@/containers/guid/GuidListContainer/GuidListContainer.tsx';
import { themesService } from '@/services/themes/themes.service.ts';
import { authService } from '@/services/auth/auth.service.ts';


export type GuidListPageProps = {}

const GuidListPage: React.FC<GuidListPageProps> = (props) => {
    const {} = props;

    useEffect(() => {
        themesService.getThemesList(authService.token[0]);
    }, []);

    return <GuidListContainer/>;
};

export default React.memo(GuidListPage);