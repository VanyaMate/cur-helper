import React from 'react';
import HeaderCur from '@/components/mobile/HeaderCur/HeaderCur.tsx';


export type HeaderCurContainerProps = {};

const HeaderCurContainer: React.FC<HeaderCurContainerProps> = (props) => {
    const {} = props;

    return (
        <HeaderCur region="Челябинская обл."/>
    );
};

export default React.memo(HeaderCurContainer);