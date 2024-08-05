import React, { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAddWord } from '../../services/wordService';
import { useForm } from 'react-hook-form';
import { Inputs } from './typings';

const AddNewWord: React.FC = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const addWordDefinition = useAddWord(queryClient);
    const { register, handleSubmit } = useForm<Inputs>();

    const handleBack = useCallback(() => {
        navigate('/');
    }, [navigate]);

    // handles adding a word
    const handleAddWord = useCallback(
        async (data: Inputs) => {
            try {
                if (data?.word && data?.defination) {
                    const res = await addWordDefinition.mutateAsync({
                        word: data?.word,
                        definition: data?.defination
                    });
                    if (res?.id) {
                        alert('New word added successfully!');
                        handleBack();
                    }
                }
            } catch (err) {
                alert(err);
            }
        },
        [addWordDefinition, handleBack]
    );

    return (
        <div>
            <form onSubmit={handleSubmit(handleAddWord)}>
                <button onClick={handleBack}>Back</button>
                <h2>Add New Word</h2>
                <input type="text" placeholder="Enter new word" {...register('word', { required: true })} />
                <input
                    type="text"
                    placeholder="Enter it's definition"
                    {...register('defination', { required: true })}
                />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddNewWord;
