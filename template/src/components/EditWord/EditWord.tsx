import { useWordContext } from '../../context';

type EditWordProps = {
    definition: string | null;
    setDefinition: (defintion: string | null) => void;
    handleEditWord: () => void;
    handleDeleteWord: () => void;
};

const EditWord = ({ definition, setDefinition, handleEditWord, handleDeleteWord }: EditWordProps) => {
    const { word } = useWordContext();
    return (
        <div>
            <h2>{`Word Being Edited ${`${word ? `:- (${word})` : ''}`}`}</h2>
            <input
                type="text"
                value={definition || ''}
                onChange={(e) => setDefinition(e.target.value)}
                placeholder="Edit definition"
            />
            <button onClick={handleEditWord}>Edit</button>
            <button onClick={handleDeleteWord}>Delete</button>
        </div>
    );
};

export default EditWord;
