import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MobilePageLayout from '@/layouts/mobile/MobilePageLayout/MobilePageLayout.tsx';
import TestPage from '@/pages/test/list/TestListPage.tsx';
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
    GUID_PAGE,
    GUIDS_PAGE,
    HOME_PAGE,
    PROFILE_PAGE,
    PROFILE_SETTINGS_PAGE,
    QUESTION_ID,
    QUESTION_PAGE,
    QUESTIONS_PAGE,
    TEST_ID,
    TEST_PAGE,
    TEST_PASSING_PAGE,
    TEST_RESULT_PAGE,
    TESTS_PAGE,
} from '@/constants/pages.ts';
import ArticleItemPage from '@/pages/article/item/ArticleItemPage.tsx';
import ArticlesPage from '@/pages/article/ArticlesPage.tsx';
import GuidListIdPage from '@/pages/guid/list-id/GuidListIdPage.tsx';
import GuidListPage from '@/pages/guid/list/GuidListPage.tsx';
import TestsLayout from '@/layouts/tests/TestsLayout/TestsLayout.tsx';
import ThemesLayout from '@/layouts/themes/ThemesLayout/ThemesLayout.tsx';

import MobileAdminPageLayout
    from '@/layouts/mobile/MobilePageLayout/MobileAdminPageLayout.tsx';
import AdminGuidListPage
    from '@/pages/admin/guid/AdminGuidListPage/AdminGuidListPage.tsx';
import AdminHomePage from '@/pages/admin/AdminHomePage/AdminHomePage.tsx';
import AdminTestListPage
    from '@/pages/admin/test/AdminTestListPage/AdminTestListPage.tsx';
import AdminGuidRedactPage
    from '@/pages/admin/guid/AdminGuidRedactPage/AdminGuidRedactPage.tsx';
import AdminTestRedactPage
    from '@/pages/admin/test/AdminTestRedactPage/AdminTestRedactPage.tsx';
import AdminQuestionRedactPage
    from '@/pages/admin/question/AdminQuestionRedactPage/AdminQuestionRedactPage.tsx';
import AdminQuestionListPage
    from '@/pages/admin/question/AdminQuestionListPage/AdminQuestionListPage.tsx';


export type PagesProps = {}


const Pages: React.FC<PagesProps> = (props) => {
    const {} = props;

    return (
        <Routes>
            <Route element={ <MobileAdminPageLayout/> } path={ '/admin/*' }>
                <Route element={ <AdminGuidRedactPage/> }
                       path={ `${ GUID_PAGE }/:${ GUID_ID }` }/>
                <Route element={ <AdminGuidListPage/> } path={ `${ GUIDS_PAGE }` }/>
                <Route element={ <AdminTestRedactPage/> }
                       path={ `${ TEST_PAGE }/:${ TEST_ID }` }/>
                <Route element={ <AdminTestListPage/> } path={ `${ TESTS_PAGE }` }/>
                <Route element={ <AdminQuestionListPage/> } path={ QUESTIONS_PAGE }/>
                <Route element={ <AdminQuestionRedactPage/> }
                       path={ `${ QUESTION_PAGE }/:${ QUESTION_ID }` }/>
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