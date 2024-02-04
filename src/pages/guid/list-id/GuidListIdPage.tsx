import React from 'react';
import GuidListIdContainer
    from '@/containers/guid/GuidListIdContainer/GuidListIdContainer.tsx';
import { useParams } from 'react-router-dom';
import { GUID_ID } from '@/constants/pages.ts';


export type GuidListIdPageProps = {};

const GuidListIdPage: React.FC<GuidListIdPageProps> = (props) => {
    const {}                    = props;
    const { [GUID_ID]: guidId } = useParams<{ [GUID_ID]: string }>();

    return <GuidListIdContainer id={ guidId ?? '' }/>;
};

export default React.memo(GuidListIdPage);