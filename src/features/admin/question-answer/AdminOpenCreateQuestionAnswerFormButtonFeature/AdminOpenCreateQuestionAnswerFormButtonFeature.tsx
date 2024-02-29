import React, { useState } from 'react';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Tag from '@/components/common/Tag/Tag.tsx';
import LabelToggle from '@/components/ui/input/checkbox/LabelToggle/LabelToggle.tsx';


export type AdminOpenCreateQuestionAnswerFormButtonFeatureProps = {};

const AdminOpenCreateQuestionAnswerFormButtonFeature: React.FC<AdminOpenCreateQuestionAnswerFormButtonFeatureProps> = (props) => {
    const {}                                  = props;
    const answerCreatePopup                   = useWindowPopupController();
    const [ title, setTitle ]                 = useState<string>('');
    const [ correctAnswer, setCorrectAnswer ] = useState<boolean>(false);

    return (
        <>
            <WindowPopup controller={ answerCreatePopup }>
                <Section>
                    <Flex>
                        <LabelToggle
                            active={ correctAnswer }
                            activeText={ <Tag type="main">Верный</Tag> }
                            onToggle={ setCorrectAnswer }
                            side="right"
                            size="small"
                            unActiveText={ <Tag type="danger">Не верный</Tag> }
                        />
                    </Flex>
                    <Input
                        label="Заголовок"
                        onChangeHandler={ setTitle }
                        placeholder="Введите вариант ответа"
                        value={ title }
                    />
                </Section>
            </WindowPopup>
            <Button
                onClick={ answerCreatePopup.open }
                quad
                size="small"
            >
                <IconM size="small">add</IconM>
            </Button>
        </>
    );
};

export default React.memo(AdminOpenCreateQuestionAnswerFormButtonFeature);