import React from 'react';
import P from '@/components/ui/p/P/P.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Title, { TitleSizeType } from '@/components/ui/title/Title/Title.tsx';


export type ThemeTitleTextProps = {
    title: string;
    publicId: string;
    size?: TitleSizeType;
};

const ThemeTitleText: React.FC<ThemeTitleTextProps> = (props) => {
    const { title, publicId, size } = props;

    return (
        <Flex>
            <P tag="span" type="invisible">{ publicId.replace(/-/g, '.') }.</P>
            <Title lines={ 2 } size={ size ?? 'small' }>{ title }</Title>
        </Flex>
    );
};

export default React.memo(ThemeTitleText);