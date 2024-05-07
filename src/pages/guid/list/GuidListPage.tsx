import React, { useEffect } from 'react';
import { themesService } from '@/services/themes/themes.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import { observer } from 'mobx-react-lite';


const GuidListContainer = React.lazy(() => import('@/containers/guid/GuidListContainer/GuidListContainer.tsx'));


export type GuidListPageProps = {}

const GuidListPage: React.FC<GuidListPageProps> = observer((props) => {
    const {} = props;

    useEffect(() => {
        themesService.getThemesList(authService.token[0]);
    }, [ authService.token[0] ]);

    return <GuidListContainer/>;
});

export default React.memo(GuidListPage);