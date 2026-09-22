import { memo } from 'react';
import { useLeadsNotes } from './Context';
import { formatDateTime } from '../../utils/date';

const LeadsNotesList = memo(() => {
    const { notes } = useLeadsNotes();

    return (
        <div className="notes-container">
            {notes && notes.length > 0 ? (
                notes.map((note, inx) => (
                    <div key={note.id + '-' + inx} className="note-item">
                        <div className="note-date">{formatDateTime(note.createdAt)}</div>
                        <div>{note.content}</div>
                    </div>
                ))
            ) : (
                <div className="text-secondary text-sm">No notes yet.</div>
            )}
        </div>
    );
});
LeadsNotesList.displayName = 'LeadsNotesList';
export default LeadsNotesList;
