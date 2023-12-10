import React from 'react';
import css from './WindowPopup.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import Section from '@/components/ui/container/box/Section.tsx';


export interface IWindowPopupController {
    opened: boolean;
    close: () => any;
    open: () => any;
}

export type WindowPopupProps = {
    children: React.ReactNode | string;
    controller: IWindowPopupController;
}

const WindowPopup: React.FC<WindowPopupProps> = (props) => {
    const {
              children,
              controller,
          } = props;

    return (
        <div className={ cn(css.container, controller.opened && css.opened) }>
            <div onClick={ controller.close } className={ css.background }/>
            <Section
                item={ 'main' }
                className={ css.viewport }
            >
                <div onClick={ controller.close } className={ css.closeButton }/>
                <div className={ css.content }>
                    { children }
                </div>
            </Section>
        </div>
    );
};

export default React.memo(WindowPopup);