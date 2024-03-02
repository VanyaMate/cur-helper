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
import {
    adminQuestionAnswerService,
} from '@/services/admin-question-answer/admin-question-answer.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';


export type AdminOpenCreateQuestionAnswerFormButtonFeatureProps = {
    questionId: string;
};

const AdminOpenCreateQuestionAnswerFormButtonFeature: React.FC<AdminOpenCreateQuestionAnswerFormButtonFeatureProps> = (props) => {
    const { questionId }                      = props;
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
                    <Button
                        disabled={ !title.trim() }
                        onClickAsync={ async () => {
                            return adminQuestionAnswerService
                                .create(authService.token[0], {
                                    correct   : correctAnswer,
                                    enabled   : false,
                                    title     : title,
                                    questionId: questionId,
                                })
                                .then((answer) => {
                                    adminQuestionService.questions.get(questionId)?.answers.push(answer);
                                    answerCreatePopup.close();
                                });
                        } }
                        prefix={ <IconM size="large">add</IconM> }
                    >
                        Добавить
                    </Button>
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