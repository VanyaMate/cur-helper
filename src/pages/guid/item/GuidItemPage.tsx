import React from 'react';
import GuidItemContainer from '@/containers/guid/GuidItemContainer/GuidItemContainer.tsx';
import { GUID_ID } from '@/constants/pages.ts';
import { useParams } from 'react-router-dom';


export type GuidItemPageProps = {};

const GuidItemPage: React.FC<GuidItemPageProps> = (props) => {
    const {}                    = props;
    const { [GUID_ID]: guidId } = useParams<{ [GUID_ID]: string }>();

    return <GuidItemContainer id={ guidId ?? '' }/>;
};

export default React.memo(GuidItemPage);