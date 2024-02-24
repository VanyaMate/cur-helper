import React from 'react';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { adminThemeService } from '@/services/admin-theme/admin-theme.service.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import { observer } from 'mobx-react-lite';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Toggle from '@/components/ui/input/checkbox/toggle/Toggle.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import { useNavigate } from 'react-router-dom';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';


export type AdminThemeListContainerProps = {};

const AdminThemeListContainer: React.FC<AdminThemeListContainerProps> = observer((props) => {
    const {}         = props;
    const pageGetter = usePageUrl();
    const navigate   = useNavigate();
    const themeList  = adminThemeService.themesList;

    return (
        <TitleSection
            extra={
                <Flex>
                    <Button
                        quad
                        size="small"
                        styleType="default"
                    >
                        <IconM size="small">add</IconM>
                    </Button>
                </Flex>
            }
            title="Список тем"
        >
            <TileBox>
                {
                    themeList.list.map((theme) => (
                        <Section key={ theme.id } size="extra-small" type="main">
                            <SpaceBetween>
                                <P type="invisible">Тема: { theme.publicId }</P>
                                <Flex>
                                    <P type="invisible">{ theme.enabled ? 'Активна'
                                                                        : 'Не активна' }</P>
                                    <Toggle active={ theme.enabled } size="small"/>
                                    <Button
                                        onClick={ () => {
                                            navigate(`/admin${ pageGetter.guid(theme.publicId) }`);
                                        } }
                                        quad
                                        size="small"
                                        styleType="default"
                                    >
                                        <IconM size="small">edit</IconM>
                                    </Button>
                                </Flex>
                            </SpaceBetween>
                            <Title lines={ 2 }>{ theme.title }</Title>
                            <P
                                dangerouslySetInnerHTML={ { __html: theme.description } }
                                lines={ 2 }
                                type="second"
                            />
                        </Section>
                    ))
                }
            </TileBox>
        </TitleSection>
    );
});

export default React.memo(AdminThemeListContainer);