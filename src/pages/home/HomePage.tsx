import React from 'react';
import HomeContainer from '@/containers/home/HomeContainer/HomeContainer.tsx';


export type HomePageProps = {}

const HomePage: React.FC<HomePageProps> = (props) => {
    const {} = props;

    return (
        <HomeContainer/>
    );
};

export default React.memo(HomePage);