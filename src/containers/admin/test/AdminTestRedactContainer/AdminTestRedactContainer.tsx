import React from 'react';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import Loader from '@/components/common/Loader/Loader.tsx';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';
import { observer } from 'mobx-react-lite';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Toggle from '@/components/ui/input/checkbox/toggle/Toggle.tsx';
import { authService } from '@/services/auth/auth.service.ts';
import Link from '@/components/ui/link/Link/Link.tsx';
import RedactorItem from '@/containers/redactor/RedactorItem/RedactorItem.tsx';
import { StarterKit } from '@tiptap/starter-kit';
import TextFormattingRedactMenu
    from '@/components/tiptap/menu/redact-menu/TextFormattingRedactMenu/TextFormattingRedactMenu.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import SaveInput from '@/components/ui/input/SaveInput/SaveInput.tsx';


export type AdminTestRedactContainerProps = {
    id: string;
};

const AdminTestRedactContainer: React.FC<AdminTestRedactContainerProps> = observer((props) => {
    const { id }     = props;
    const test       = adminTestService.tests.get(id);
    const pageGetter = usePageUrl();

    if (!test) {
        return <Loader/>;
    }

    return (
        <Section size="medium">
            <Section size="extra-small">
                <SpaceBetween>
                    <Flex>
                        <P type="invisible">Публичный ID:</P>
                        <P>{ test.theme.publicId }</P>
                    </Flex>
                    <Flex>
                        <P type="invisible">{ test.enabled ? 'Активен'
                                                           : 'Не активен' }</P>
                        <Toggle
                            active={ test.enabled }
                            onToggleAsync={ (value) => adminTestService.update(authService.token[0], test.id, {
                                enabled: value,
                            }).then() }
                            size="small"
                        />
                    </Flex>
                </SpaceBetween>
                <Flex>
                    <P type="invisible">
                        <Link
                            target="_blank"
                            to={ pageGetter.test(test.id) }
                        >
                            Ссылка на тест
                        </Link>
                    </P>
                </Flex>
            </Section>

            <RedactorItem
                editable={ false }
                extensions={ [ StarterKit ] }
                html={ test.title }
                id={ `title_${ test.id }` }
                onSave={ async (html: string) => adminTestService.update(authService.token[0], test.id, { title: html }).then() }
                title="Заголовок"
                type="text"
            />

            <RedactorItem
                bubbleMenu={ [
                    TextFormattingRedactMenu,
                ] }
                editable={ false }
                extensions={ [ StarterKit ] }
                html={ test.description }
                id={ `desc_${ test.id }` }
                onSave={ async (html: string) => adminTestService.update(authService.token[0], test.id, { description: html }).then() }
                title="Описание"
            />

            <TitleSection
                tag="section"
                title="Настройки"
                type="main"
            >
                <TileBox>
                    <SaveInput
                        defaultValue={ Math.ceil(test.timeToPass / 1000 / 60) }
                        label="Время на выполнение (мин)"
                        onSave={ async (value: string) => adminTestService.update(authService.token[0], test.id, { timeToPass: Number(value) * 60 * 1000 }).then() }
                        type="number"
                    />
                    <SaveInput
                        defaultValue={ test.questionsAmount }
                        label="Количество вопросов"
                        onSave={ async (value: string) => adminTestService.update(authService.token[0], test.id, { questionsAmount: Number(value) * 60 * 1000 }).then() }
                        type="number"
                    />
                    <SaveInput
                        defaultValue={ test.unsatisfactoryScore }
                        label="Неудовлетворительно"
                        onSave={ async (value: string) => adminTestService.update(authService.token[0], test.id, { unsatisfactoryScore: Number(value) * 60 * 1000 }).then() }
                        type="number"
                    />
                    <SaveInput
                        defaultValue={ test.satisfactoryScore }
                        label="Удовлетворительно"
                        onSave={ async (value: string) => adminTestService.update(authService.token[0], test.id, { satisfactoryScore: Number(value) * 60 * 1000 }).then() }
                        type="number"
                    />
                    <SaveInput
                        defaultValue={ test.perfectScore }
                        label="Идеально"
                        onSave={ async (value: string) => adminTestService.update(authService.token[0], test.id, { perfectScore: Number(value) * 60 * 1000 }).then() }
                        type="number"
                    />
                </TileBox>
            </TitleSection>

            <TitleSection
                extra={
                    <Button quad size="small">
                        <IconM size="small">add</IconM>
                    </Button>
                }
                tag="section"
                title={ `Вопросы (${ test.questions.length })` }
            >
                <TileBox>
                    {
                        test.questions.map((question) => (
                            <Section
                                key={ question.id }
                                size="extra-small"
                                tag="article"
                                type="main"
                            >
                                <SpaceBetween>
                                    <Toggle active={ true } size="small"/>
                                    <Flex>
                                        <Toggle active={ question.enabled } size="small"/>
                                        <Button
                                            quad
                                            size="small"
                                            styleType="default"
                                        >
                                            <IconM size="small">edit</IconM>
                                        </Button>
                                    </Flex>
                                </SpaceBetween>
                                <Title lines={ 1 } size="small">{ question.title }</Title>
                                <P
                                    dangerouslySetInnerHTML={ { __html: question.description } }
                                    lines={ 2 }
                                    type="invisible"
                                />
                            </Section>
                        ))
                    }
                </TileBox>
            </TitleSection>
        </Section>
    );
});

export default React.memo(AdminTestRedactContainer);