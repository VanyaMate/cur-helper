import React from 'react';
import Pages from '@/pages/Pages.tsx';


export type AppProps = {}

const App: React.FC<AppProps> = (props) => {
    const {} = props;

    return (
        <Pages/>
    );
};

export default React.memo(App);