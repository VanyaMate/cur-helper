import React, { useCallback, useEffect } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import { observer } from 'mobx-react-lite';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Toggle from '@/components/ui/input/checkbox/Toggle/Toggle.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';


export type AdminOpenAddTestToQuestionFormButtonFeatureProps = {
    questionId: string;
};

const AdminOpenAddTestToQuestionFormButtonFeature: React.FC<AdminOpenAddTestToQuestionFormButtonFeatureProps> = observer((props) => {
    const { questionId }      = props;
    const addTestToThemeModal = useWindowPopupController();
    const testList            = adminTestService.unlinkedForQuestion.get(questionId);

    console.log(testList);

    const onClickHandler = useCallback(() => {
        addTestToThemeModal.open();
        adminTestService.getManyUnlinkedForQuestion(authService.token[0], questionId);
    }, [ questionId ]);

    useEffect(() => {
        adminTestService.getMany(authService.token[0]).then();
    }, [ questionId ]);

    return (
        <>
            <WindowPopup controller={ addTestToThemeModal }>
                <TitleSection title="Темы" titleType="default">
                    {
                        testList ? testList.list.map((test) => (
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
                        )) : null
                    }
                </TitleSection>
            </WindowPopup>
            <Button
                onClick={ onClickHandler }
                quad
                size="small"
            >
                <IconM size="small">add</IconM>
            </Button>
        </>
    );
});

export default React.memo(AdminOpenAddTestToQuestionFormButtonFeature);