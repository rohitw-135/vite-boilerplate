import { createContext, useContext } from 'react';
import { WordContextValue } from './typings';

// create context to use multiple values within same provider
export const WordContext = createContext<WordContextValue>({
    word: '',
    setWord: () => {}
});

// hook to access context values
export const useWordContext = (): WordContextValue => {
    const context = useContext(WordContext);

    if (context === undefined) {
        throw new Error('WordContext must be used within a WordProvider');
    }

    return context;
};
