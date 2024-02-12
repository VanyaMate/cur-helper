import React from 'react';
import css from './RoundImage.module.scss';


export type RoundImageProps = {
    src: string;
    alt: string;
    size: string;
};

const RoundImage: React.FC<RoundImageProps> = (props) => {
    const { src, alt, size } = props;

    return (
        <img
            alt={ alt }
            className={ css.container }
            src={ src }
            style={ { width: size, height: size } }
        />
    );
};

export default React.memo(RoundImage);