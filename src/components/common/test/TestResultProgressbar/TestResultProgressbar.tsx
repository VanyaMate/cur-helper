import React from 'react';
import css from './TestResultProgressbar.module.scss';
import 'react-circular-progressbar/dist/styles.css';


export type TestResultProps = {
    children: React.ReactNode | string;
}

const TestResultProgressbar: React.FC<TestResultProps> = (props) => {
    const {
              children,
          } = props;

    return (
        <div className={ css.container }>
            { children }
        </div>
    );
};

export default TestResultProgressbar;