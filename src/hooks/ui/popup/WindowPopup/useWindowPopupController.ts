import {
    IWindowPopupController,
} from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import { useCallback, useMemo, useState } from 'react';


export const useWindowPopupController = function (): IWindowPopupController {
    const [ opened, setOpened ] = useState<boolean>(false);
    const close                 = useCallback(() => {
        setOpened(false);
    }, [ setOpened ]);
    const open                  = useCallback(() => {
        setOpened(true);
    }, [ setOpened ]);
    return useMemo(() => ({
        open, close, opened,
    }), [ opened, close, open ]);
};