import React, { useEffect } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import Title from '@/components/ui/title/Title/Title.tsx';
import { observer } from 'mobx-react-lite';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Toggle from '@/components/ui/input/checkbox/Toggle/Toggle.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import P from '@/components/ui/p/P/P.tsx';

// TODO: Deprecated
// Не нужный (возможно) пока что компонент


export type AdminOpenAddTestToThemeFormButtonFeatureProps = {
    themeId: string;
};

const AdminOpenAddTestToThemeFormButtonFeature: React.FC<AdminOpenAddTestToThemeFormButtonFeatureProps> = observer((props) => {
    const { themeId }         = props;
    const addTestToThemeModal = useWindowPopupController();
    const testList            = adminTestService.testsList.list;

    useEffect(() => {
        adminTestService.getMany(authService.token[0]).then();
    }, [ themeId ]);

    return (
        <>
            <WindowPopup controller={ addTestToThemeModal }>
                <TitleSection title="Темы" titleType="default">
                    {
                        testList.map((test) => (
                            <Section key={ test.id } size="extra-small" type="default">
                                <SpaceBetween>
                                    <Toggle active={ true } size="small"/>
                                    <Flex>
                                        <P type="invisible">{ test.enabled ? 'Активен'
                                                                           : 'Не активен' }</P>
                                        <Toggle active={ test.enabled } size="small"/>
                                    </Flex>
                                </SpaceBetween>
                                <Title lines={ 2 }>{ test.title }</Title>
                            </Section>
                        ))
                    }
                </TitleSection>
            </WindowPopup>
            <Button
                onClick={ addTestToThemeModal.open }
                quad
                size="small"
            >
                <IconM size="small">edit</IconM>
            </Button>
        </>
    );
});

export default React.memo(AdminOpenAddTestToThemeFormButtonFeature);