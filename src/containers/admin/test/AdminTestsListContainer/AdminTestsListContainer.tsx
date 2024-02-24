import React from 'react';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Toggle from '@/components/ui/input/checkbox/toggle/Toggle.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import { observer } from 'mobx-react-lite';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';


export type AdminTestsListContainerProps = {};

const AdminTestsListContainer: React.FC<AdminTestsListContainerProps> = observer((props) => {
    const {}         = props;
    const pageGetter = usePageUrl();
    const navigate   = useNavigate();
    const testsList  = adminTestService.testsList;

    return (
        <TitleSection title="Список тестов">
            <TileBox>
                {
                    testsList.list.map((test) => (
                        <Section key={ test.id } size="extra-small" type="main">
                            <SpaceBetween>
                                <P type="invisible">Тема: '---'</P>
                                <Flex>
                                    <P type="invisible">{ test.enabled ? 'Активен'
                                                                       : 'Не активен' }</P>
                                    <Toggle active={ test.enabled } size="small"/>
                                    <Button
                                        onClick={ () => {
                                            navigate(`/admin${ pageGetter.test(test.id) }`);
                                        } }
                                        quad
                                        size="small"
                                        styleType="default"
                                    >
                                        <IconM size="small" type="invisible">edit</IconM>
                                    </Button>
                                </Flex>
                            </SpaceBetween>
                            <Title lines={ 2 }>{ test.title }</Title>
                        </Section>
                    ))
                }
            </TileBox>
        </TitleSection>
    );
});

export default React.memo(AdminTestsListContainer);