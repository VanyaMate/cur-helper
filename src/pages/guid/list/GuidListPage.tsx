import React from 'react';
import GuidListContainer from '@/containers/guid/GuidListContainer/GuidListContainer.tsx';


export type GuidListPageProps = {}

const GuidListPage: React.FC<GuidListPageProps> = (props) => {
    const {} = props;

    return <GuidListContainer/>;
};

export default React.memo(GuidListPage);