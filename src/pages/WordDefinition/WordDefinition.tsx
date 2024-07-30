import React, { useCallback, useMemo, useState } from 'react';
import Select from 'react-select';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { EditWord } from '../../components';
import { useGetWordInfo } from '../../hooks';
import { useDeleteWord, useEditWord, useGetDefinitionByWord } from '../../services/wordService';
import { SelectedType, WordAPIResponseType } from './typings';
import styles from './index.module.less';
import { WordContext } from '../../context';

const WordDefinition: React.FC = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [selectedWord, setSelectedWord] = useState<SelectedType | null>();
    const [definition, setDefinition] = useState<string | null>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>('');

    const [word, setWord] = useState('');
    const contextValue = useMemo(
        () => ({
            word,
            setWord
        }),
        [word]
    );

    const { wordsData, wordsLoading, wordsError } = useGetWordInfo();

    // select dropdown options
    const options = useMemo(
        () =>
            wordsData?.map((word: WordAPIResponseType) => ({
                value: word.word,
                label: word.word,
                id: word.id
            })),
        [wordsData]
    );

    // mutated calls
    const deleteWordDefinition = useDeleteWord(queryClient);
    const editWordDefinition = useEditWord(queryClient);
    const getDefByWord = useGetDefinitionByWord(queryClient);

    // handles selection change
    const handleSelectChange = useCallback(
        (selectedOption: SelectedType | null) => {
            // sets selected word object
            setSelectedWord(selectedOption || {});
            // sets context values
            setWord(selectedOption?.value || '');
        },
        [setWord]
    );

    // fetches selected word definition
    const fetchDefinition = useCallback(async () => {
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
    }, [getDefByWord, selectedWord?.value]);

    // handles clicking of search button
    const handleSearch = () => {
        fetchDefinition();
    };

    const handleEditWord = useCallback(async () => {
        if (selectedWord) {
            await editWordDefinition.mutateAsync({
                id: selectedWord?.id,
                definition: definition || null
            });
            setSelectedWord({});
            setDefinition('');
        }
    }, [definition, editWordDefinition, selectedWord]);

    const handleDeleteWord = useCallback(async () => {
        if (selectedWord) {
            await deleteWordDefinition.mutateAsync(selectedWord?.id);
            setSelectedWord({});
            setDefinition('');
        }
    }, [deleteWordDefinition, selectedWord]);

    const handleAddNewWord = useCallback(() => {
        navigate('/add_word');
    }, [navigate]);

    if (wordsLoading) return <div>Loading words...</div>;
    if (wordsError) return <div>Error loading words</div>;

    return (
        <WordContext.Provider value={contextValue}>
            <div>
                <button onClick={handleAddNewWord}>Add New Word</button>
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

                {error && <p className={styles.errormsg}>{error}</p>}
                {definition && <p>Definition: {definition}</p>}
                <EditWord
                    definition={definition}
                    setDefinition={setDefinition}
                    handleEditWord={handleEditWord}
                    handleDeleteWord={handleDeleteWord}
                />
            </div>
        </WordContext.Provider>
    );
};

export default WordDefinition;
