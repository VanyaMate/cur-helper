import React from 'react';


export type IconMProps = {
    children: string;
};

const IconM: React.FC<IconMProps> = (props) => {
    const {children} = props;

    return (
        <span className={ 'material-symbols-outlined' }>{ children }</span>
    );
};

export default React.memo(IconM);