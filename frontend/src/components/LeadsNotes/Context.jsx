import { createContext, useContext } from 'react';

const LeadsNotesContext = createContext();

export const useLeadsNotes = () => {
    const context = useContext(LeadsNotesContext);
    if (!context) {
        throw new Error('useLeadsNotes must be used within a LeadsNotesProvider');
    }
    return context;
};

export default LeadsNotesContext;
