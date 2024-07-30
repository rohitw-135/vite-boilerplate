import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { WordDefinition as Home, AddNewWord } from '../pages';

const Flows = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="add_word" element={<AddNewWord />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Flows;
