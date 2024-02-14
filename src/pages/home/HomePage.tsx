import React from 'react';


const HomeContainer = React.lazy(() => import('@/containers/home/HomeContainer/HomeContainer.tsx'));


export type HomePageProps = {}

const HomePage: React.FC<HomePageProps> = (props) => {
    const {} = props;

    return (
        <HomeContainer/>
    );
};

export default React.memo(HomePage);