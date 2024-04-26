import React, { useRef } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';
import {
    adminTestQuestionService,
} from '@/services/admin-test-question/admin-test-question.service.ts';
import { observer } from 'mobx-react-lite';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';
import AdminUnlinkedQuestionListWidget
    from '@/widgets/admin/question/AdminUnlinkedQuestionListWidget/AdminUnlinkedQuestionListWidget.tsx';


export type AdminOpenQuestionAddFormButtonFeatureProps = {
    testId?: string;
    themeId?: string;
};

const AdminOpenQuestionAddFormButtonFeature: React.FC<AdminOpenQuestionAddFormButtonFeatureProps> = observer((props) => {
    const { testId, themeId } = props;
    const questionCreatePopup = useWindowPopupController();
    const testIdRef           = useRef<string>(testId ?? '');
    const themeIdRef          = useRef<string>(themeId ?? '');
    const titleRef            = useRef<string>('');
    const pageGetter          = usePageUrl('admin');
    const navigate            = useNavigate();
    const unlinkedForTest     = adminQuestionService.unlinkedForTest.get(testId ?? '');

    // TODO: Вынести функционал в хуки/методы
    // TODO: Нужен основательный рефакторинг

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
                                    .then((id) => {
                                        const links: Promise<any>[] = [];
                                        if (themeIdRef.current) {
                                            // links.push();
                                        }
                                        if (testIdRef.current) {
                                            links.push(adminTestQuestionService.addQuestionToTest(authService.token[0], testIdRef.current, id));
                                        }
                                        return Promise.all(links);
                                    })
                            }
                            prefix={ <IconM>add</IconM> }
                        >
                            Создать
                        </Button>
                    </Section>
                    {
                        testId
                        ? <Section>
                            <Input label="Поиск по названию" onChangeHandler={ () => {
                            } }/>
                            <AdminUnlinkedQuestionListWidget
                                onConnect={ (question) => adminTestService.tests.get(testId)?.questions.push(question) }
                                testId={ testId }
                                unlinkedQuestionsList={ unlinkedForTest?.list ?? [] }
                            />
                        </Section> : null
                    }
                </Section>
            </WindowPopup>
            <Button
                onClick={ () => {
                    questionCreatePopup.open();
                    if (testId) {
                        adminQuestionService.findManyUnlinkedForTest(authService.token[0], testId).then();
                    }
                } }
                quad
                size="small"
            >
                <IconM size="small">add</IconM>
            </Button>
        </>
    );
});

export default AdminOpenQuestionAddFormButtonFeature;