import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MobilePageLayout from '@/layouts/mobile/MobilePageLayout/MobilePageLayout.tsx';
import GuidPage from '@/pages/guid/GuidPage.tsx';
import TestPage from '@/pages/test/TestPage.tsx';
import ProfilePage from '@/pages/profile/ProfilePage.tsx';
import HomePage from '@/pages/home/HomePage.tsx';
import GuidItemPage from '@/pages/guid/item/GuidItemPage.tsx';


export type PagesProps = {}

const Pages: React.FC<PagesProps> = (props) => {
    const {} = props;

    return (
        <Routes>
            <Route path={ '/*' } element={ <MobilePageLayout/> }>
                <Route path={ 'test/*' }>
                    <Route path={ ':id' } element={ <TestPage/> }/>
                    <Route path={ '*' } element={ <TestPage/> }/>
                </Route>
                <Route path={ 'profile/*' }>
                    <Route path={ 'settings' } element={ <ProfilePage/> }/>
                    <Route path={ ':id' } element={ <ProfilePage/> }/>
                    <Route path={ '*' } element={ <ProfilePage/> }/>
                </Route>
                <Route path={ 'guid/*' }>
                    <Route path={ ':id' }>
                        <Route path={ ':themeId' } element={ <GuidItemPage/> }/>
                        <Route path={ '*' } element={ <GuidPage/> }/>
                    </Route>
                    <Route path={ '*' } element={ <GuidPage/> }/>
                </Route>
                <Route path={ '*' } element={ <HomePage/> }/>
            </Route>
        </Routes>
    );
};

export default React.memo(Pages);