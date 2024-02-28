import React from 'react';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';
import { QuestionFullType } from '@vanyamate/cur-helper-types/types/question';
import Loader from '@/components/common/Loader/Loader.tsx';
import { observer } from 'mobx-react-lite';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Toggle from '@/components/ui/input/checkbox/toggle/Toggle.tsx';
import { authService } from '@/services/auth/auth.service.ts';
import Link from '@/components/ui/link/Link/Link.tsx';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import RedactorItem from '@/containers/redactor/RedactorItem/RedactorItem.tsx';
import { StarterKit } from '@tiptap/starter-kit';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';


export type AdminQuestionRedactContainerProps = {
    id: string;
};

const AdminQuestionRedactContainer: React.FC<AdminQuestionRedactContainerProps> = observer((props) => {
    const { id }                                 = props;
    const question: QuestionFullType | undefined = adminQuestionService.questions.get(id);
    const pageGetter                             = usePageUrl();

    if (!question) {
        return <Loader/>;
    }

    return (
        <Section>
            <Section size="extra-small">
                <SpaceBetween>
                    <Flex/>
                    <Flex>
                        <P type="invisible">{ question.enabled ? 'Активен'
                                                               : 'Не активен' }</P>
                        <Toggle
                            active={ question.enabled }
                            onToggleAsync={ (value) => adminQuestionService.update(authService.token[0], question.id, {
                                enabled: value,
                            }).then() }
                            size="small"
                        />
                    </Flex>
                </SpaceBetween>
            </Section>

            <RedactorItem
                editable={ false }
                extensions={ [ StarterKit ] }
                html={ question.title }
                id={ `title_${ question.id }` }
                onSave={ async (html: string) => adminQuestionService.update(authService.token[0], question.id, { title: html }).then() }
                title="Заголовок"
                type="text"
            />

            <RedactorItem
                editable={ false }
                extensions={ [ StarterKit ] }
                html={ question.body }
                id={ `body_${ question.id }` }
                onSave={ async (html: string) => adminQuestionService.update(authService.token[0], question.id, { body: html }).then() }
                title="Вопрос"
                type="text"
            />
        </Section>
    );
});

export default React.memo(AdminQuestionRedactContainer);