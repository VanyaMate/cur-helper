import React from 'react';
import { FetchData } from '@/services/types.ts';
import Loader from '@/components/common/Loader/Loader.tsx';


export type FetchShowProps = {
    fetch: FetchData<any>;
    children: React.ReactNode;
};

const FetchShow: React.FC<FetchShowProps> = (props) => {
    const { fetch, children } = props;

    if (!fetch) {
        return 'Not found';
    }

    if (fetch.pending && !fetch.data) {
        return <Loader/>;
    }

    if (!fetch.data) {
        return 'Not found';
    }

    return children;
};

export default React.memo(FetchShow);