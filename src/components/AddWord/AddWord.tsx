import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useAddWord } from '../../services/wordService';

const AddWord: React.FC = () => {
    const queryClient = useQueryClient();
    // states to manage input for word and definition
    const [word, setWord] = useState<string | undefined>();
    const [definition, setDefinition] = useState<string | undefined>();
    const addWordDefinition = useAddWord(queryClient);

    // handles adding a word
    const handleAddWord = async () => {
        if (word && definition) {
            await addWordDefinition.mutateAsync({
                word,
                definition
            });
            setWord('');
            setDefinition('');
        }
    };

    return (
        <div>
            <h2>Add New Word</h2>
            <input type="text" value={word} onChange={(e) => setWord(e.target.value)} placeholder="Enter new word" />
            <input
                type="text"
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                placeholder="Enter it's definition"
            />
            <button onClick={handleAddWord}>Add This Word</button>
        </div>
    );
};

export default AddWord;
