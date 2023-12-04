import React from 'react';


export type HomePageProps = {}

const HomePage: React.FC<HomePageProps> = (props) => {
    const {} = props;

    return (
        <div>
            HomePage component
        </div>
    );
};

export default React.memo(HomePage);