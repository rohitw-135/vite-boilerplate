import React, { useMemo, useState } from 'react';
import WordDefinition from './WordDefinition/WordDefinition';
import { WordContext } from '../context';

const Pages: React.FC = () => {
    const [word, setWord] = useState('');
    const contextValue = useMemo(
        () => ({
            word,
            setWord
        }),
        [word]
    );

    return (
        <WordContext.Provider value={contextValue}>
            <WordDefinition />
        </WordContext.Provider>
    );
};

export default Pages;
