import React from 'react';
import css from './TileBox.module.scss';


export type TileBoxProps = {
    children: React.ReactNode | string;
};

const TileBox: React.FC<TileBoxProps> = (props) => {
    const { children } = props;

    return (
        <div className={ css.container }>
            { children }
        </div>
    );
};

export default React.memo(TileBox);