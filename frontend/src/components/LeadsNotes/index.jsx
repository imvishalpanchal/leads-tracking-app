import { useState, forwardRef, useImperativeHandle, memo } from 'react';
import { MessageSquare } from 'lucide-react';
import { showToast } from '../../utils/toast';
import messages from '../../utils/messages';
import { leadService } from '../../services';
import LeadsNotesForm from './Form';
import LeadsNotesList from './List';
import LeadsNotesContext from './Context';

const LeadsNotes = memo(forwardRef((props, ref) => {
    const { leadId, notes, onNoteAdded } = props;
    const [newNote, setNewNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useImperativeHandle(ref, () => ({
        clearInput: () => setNewNote('')
    }));

    const handleAddNote = async (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;
        setIsSubmitting(true);
        try {
            await leadService.addNote(leadId, newNote);
            setNewNote('');
            showToast(messages.NOTE_ADD_SUCCESS, 'success');
            if (onNoteAdded) {
                onNoteAdded();
            }
        } catch (error) {
            showToast(messages.NOTE_ADD_FAIL, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contextValue = {
        notes,
        newNote,
        setNewNote,
        handleAddNote,
        isSubmitting
    };

    return (
        <LeadsNotesContext.Provider value={contextValue}>
            <div className="card">
                <h2 className="flex items-center gap-2 mb-4"><MessageSquare /> Notes</h2>
                <LeadsNotesForm />
                <LeadsNotesList />
            </div>
        </LeadsNotesContext.Provider>
    );
}));
LeadsNotes.displayName = 'LeadsNotes';
export default LeadsNotes;