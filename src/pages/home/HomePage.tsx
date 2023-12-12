import React, { useEffect, useMemo, useState } from 'react';
import { useDateDeltaWithPostfix } from '@/hooks/date/useDateDeltaWithPostfix.ts';


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