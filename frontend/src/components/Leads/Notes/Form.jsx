import { memo } from 'react';
import { Input } from '../../FormElements';
import { Plus, Loader2 } from 'lucide-react';
import { useLeadsNotes } from './Context';

const LeadsNotesForm = memo(() => {
    const { newNote, setNewNote, handleAddNote, isSubmitting } = useLeadsNotes();
    return (
        <form onSubmit={handleAddNote} className="mb-4">
            <div className="flex gap-2 items-center">
                <div className="flex-1" style={{ marginBottom: '-1.5rem' }}>
                    <Input
                        name="newNote"
                        placeholder="Add a new note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" disabled={!newNote.trim() || isSubmitting} style={{ height: '44px', padding: '0 1rem' }}>
                        {isSubmitting ? (
                            <><Loader2 size={18} className="animate-spin" /> Adding...</>
                        ) : (
                            <><Plus size={18} /> Add</>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
});
LeadsNotesForm.displayName = 'LeadsNotesForm';
export default LeadsNotesForm;
