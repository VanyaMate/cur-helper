import React from 'react';
import Pages from '@/pages/Pages.tsx';
import { useAuthActions } from '@/hooks/auth/useAuthActions.ts';


export type AppProps = {}

// init workflow
const App: React.FC<AppProps> = (props) => {
    const {}          = props;
    const { refresh } = useAuthActions();

    refresh();

    return <Pages/>;
};

export default React.memo(App);