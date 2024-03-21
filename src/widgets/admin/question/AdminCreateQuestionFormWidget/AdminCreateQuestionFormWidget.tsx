import React, { useRef } from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import IconM from '@/components/ui/icon/IconM.tsx';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';
import {
    adminThemeQuestionService,
} from '@/services/admin-theme-question/admin-theme-question.service.ts';


export type AdminCreateQuestionFormWidgetProps = {
    defaultThemePublicId?: string;
    defaultTestId?: string;
};

const AdminCreateQuestionFormWidget: React.FC<AdminCreateQuestionFormWidgetProps> = (props) => {
    const { defaultTestId, defaultThemePublicId } = props;
    const testIdRef                               = useRef<string>(defaultTestId ?? '');
    const themeIdRef                              = useRef<string>(defaultThemePublicId ?? '');
    const titleRef                                = useRef<string>('');
    const pageGetter                              = usePageUrl('admin');
    const navigate                                = useNavigate();

    return (
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
                        .then(async ({ id }) => {
                            // TODO: Refact
                            const handlers: ((id: string) => Promise<boolean>)[] = [];
                            if (themeIdRef.current !== '') {
                                handlers.push(async (id: string) => adminThemeQuestionService.addQuestionToThemeByPublicId(authService.token[0], {
                                    themeId   : themeIdRef.current,
                                    questionId: id,
                                }));
                            }
                            await Promise.all(handlers.map(handler => handler(id)));
                            navigate(pageGetter.question(id));
                            return id;
                        })
                }
                prefix={ <IconM>add</IconM> }
            >
                Создать
            </Button>
        </Section>
    );
};

export default React.memo(AdminCreateQuestionFormWidget);