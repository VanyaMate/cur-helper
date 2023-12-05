import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import css from './MobilePageLayout.module.scss';
import MobileSiteNavigationButton
    from '@/components/mobile/site-navigation/MobileSiteNavigationButton/MobileSiteNavigationButton.tsx';


export type MobilePageLayoutProps = {}

const MobilePageLayout: React.FC<MobilePageLayoutProps> = (props) => {
    const {}           = props;
    const navigate     = useNavigate();
    const { pathname } = useLocation();

    return (
        <div className={ css.container }>
            <div className={ css.content }>
                <aside className={ css.header } style={ { borderRadius: 5 } }>
                    <div style={ { width: 80, overflow: 'hidden' } }>
                        <img
                            src={ 'https://russia.information-region.ru/static/images/logo-any.png' }
                            style={ {
                                width: '200px',
                            } }
                        />
                    </div>
                    ЦУР Помощник
                </aside>
                <Outlet/>
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
                    active={ pathname.split('/')[1]  === 'test' }
                    onClick={ () => {
                        navigate('/test');
                    } }
                />
                <MobileSiteNavigationButton
                    icon={ 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }
                    label={ 'Профиль' }
                    active={ pathname.split('/')[1]  === 'profile' }
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