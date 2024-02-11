import React from 'react';
import css from './ContentBox.module.scss';


export type ContentBoxProps = {
    children: React.ReactNode;
};

const ContentBox: React.FC<ContentBoxProps> = (props) => {
    const { children } = props;

    return (
        <div className={ css.container }>
            { children }
        </div>
    );
};

export default React.memo(ContentBox);