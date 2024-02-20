import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import AdditionalList from '@/components/ui/container/AdditionalList/AdditionalList.tsx';
import RoundImage from '@/components/ui/image/RoundImage/RoundImage.tsx';
import { UserType } from '@vanyamate/cur-helper-types';


export type UserPreviewProps = {
    user: UserType;
};

const UserPreview: React.FC<UserPreviewProps> = (props) => {
    const { user } = props;

    return (
        <Section
            tag="section"
        >
            <SpaceBetween size="small">
                <RoundImage
                    alt="Аватарка"
                    size="140px"
                    src={ user.avatarUrl }
                />
                <AdditionalList
                    item="main"
                    list={ [
                        { label: 'Id', value: user.id },
                        { label: 'Имя', value: user.firstName },
                        { label: 'Фамилия', value: user.lastName },
                        { label: 'Роль', value: user.role?.title ?? '-' },
                    ] }
                />
            </SpaceBetween>
        </Section>
    );
};

export default React.memo(UserPreview);