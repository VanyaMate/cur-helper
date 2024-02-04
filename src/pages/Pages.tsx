import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MobilePageLayout from '@/layouts/mobile/MobilePageLayout/MobilePageLayout.tsx';
import TestPage from '@/pages/test/TestPage.tsx';
import ProfilePage from '@/pages/profile/ProfilePage.tsx';
import HomePage from '@/pages/home/HomePage.tsx';
import GuidItemPage from '@/pages/guid/item/GuidItemPage.tsx';
import TestItemPage from '@/pages/test/item/TestItemPage.tsx';
import TestPassingPage from '@/pages/test/passing/TestPassingPage.tsx';
import TestResultPage from '@/pages/test/result/TestResultPage.tsx';
import {
    ARTICLE_ID,
    ARTICLE_PAGE,
    GUID_ID,
    GUID_PAGE, GUIDS_PAGE, HOME_PAGE,
    PROFILE_PAGE, PROFILE_SETTINGS_PAGE, TEST_ID,
    TEST_PAGE,
    TEST_PASSING_PAGE,
    TEST_RESULT_PAGE, THEME_ID,
} from '@/constants/pages.ts';
import ArticleItemPage from '@/pages/article/item/ArticleItemPage.tsx';
import ArticlesPage from '@/pages/article/ArticlesPage.tsx';
import MobileAdminPageLayout
    from '@/layouts/mobile/MobilePageLayout/MobileAdminPageLayout.tsx';
import AdminGuidListPage from '@/pages/admin/AdminGuidListPage/AdminGuidListPage.tsx';
import AdminHomePage from '@/pages/admin/AdminHomePage/AdminHomePage.tsx';
import AdminTestListPage from '@/pages/admin/AdminTestListPage/AdminTestListPage.tsx';
import GuidListIdPage from '@/pages/guid/list-id/GuidListIdPage.tsx';
import GuidListPage from '@/pages/guid/list/GuidListPage.tsx';


export type PagesProps = {}

const Pages: React.FC<PagesProps> = (props) => {
    const {} = props;

    return (
        <Routes>
            <Route path={ '/admin/*' } element={ <MobileAdminPageLayout/> }>
                <Route path={ `${ GUID_PAGE }/:${ THEME_ID }` }
                       element={ <AdminGuidListPage/> }/>
                <Route path={ `${ GUID_PAGE }` } element={ <AdminGuidListPage/> }/>
                <Route path={ `${ TEST_PAGE }/:${ TEST_ID }` }
                       element={ <AdminTestListPage/> }/>
                <Route path={ `${ TEST_PAGE }` } element={ <AdminTestListPage/> }/>
                <Route path={ `${ HOME_PAGE }` } element={ <AdminHomePage/> }/>
            </Route>
            <Route path={ '/*' } element={ <MobilePageLayout/> }>
                <Route path={ `${ TEST_PAGE }/*` }>
                    <Route path={ TEST_PASSING_PAGE } element={ <TestPassingPage/> }/>
                    <Route path={ TEST_RESULT_PAGE } element={ <TestResultPage/> }/>
                    <Route path={ `:${ THEME_ID }` }>
                        <Route path={ `:${ TEST_ID }` } element={ <TestItemPage/> }/>
                        <Route path={ '*' } element={ <TestPage/> }/>
                    </Route>
                    <Route path={ '*' } element={ <TestPage/> }/>
                </Route>
                <Route path={ `${ PROFILE_PAGE }/*` }>
                    <Route path={ PROFILE_SETTINGS_PAGE } element={ <ProfilePage/> }/>
                    <Route path={ ':login' } element={ <ProfilePage/> }/>
                    <Route path={ '*' } element={ <ProfilePage/> }/>
                </Route>
                <Route path={ `${ GUID_PAGE }/*` }>
                    <Route path={ `:${ GUID_ID }` } element={ <GuidItemPage/> }/>
                    <Route path={ '*' } element={ <GuidListPage/> }/>
                </Route>

                <Route path={ `${ GUIDS_PAGE }/*` }>
                    <Route path={ `:${ GUID_ID }` } element={ <GuidListIdPage/> }/>
                    <Route path={ '*' } element={ <GuidListPage/> }/>
                </Route>
                <Route path={ `${ ARTICLE_PAGE }/*` }>
                    <Route path={ `:${ ARTICLE_ID }` } element={ <ArticleItemPage/> }/>
                    <Route path={ '*' } element={ <ArticlesPage/> }/>
                </Route>
                <Route path={ '*' } element={ <HomePage/> }/>
            </Route>
        </Routes>
    );
};

export default React.memo(Pages);