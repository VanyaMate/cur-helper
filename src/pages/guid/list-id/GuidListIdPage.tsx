import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GUID_ID } from '@/constants/pages.ts';
import { themesService } from '@/services/themes/themes.service.ts';
import { authService } from '@/services/auth/auth.service.ts';


const GuidListIdContainer
          = React.lazy(() => import('@/containers/guid/GuidListIdContainer/GuidListIdContainer.tsx'));


export type GuidListIdPageProps = {};

const GuidListIdPage: React.FC<GuidListIdPageProps> = (props) => {
    const {}                    = props;
    const { [GUID_ID]: guidId } = useParams<{ [GUID_ID]: string }>();

    useEffect(() => {
        if (guidId) {
            themesService.getThemeListById(guidId, authService.token[0]);
        }
    }, [ guidId ]);

    return <GuidListIdContainer id={ guidId ?? '' }/>;
};

export default React.memo(GuidListIdPage);