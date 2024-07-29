import axios from 'axios';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { AddWordBodyType, EditWordBodyType } from './typings';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Different functions to perform adding, retrieving, modifying, deleting the word and their definitions
export const getWordDefinition = async (word?: string) => {
    const response = await fetch(`${API_URL}${`${word ? `?search=${word}` : ''}`}`);
    return response.json();
};

export const useGetWordDefinition = () => useQuery(['wordsList'], () => getWordDefinition());

// mutated get definition by word
export const useGetDefinitionByWord = (queryClient: QueryClient) =>
    useMutation((word?: string) => getWordDefinition(word), {
        onSuccess: () => {
            queryClient.invalidateQueries('wordsList');
        }
    });

// add a new word
export const addWordDefinition = async (body: AddWordBodyType) => {
    const response = await axios.post(API_URL, { word: body?.word, definition: body?.definition });
    return response.data;
};

export const useAddWord = (queryClient: QueryClient) =>
    useMutation((body: AddWordBodyType) => addWordDefinition(body), {
        onSuccess: () => {
            queryClient.invalidateQueries('wordsList');
        }
    });

// edit word request
export const editWordDefinition = async (body: EditWordBodyType) => {
    const response = await axios.put(`${API_URL}/${body?.id}`, { definition: body?.definition });
    return response.data;
};

export const useEditWord = (queryClient: QueryClient) =>
    useMutation((body: EditWordBodyType) => editWordDefinition(body), {
        onSuccess: () => {
            queryClient.invalidateQueries('wordsList');
        }
    });

export const deleteWord = async (id?: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const useDeleteWord = (queryClient: QueryClient) =>
    useMutation((id?: string) => deleteWord(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('wordsList');
        }
    });
