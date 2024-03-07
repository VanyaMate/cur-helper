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
        console.log('!fetch');
        return 'Not found';
    }

    if (fetch.pending) {
        console.log('pending');
        return <Loader/>;
    }

    if (!fetch.data) {
        console.log('!data');
        return 'Not found';
    }

    console.log('-rdy-');
    return children;
};

export default React.memo(FetchShow);