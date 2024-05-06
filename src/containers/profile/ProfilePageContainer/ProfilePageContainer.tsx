import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { UserType } from '@vanyamate/cur-helper-types';
import { UserTestPassing } from '@vanyamate/cur-helper-types/types/user';
import P from '@/components/ui/p/P/P.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';


export type ProfilePageContainerProps =
    {
        user: UserType;
        testPassing?: UserTestPassing;
    }
    & ComponentPropsWithoutRef<'div'>;

export const ProfilePageContainer: FC<ProfilePageContainerProps> = memo(function ProfilePageContainer (props) {
    const { className, user, testPassing, ...other } = props;

    return (
        <Section
            { ...other }
            className={ className }
            size="small"
        >
            <Section>
                <P type="second">{ user.id }</P>
                <Title>{ user.login }</Title>
            </Section>
            {
                testPassing ?
                <Section>
                    { testPassing.testPassing.length }
                </Section>
                            : null
            }
        </Section>
    );
});

export default ProfilePageContainer;