import { useGetWordDefinition } from '../services/wordService';

const useGetWordInfo = () => {
    const { data: wordsData, isLoading: wordsLoading, error: wordsError } = useGetWordDefinition();
    return {
        wordsData,
        wordsLoading,
        wordsError
    };
};

export default useGetWordInfo;
