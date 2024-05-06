import React, { ComponentPropsWithoutRef, FC, memo } from 'react';
import { UserType } from '@vanyamate/cur-helper-types';
import P from '@/components/ui/p/P/P.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import AdditionalList
    from '@/components/ui/container/AdditionalList/AdditionalList.tsx';
import RoundImage from '@/components/ui/image/RoundImage/RoundImage.tsx';
import {
    TestPassingShortInfo,
} from '@vanyamate/cur-helper-types/types/test-passing/index.ts';
import FetchShow from '@/components/common/FetchShow/FetchShow.tsx';
import { usersService } from '@/services/users/users.service.ts';
import { observer } from 'mobx-react-lite';
import TitleSection
    from '@/components/ui/container/TitleSection/TitleSection.tsx';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import { TEST_PAGE, TEST_RESULT_PAGE } from '@/constants/pages.ts';
import SpaceBetween
    from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Tag from '@/components/common/Tag/Tag.tsx';
import testResultStatus
    from '@/components/common/test/TestResultStatus/TestResultStatus.tsx';
import TestResultPreview
    from '@/components/common/test/TestResultPreview/TestResultPreview.tsx';


export type ProfilePageContainerProps =
    {
        login: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const ProfilePageContainer: FC<ProfilePageContainerProps> = observer(function ProfilePageContainer (props) {
    const { className, login, ...other } = props;
    const userFetch                      = usersService.users[login];
    const userData                       = userFetch?.data;

    return (
        <FetchShow fetch={ userFetch }>
            <Section
                { ...other }
                className={ className }
                size="medium"
            >
                <Section size="extra-small" type="main">
                    <P type="invisible">id: { userData?.user.id }</P>
                    <Title>{ userData?.user.login }</Title>
                    {
                        userData?.user.avatarUrl ?
                        <RoundImage
                            alt="avatar"
                            size="100px"
                            src={ userData?.user.avatarUrl }
                        /> : null
                    }
                    <AdditionalList
                        list={ [
                            {
                                value: userData?.user.firstName || '-',
                                label: 'Имя',
                            },
                            {
                                value: userData?.user.lastName || '-',
                                label: 'Фамилия',
                            },
                            {
                                value: userData?.user.email,
                                label: 'Email',
                            },
                            {
                                value: userData?.user.role?.title || '-',
                                label: 'Роль',
                            },
                            {
                                value: userData?.user.verified ? 'Да'
                                                               : 'Нет',
                                label: 'Верифицирован',
                            },
                        ] }
                    />
                </Section>
                {
                    userData?.testsResults ?
                    <Collapse
                        opened={ true }
                        title="Пройденные тесты"
                    >
                        <Section size="extra-small">
                            {
                                userData.testsResults.map((testResult) => (
                                    <Section
                                        key={ testResult.id }
                                        size="extra-small"
                                        type="main"
                                    >
                                        <TestResultPreview
                                            shortResult={ testResult }
                                        />
                                        <Title
                                            size="medium">{ testResult.test.title }</Title>
                                        <Link
                                            to={ `/${ TEST_PAGE }/${ TEST_RESULT_PAGE }/${ testResult.id }` }
                                            size={ 'small' }
                                        >Подробнее</Link>
                                    </Section>
                                ))
                            }
                        </Section>
                    </Collapse>
                                           : null
                }
            </Section>
        </FetchShow>
    );
});

export default ProfilePageContainer;