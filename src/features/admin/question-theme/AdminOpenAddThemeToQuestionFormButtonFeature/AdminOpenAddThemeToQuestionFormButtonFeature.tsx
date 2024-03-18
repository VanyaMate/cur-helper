import React, { useCallback, useState } from 'react';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import { AdminThemeShortType } from '@vanyamate/cur-helper-types';


export type AdminOpenAddThemeToQuestionFormButtonFeatureProps = {};

const AdminOpenAddThemeToQuestionFormButtonFeature: React.FC<AdminOpenAddThemeToQuestionFormButtonFeatureProps> = (props) => {
    const {}                       = props;
    const themeToQuestionFormPopup = useWindowPopupController();
    const [ themes, setThemes ]    = useState<AdminThemeShortType[]>([]);

    const onOpenPopupHandler = useCallback(() => {
        setThemes([]);
        themeToQuestionFormPopup.open();
    }, []);

    // Добавить endpoint + сервис на сервер
    // Открыть -> Загрузить

    return (
        <>
            <WindowPopup controller={ themeToQuestionFormPopup }>
                <TitleSection
                    title="Не подключенные темы"
                >
                    Section
                </TitleSection>
            </WindowPopup>
            <Button
                onClick={ onOpenPopupHandler }
                quad
                size="small"
            >
                <IconM size="small">add</IconM>
            </Button>
        </>
    );
};

export default React.memo(AdminOpenAddThemeToQuestionFormButtonFeature);