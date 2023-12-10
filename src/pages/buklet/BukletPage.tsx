import React, { useEffect, useMemo, useState } from 'react';
import Section from '@/components/ui/container/box/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';


export type BukletPageProps = {}

const TypingComponent: React.FC<{ text: string }> = ({ text }) => {
    const [ displayText, setDisplayText ] = useState('');

    useEffect(() => {
        let currentIndex = 0;
        const interval   = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayText(text.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [ text ]);

    return <Title style={ { textAlign: 'center', height: 30 } }>{ displayText }</Title>;
};


const BukletPage: React.FC<BukletPageProps> = (props) => {
    const {}                      = props;
    const problems: string[]      = useMemo(() => {
        return [
            'Яма на дороге?',
            'Большая очередь?',
            'Потекла ручка?',
        ];
    }, []);
    const problemsBlack: string[] = useMemo(() => {
        return [
            'https://klike.net/uploads/posts/2020-12/1607500376_1.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/b/b3/People_lining_up_for_shelter_in_Superdome_in_New_Orleans.jpg',
            'https://www.corsete.ru/upload/iblock/ca6/ca64527bec6eef736e4de6dfd1c04b85.jpg',
        ];
    }, []);
    const [ index, setIndex ]     = useState<number>(0);
    const [ problem, setProblem ] = useState<string>(problems[index]);
    const [ back, setBack ]       = useState<string>(problemsBlack[index]);

    useEffect(() => {
        const interval = setTimeout(() => {
            let next = index + 1;
            if (next === problems.length) {
                next = 0;
            }
            setIndex(next);
            setProblem(problems[next]);
            setBack(problemsBlack[next]);
        }, 3000);
        return () => clearTimeout(interval);
    }, [ problem, problems, index, problemsBlack ]);

    return (
        <Section style={ {
            textAlign         : 'center',
            backgroundImage   : `url(${ back })`,
            backgroundSize    : 'cover',
            backgroundPosition: 'center',
            height            : '100vh',
            display           : 'flex',
            alignItems        : 'center',
            justifyContent    : 'center',
        } }>
            <Section item={ 'main' } size={ 'large' }>
                <Section>
                    <Title>Государственная помощь</Title>
                    <P style={ { color: '#777' } }>Способ решения своих проблем</P>
                </Section>
                <TypingComponent text={ problem }/>
                <Section>
                    <Button styleType={ 'main' }>Узнать как</Button>
                    <div style={ { textAlign: 'left' } }>
                        <Collapse
                            title={ 'Что нужно сделать' }
                            opened={ true }
                            item={ 'default' }
                        >
                            <OrderedList
                                list={ [
                                    <p>Открыть браузер</p>,
                                    <p>Зайти на <Link to={ '#' }>gov.ru</Link></p>,
                                    <p>Описать проблему</p>,
                                    <p>Ждать решения</p>,
                                ] }
                            />
                        </Collapse>
                    </div>
                </Section>
            </Section>
        </Section>
    );
};

export default React.memo(BukletPage);