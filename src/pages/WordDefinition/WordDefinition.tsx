import React, { useState } from 'react';
import Select from 'react-select';
import { useQueryClient } from 'react-query';
import { AddWord, EditWord } from '../../components';
import { useWordContext } from '../../context';
import { useGetWordInfo } from '../../hooks';
import { useDeleteWord, useEditWord, useGetDefinitionByWord } from '../../services/wordService';
import { SelectedType, WordAPIResponseType } from './typings';
import styles from './index.module.less';

const WordDefinition: React.FC = () => {
    const queryClient = useQueryClient();
    const [selectedWord, setSelectedWord] = useState<SelectedType | null>();
    const [definition, setDefinition] = useState<string | null>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>('');

    // word value from context
    const { setWord } = useWordContext();
    const { wordsData, wordsLoading, wordsError } = useGetWordInfo();

    // select dropdown options
    const options = wordsData
        ? wordsData.map((word: WordAPIResponseType) => ({
              value: word.word,
              label: word.word,
              id: word.id
          }))
        : [];

    // mutated calls
    const deleteWordDefinition = useDeleteWord(queryClient);
    const editWordDefinition = useEditWord(queryClient);
    const getDefByWord = useGetDefinitionByWord(queryClient);

    // handles selection change
    const handleSelectChange = (selectedOption: SelectedType | null) => {
        // sets selected word object
        setSelectedWord(selectedOption || {});
        // sets context values
        setWord(selectedOption?.value || '');
    };

    // fetches selected word definition
    const fetchDefinition = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getDefByWord.mutateAsync(selectedWord?.value);
            if (res?.length === 0) {
                setDefinition('No definition found.');
            } else {
                setDefinition(res?.[0].definition);
            }
        } catch (err) {
            setError('Error fetching definition.');
        }
        setLoading(false);
    };

    // handles clicking of search button
    const handleSearch = () => {
        fetchDefinition();
    };

    const handleEditWord = async () => {
        if (selectedWord) {
            await editWordDefinition.mutateAsync({
                id: selectedWord?.id,
                definition: definition || null
            });
            setSelectedWord({});
            setDefinition('');
        }
    };

    const handleDeleteWord = async () => {
        if (selectedWord) {
            await deleteWordDefinition.mutateAsync(selectedWord?.id);
            setSelectedWord({});
            setDefinition('');
        }
    };

    if (wordsLoading) return <div>Loading words...</div>;
    if (wordsError) return <div>Error loading words</div>;

    return (
        <div>
            <h1 className={styles.apptitle}>Dictionary App</h1>
            <div className={styles.row}>
                <Select
                    className={styles.select}
                    options={options}
                    onChange={handleSelectChange}
                    isClearable
                    placeholder="Select a word"
                />
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {definition && <p>Definition: {definition}</p>}
            <EditWord
                definition={definition}
                setDefinition={setDefinition}
                handleEditWord={handleEditWord}
                handleDeleteWord={handleDeleteWord}
            />
            <AddWord />
        </div>
    );
};

export default WordDefinition;
