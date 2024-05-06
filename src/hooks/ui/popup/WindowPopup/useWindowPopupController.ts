import {
    IWindowPopupController,
} from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import { useCallback, useMemo, useState } from 'react';


export const useWindowPopupController = function (): IWindowPopupController {
    const [ opened, setOpened ] = useState<boolean>(false);
    const close                 = useCallback(() => {
        setOpened(false);
        const root = document.body.querySelector('#root');
        if (root) {
            document.body.classList.remove('block-scroll');
            root.removeAttribute('inert');
        }
    }, [ setOpened ]);
    const open                  = useCallback(() => {
        setOpened(true);
        const root = document.body.querySelector('#root');
        if (root) {
            document.body.classList.add('block-scroll');
            root.setAttribute('inert', 'true');
        }
    }, [ setOpened ]);
    return useMemo(() => ({
        open, close, opened,
    }), [ opened, close, open ]);
};