import React from 'react';
import { Outlet } from 'react-router-dom';
import css from './MobilePageLayout.module.scss';


export type MobilePageLayoutProps = {}

const MobilePageLayout: React.FC<MobilePageLayoutProps> = (props) => {
    const {} = props;

    return (
        <div className={ css.container }>
            <div className={ css.content }>
                <aside className={ css.header }>
                    [ Logo ] Cur Helper
                </aside>
                <Outlet/>
            </div>
            <nav className={ css.nav }>
                // nav
            </nav>
        </div>
    );
};

export default React.memo(MobilePageLayout);