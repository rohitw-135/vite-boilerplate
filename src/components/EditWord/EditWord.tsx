import { Controller, useForm } from 'react-hook-form';
import { useWordContext } from '../../context';
import { useEffect } from 'react';
import { DefinationType } from '../../pages/WordDefinition/typings';

type EditWordProps = {
    definition: string | null;
    setDefinition: (defintion: string | null) => void;
    handleEditWord: (data: DefinationType) => void;
    handleDeleteWord: () => void;
};

const EditWord = ({ definition, handleEditWord, handleDeleteWord }: EditWordProps) => {
    const { word } = useWordContext();
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            defination: definition || ''
        }
    });
    useEffect(() => {
        setValue('defination', definition || '');
    }, [definition, setValue]);
    return (
        <div>
            <h2>{`Word Being Edited ${`${word ? `:- (${word})` : ''}`}`}</h2>
            <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <input onBlur={onBlur} onChange={onChange} value={value} placeholder="Edit definition" />
                )}
                name="defination"
            />
            <button onClick={handleSubmit(handleEditWord)}>Edit</button>
            <button onClick={handleDeleteWord}>Delete</button>
        </div>
    );
};

export default EditWord;
