import React from 'react';
import { AdminQuestionShortType } from '@vanyamate/cur-helper-types';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import LabelToggle from '@/components/ui/input/checkbox/LabelToggle/LabelToggle.tsx';
import Tag from '@/components/common/Tag/Tag.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';


export type AdminQuestionPreviewItemWidgetProps = {
    extra?: React.ReactNode;
    question: AdminQuestionShortType;
};

const AdminQuestionPreviewItemWidget: React.FC<AdminQuestionPreviewItemWidgetProps> = (props) => {
    const { extra, question } = props;
    const pageGetter          = usePageUrl('admin');
    const navigate            = useNavigate();

    return (
        <Section key={ question.id } size="extra-small" type="main">
            <SpaceBetween>
                {
                    extra ?? <div/>
                }
                <Flex>
                    <LabelToggle
                        active={ question.enabled }
                        activeText={
                            <Tag type="main">Активен</Tag>
                        }
                        size="small"
                        unActiveText={
                            <Tag type="invisible">Не активен</Tag>
                        }
                    />
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
            <P lines={ 2 } type="invisible">{ question.description }</P>
        </Section>
    );
};

export default React.memo(AdminQuestionPreviewItemWidget);