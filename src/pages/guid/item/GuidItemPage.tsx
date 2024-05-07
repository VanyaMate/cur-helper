import React, { useEffect } from 'react';
import { GUID_ID } from '@/constants/pages.ts';
import { useParams } from 'react-router-dom';
import { themesService } from '@/services/themes/themes.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import { observer } from 'mobx-react-lite';


const GuidItemContainer = React.lazy(() => import('@/containers/guid/GuidItemContainer/GuidItemContainer.tsx'));


export type GuidItemPageProps = {};

const GuidItemPage: React.FC<GuidItemPageProps> = observer((props) => {
    const {}                    = props;
    const { [GUID_ID]: guidId } = useParams<{ [GUID_ID]: string }>();

    useEffect(() => {
        if (guidId) {
            themesService.getThemeFullDataByPublicId(guidId, authService.token[0]);
        }
    }, [ guidId, authService.token[0] ]);

    return <GuidItemContainer id={ guidId ?? '' }/>;
});

export default React.memo(GuidItemPage);