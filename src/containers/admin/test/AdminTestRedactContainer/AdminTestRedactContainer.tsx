import React from 'react';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import Loader from '@/components/common/Loader/Loader.tsx';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';
import { observer } from 'mobx-react-lite';
import Section from '@/components/ui/container/Section/Section.tsx';
import ContentBox from '@/components/common/ContentBox/ContentBox.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Toggle from '@/components/ui/input/checkbox/toggle/Toggle.tsx';
import { authService } from '@/services/auth/auth.service.ts';
import Link from '@/components/ui/link/Link/Link.tsx';
import RedactorItem from '@/containers/redactor/RedactorItem/RedactorItem.tsx';
import { StarterKit } from '@tiptap/starter-kit';
import { adminThemeService } from '@/services/admin-theme/admin-theme.service.ts';
import TextFormattingRedactMenu
    from '@/components/tiptap/menu/redact-menu/TextFormattingRedactMenu/TextFormattingRedactMenu.tsx';


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
                title="Заголовок теста"
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
                title="Описание теста"
            />
        </Section>
    );
});

export default React.memo(AdminTestRedactContainer);