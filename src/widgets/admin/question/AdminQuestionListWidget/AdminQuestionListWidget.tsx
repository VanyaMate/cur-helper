import React from 'react';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Toggle from '@/components/ui/input/checkbox/toggle/Toggle.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import { AdminQuestionShortType, MultiplyResponse } from '@vanyamate/cur-helper-types';


export type AdminQuestionListWidgetProps = {
    data: MultiplyResponse<AdminQuestionShortType>
};

const AdminQuestionListWidget: React.FC<AdminQuestionListWidgetProps> = (props) => {
    const { data }   = props;
    const pageGetter = usePageUrl('admin');
    const navigate   = useNavigate();

    return (
        <TileBox>
            {
                data.list.map((question) => (
                    <Section key={ question.id } size="extra-small" type="main">
                        <SpaceBetween>
                            <P type="invisible">Тема: '---'</P>
                            <Flex>
                                <P type="invisible">{ question.enabled ? 'Активен'
                                                                       : 'Не активен' }</P>
                                <Toggle active={ question.enabled } size="small"/>
                                <Button
                                    onClick={ () => {
                                        navigate(pageGetter.question(question.id));
                                    } }
                                    quad
                                    size="small"
                                    styleType="default"
                                >
                                    <IconM size="small">edit</IconM>
                                </Button>
                            </Flex>
                        </SpaceBetween>
                        <Title lines={ 2 }>{ question.title }</Title>
                    </Section>
                ))
            }
        </TileBox>
    );
};

export default React.memo(AdminQuestionListWidget);