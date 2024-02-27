import React from 'react';
import css from './WindowPopup.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import Section from '@/components/ui/container/Section/Section.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import { createPortal } from 'react-dom';


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

    return createPortal(
        <div className={ cn(css.container, controller.opened && css.opened) }>
            <div className={ css.background } onClick={ controller.close }/>
            <Section
                className={ css.viewport }
                type="main"
            >
                <Button
                    className={ css.closeButton }
                    onClick={ controller.close }
                    styleType="danger"
                >
                    <span className="material-symbols-outlined">close</span>
                </Button>
                <div className={ css.content }>
                    { children }
                </div>
            </Section>
        </div>
        , document.body,
    );
};

export default React.memo(WindowPopup);