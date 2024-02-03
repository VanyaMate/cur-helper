import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import css from './MobilePageLayout.module.scss';
import MobileSiteNavigationButton
    from '@/components/mobile/site-navigation/MobileSiteNavigationButton/MobileSiteNavigationButton.tsx';
import { cn } from '@vanyamate/helpers/react/classname';
import HeaderCurContainer
    from '@/containers/header/HeaderCurContainer/HeaderCurContainer';
import {
    ADMIN_PAGE,
    GUID_PAGE,
    HOME_PAGE,
    PROFILE_PAGE,
    TEST_PAGE,
} from '@/constants/pages.ts';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import Button from '@/components/ui/button/Button/Button.tsx';


export type MobilePageLayoutProps = {}

const MobilePageLayout: React.FC<MobilePageLayoutProps> = (props) => {
    const {}             = props;
    const navigate       = useNavigate();
    const { pathname }   = useLocation();
    const menuController = useWindowPopupController();

    return (
        <div className={ css.container }>
            <WindowPopup controller={ menuController }>
                <Button onClick={ () => navigate(`/${ ADMIN_PAGE }`) }>Admin</Button>
            </WindowPopup>
            <div className={ cn(css.content, menuController.opened && 'blur') }>
                <aside className={ cn(css.header, css.content_width) }>
                    <HeaderCurContainer/>
                </aside>
                <div className={ css.content_width }>
                    <Outlet/>
                </div>
            </div>
            <nav className={ css.nav }>
                <MobileSiteNavigationButton
                    icon={ 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }
                    label={ 'Общее' }
                    active={ pathname === `/${ HOME_PAGE }` }
                    onClick={ () => {
                        navigate(`/${ HOME_PAGE }`);
                    } }
                />
                <MobileSiteNavigationButton
                    icon={ 'https://cdn-icons-png.flaticon.com/512/171/171322.png' }
                    label={ 'Учебник' }
                    active={ pathname.split('/')[1] === GUID_PAGE }
                    onClick={ () => {
                        navigate(`/${ GUID_PAGE }`);
                    } }
                />
                <MobileSiteNavigationButton
                    icon={ 'https://cdn-icons-png.flaticon.com/512/1950/1950630.png' }
                    label={ 'Тесты' }
                    active={ pathname.split('/')[1] === TEST_PAGE }
                    onClick={ () => {
                        navigate(`/${ TEST_PAGE }`);
                    } }
                />
                <MobileSiteNavigationButton
                    icon={ 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }
                    label={ 'Профиль' }
                    active={ pathname.split('/')[1] === PROFILE_PAGE }
                    onClick={ () => {
                        navigate(`/${ PROFILE_PAGE }`);
                    } }
                />
                <MobileSiteNavigationButton
                    icon={ 'https://cdn-icons-png.flaticon.com/512/56/56763.png' }
                    label={ 'Меню' }
                    onClick={ () => {
                        menuController.open();
                    } }
                />
            </nav>
        </div>
    );
};

export default React.memo(MobilePageLayout);