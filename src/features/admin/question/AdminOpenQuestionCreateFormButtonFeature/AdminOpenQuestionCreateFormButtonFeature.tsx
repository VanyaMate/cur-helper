import React, { useRef } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';
import Section from '@/components/ui/container/Section/Section.tsx';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';
import { authService } from '@/services/auth/auth.service.ts';


export type AdminOpenQuestionCreateFormButtonFeatureProps = {};

const AdminOpenQuestionCreateFormButtonFeature: React.FC<AdminOpenQuestionCreateFormButtonFeatureProps> = (props) => {
    const {}                  = props;
    const questionCreatePopup = useWindowPopupController();
    const testIdRef           = useRef<string>('');
    const themeIdRef          = useRef<string>('');
    const titleRef            = useRef<string>('');
    const pageGetter          = usePageUrl('admin');
    const navigate            = useNavigate();

    return (
        <>

            <WindowPopup controller={ questionCreatePopup }>
                <Section size="large">
                    <Section>
                        <Input
                            defaultValue={ themeIdRef.current }
                            label="Публичный ID темы к которому привязать вопрос"
                            onChangeHandler={ (value: string) => {
                                themeIdRef.current = value;
                            } }
                            placeholder="(Опционально)"
                        />
                        <Input
                            defaultValue={ testIdRef.current }
                            label="ID теста к которому привязать вопрос"
                            onChangeHandler={ (value: string) => {
                                testIdRef.current = value;
                            } }
                            placeholder="(Опционально)"
                        />
                        <Input
                            defaultValue=""
                            label="Заголовок"
                            onChangeHandler={ (value: string) => {
                                titleRef.current = value;
                            } }
                            placeholder="Введите заголовок вопроса"
                        />
                        <Button
                            onClickAsync={ () =>
                                adminQuestionService
                                    .create(authService.token[0], {
                                        title: titleRef.current,
                                    })
                                    .then(({ id }) => {
                                        navigate(pageGetter.question(id));
                                        return id;
                                    })
                            }
                            prefix={ <IconM>add</IconM> }
                        >
                            Создать
                        </Button>
                    </Section>
                </Section>
            </WindowPopup>
            <Button
                onClick={ questionCreatePopup.open }
                quad
                size="small"
            >
                <IconM size="small">add</IconM>
            </Button>
        </>
    );
};

export default React.memo(AdminOpenQuestionCreateFormButtonFeature);