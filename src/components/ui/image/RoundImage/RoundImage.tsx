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
            src={ src }
            alt={ alt }
            style={ { width: size, height: size } }
            className={ css.container }
        />
    );
};

export default React.memo(RoundImage);