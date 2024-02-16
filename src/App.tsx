import React from 'react';
import Pages from '@/pages/Pages.tsx';


export type AppProps = {}

// init workflow
const App: React.FC<AppProps> = (props) => {
    const {} = props;

    return <Pages/>;
};

export default React.memo(App);