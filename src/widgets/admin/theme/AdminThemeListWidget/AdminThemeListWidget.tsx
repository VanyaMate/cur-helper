import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import { AdminThemeShortType, MultiplyResponse } from '@vanyamate/cur-helper-types';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';
import LabelToggle from '@/components/ui/input/checkbox/LabelToggle/LabelToggle.tsx';
import Tag from '@/components/common/Tag/Tag.tsx';


export type AdminThemeListWidgetProps = {
    data: MultiplyResponse<AdminThemeShortType>
};

const AdminThemeListWidget: React.FC<AdminThemeListWidgetProps> = (props) => {
    const { data }   = props;
    const pageGetter = usePageUrl('admin');
    const navigate   = useNavigate();

    return (
        <TileBox>
            {
                data.list.map((theme) => (
                    <Section key={ theme.id } size="extra-small" type="main">
                        <SpaceBetween>
                            <P type="invisible">Тема: { theme.publicId }</P>
                            <Flex>
                                <LabelToggle
                                    active={ theme.enabled }
                                    activeText={
                                        <Tag type="main">Активна</Tag>
                                    }
                                    size="small"
                                    unActiveText={
                                        <Tag type="invisible">Не активна</Tag>
                                    }
                                />
                                <Button
                                    onClick={ () => {
                                        navigate(pageGetter.guid(theme.publicId));
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
                            type="invisible"
                        />
                    </Section>
                ))
            }
        </TileBox>
    );
};

export default React.memo(AdminThemeListWidget);