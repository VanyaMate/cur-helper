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
    TEST_RESULT_PAGE, TESTS_PAGE, THEME_ID,
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
import TestsLayout from '@/layouts/tests/TestsLayout/TestsLayout.tsx';
import ThemesLayout from '@/layouts/themes/ThemesLayout/ThemesLayout.tsx';


export type PagesProps = {}

const Pages: React.FC<PagesProps> = (props) => {
    const {} = props;

    return (
        <Routes>
            <Route element={ <MobileAdminPageLayout/> } path={ '/admin/*' }>
                <Route element={ <AdminGuidListPage/> }
                       path={ `${ GUID_PAGE }/:${ THEME_ID }` }/>
                <Route element={ <AdminGuidListPage/> } path={ `${ GUID_PAGE }` }/>
                <Route element={ <AdminTestListPage/> }
                       path={ `${ TEST_PAGE }/:${ TEST_ID }` }/>
                <Route element={ <AdminTestListPage/> } path={ `${ TEST_PAGE }` }/>
                <Route element={ <AdminHomePage/> } path={ `${ HOME_PAGE }` }/>
            </Route>
            <Route element={ <MobilePageLayout/> } path={ '/*' }>
                <Route element={ <TestsLayout/> } path={ `${ TESTS_PAGE }/*` }>
                    <Route element={ <TestPage/> } path={ `${ TEST_ID }` }/>
                    <Route element={ <TestPage/> } path="*"/>
                </Route>
                <Route path={ `${ TEST_PAGE }/*` }>
                    <Route element={ <TestPassingPage/> }
                           path={ `${ TEST_PASSING_PAGE }/:${ TEST_ID }` }/>
                    <Route element={ <TestResultPage/> }
                           path={ `${ TEST_RESULT_PAGE }/:${ TEST_ID }` }/>
                    <Route element={ <TestItemPage/> } path={ `:${ TEST_ID }` }/>
                </Route>
                <Route path={ `${ PROFILE_PAGE }/*` }>
                    <Route element={ <ProfilePage/> } path={ PROFILE_SETTINGS_PAGE }/>
                    <Route element={ <ProfilePage/> } path=":login"/>
                    <Route element={ <ProfilePage/> } path="*"/>
                </Route>
                <Route path={ `${ GUID_PAGE }/*` }>
                    <Route element={ <GuidItemPage/> } path={ `:${ GUID_ID }` }/>
                    <Route element={ <GuidListPage/> } path="*"/>
                </Route>

                <Route element={ <ThemesLayout/> } path={ `${ GUIDS_PAGE }/*` }>
                    <Route element={ <GuidListIdPage/> } path={ `:${ GUID_ID }` }/>
                    <Route element={ <GuidListPage/> } path="*"/>
                </Route>
                <Route path={ `${ ARTICLE_PAGE }/*` }>
                    <Route element={ <ArticleItemPage/> } path={ `:${ ARTICLE_ID }` }/>
                    <Route element={ <ArticlesPage/> } path="*"/>
                </Route>
                <Route element={ <HomePage/> } path="*"/>
            </Route>
        </Routes>
    );
};

export default React.memo(Pages);