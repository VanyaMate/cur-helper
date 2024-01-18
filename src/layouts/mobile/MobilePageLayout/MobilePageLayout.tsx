import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import css from './MobilePageLayout.module.scss';
import MobileSiteNavigationButton
    from '@/components/mobile/site-navigation/MobileSiteNavigationButton/MobileSiteNavigationButton.tsx';
import { cn } from '@vanyamate/helpers/react/classname';
import HeaderCur from '@/components/mobile/HeaderCur/HeaderCur.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import HeaderCurContainer
    from '@/containers/header/HeaderCurContainer/HeaderCurContainer';


export type MobilePageLayoutProps = {}

const MobilePageLayout: React.FC<MobilePageLayoutProps> = (props) => {
    const {}           = props;
    const navigate     = useNavigate();
    const { pathname } = useLocation();

    return (
        <div className={ css.container }>
            <div className={ css.content }>
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
                    active={ pathname === '/' }
                    onClick={ () => {
                        navigate('/');
                    } }
                />
                <MobileSiteNavigationButton
                    icon={ 'https://cdn-icons-png.flaticon.com/512/171/171322.png' }
                    label={ 'Учебник' }
                    active={ pathname.split('/')[1] === 'guid' }
                    onClick={ () => {
                        navigate('/guid');
                    } }
                />
                <MobileSiteNavigationButton
                    icon={ 'https://cdn-icons-png.flaticon.com/512/1950/1950630.png' }
                    label={ 'Тесты' }
                    active={ pathname.split('/')[1] === 'test' }
                    onClick={ () => {
                        navigate('/test');
                    } }
                />
                <MobileSiteNavigationButton
                    icon={ 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }
                    label={ 'Профиль' }
                    active={ pathname.split('/')[1] === 'profile' }
                    onClick={ () => {
                        navigate('/profile');
                    } }
                />
                <MobileSiteNavigationButton
                    icon={ 'https://cdn-icons-png.flaticon.com/512/56/56763.png' }
                    label={ 'Меню' }
                    onClick={ () => {

                    } }
                />
            </nav>
        </div>
    );
};

export default React.memo(MobilePageLayout);