import React, { Suspense } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import css from './MobilePageLayout.module.scss';
import MobileSiteNavigationButton
    from '@/components/mobile/site-navigation/MobileSiteNavigationButton/MobileSiteNavigationButton.tsx';
import { cn } from '@vanyamate/helpers/react/classname';
import HeaderCurContainer
    from '@/containers/header/HeaderCurContainer/HeaderCurContainer';
import {
    ADMIN_PAGE, GUID_PAGE,
    HOME_PAGE,
    PROFILE_PAGE, TEST_PAGE,
} from '@/constants/pages.ts';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import Button from '@/components/ui/button/Button/Button.tsx';
import Loader from '@/components/common/Loader/Loader.tsx';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { userService } from '@/services/user/user.service.ts';
import { useAuthActions } from '@/hooks/auth/useAuthActions.ts';
import { observer } from 'mobx-react-lite';
import {
    UserAuthForm,
} from '@/widgets/user/form/UserAuthForm/UserAuthForm.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';


export type MobilePageLayoutProps = {}

const MobilePageLayout: React.FC<MobilePageLayoutProps> = observer((props) => {
    const {}             = props;
    const navigate       = useNavigate();
    const pageGetter     = usePageUrl();
    const { pathname }   = useLocation();
    const menuController = useWindowPopupController();
    const authActions    = useAuthActions();
    const authPopup      = useWindowPopupController();

    return (
        <div className={ css.container }>
            <WindowPopup controller={ authPopup }>
                <UserAuthForm onFinish={ authPopup.close }/>
            </WindowPopup>
            <WindowPopup controller={ menuController }>
                {
                    userService.user?.login
                    ? <Section>
                        {
                            userService.user?.verified
                            ? <Button
                                onClick={ () => navigate(`/${ ADMIN_PAGE }`) }>Админ-панель</Button>
                            : null
                        }
                        <Button onClick={ authActions.logout }
                                styleType="danger">Выйти</Button>
                    </Section>
                    : null
                }
            </WindowPopup>
            <div className={ cn(css.content, menuController.opened && 'blur') }>
                <aside className={ cn(css.header, css.content_width) }>
                    <HeaderCurContainer/>
                </aside>
                <div className={ css.content_width }>
                    <Suspense fallback={ <Loader/> }>
                        <Outlet/>
                    </Suspense>
                </div>
            </div>
            <nav className={ css.nav }>
                <MobileSiteNavigationButton
                    active={ pathname === `/${ HOME_PAGE }` }
                    icon="https://cdn-icons-png.flaticon.com/512/25/25694.png"
                    label="Общее"
                    onClick={ () => {
                        navigate(pageGetter.home());
                    } }
                />
                <MobileSiteNavigationButton
                    active={ new RegExp(`^/${GUID_PAGE}`).test(pathname) }
                    icon="https://cdn-icons-png.flaticon.com/512/171/171322.png"
                    label="Учебник"
                    onClick={ () => {
                        navigate(pageGetter.guids());
                    } }
                />
                <MobileSiteNavigationButton
                    active={ new RegExp(`^/${TEST_PAGE}`).test(pathname) }
                    icon="https://cdn-icons-png.flaticon.com/512/1950/1950630.png"
                    label="Тесты"
                    onClick={ () => {
                        navigate(pageGetter.tests());
                    } }
                />
                {
                    userService.user?.login
                    ? <MobileSiteNavigationButton
                        active={ new RegExp(`^/${PROFILE_PAGE}`).test(pathname) }
                        icon="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                        label="Профиль"
                        onClick={ () => {
                            navigate(pageGetter.profile(userService.user?.login));
                        } }
                    />
                    : <MobileSiteNavigationButton
                        icon="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                        label="Войти"
                        onClick={ () => authPopup.open() }
                    />
                }
                <MobileSiteNavigationButton
                    icon="https://cdn-icons-png.flaticon.com/512/56/56763.png"
                    label="Меню"
                    onClick={ () => {
                        menuController.open();
                    } }
                />
            </nav>
        </div>
    );
});

export default React.memo(MobilePageLayout);