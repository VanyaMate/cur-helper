import React, { useCallback } from 'react';
import Link from '@/components/ui/link/Link/Link.tsx';
import css from './HeaderCur.module.scss';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';


export type HeaderCurProps = {
    region: string;
};

const HeaderCur: React.FC<HeaderCurProps> = (props) => {
    const { region } = props;

    const toggleTheme = useCallback(() => {
        const body: HTMLBodyElement = document.querySelector('body')!;
        const isDark: boolean       = body.classList.contains('dark');
        if (isDark) {
            body.classList.remove('dark');
            body.classList.add('dark-blue');
        } else {
            body.classList.add('dark');
            body.classList.remove('dark-blue');
        }
    }, []);

    return (
        <SpaceBetween type={ 'section' } item={ 'main' } className={ css.container }>
            <SpaceBetween>
                <img
                    src={ '/cur-logo.png' }
                    className={ css.logo }
                />
                <Link to={ '#' }>{ region }</Link>
            </SpaceBetween>
            <Button onClick={ toggleTheme }
                    styleType={ 'main' }><IconM>refresh</IconM></Button>
        </SpaceBetween>
    );
};

export default React.memo(HeaderCur);