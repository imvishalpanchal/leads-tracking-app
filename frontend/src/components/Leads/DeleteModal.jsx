import { memo } from 'react';
import { createPortal } from 'react-dom';

const DeleteModal = memo((props) => {
    const { isOpen, onClose, onConfirm, leadName, isDeleting } = props;
    if (typeof document === 'undefined') return null;

    return createPortal(
        <div
            className={`modal-overlay ${isOpen ? 'open' : ''}`}
            onClick={!isDeleting ? onClose : undefined}
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
            <div
                className="modal-content"
                style={{ padding: '2.5rem', textAlign: 'center', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                onClick={(e) => e.stopPropagation()}
            >

                <h3 className="mb-5" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--secondary-color)' }}>
                    Delete Lead
                </h3>

                <div style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: '1.6' }}>
                    Are you sure you want to delete <strong>{leadName}</strong>? <br />
                    This action cannot be undone and all associated notes will be removed.
                </div>

                <div className="flex gap-4 w-full">
                    <button
                        className="btn btn-secondary flex-1"
                        onClick={onClose}
                        disabled={isDeleting}
                        style={{ padding: '0.875rem', fontSize: '1rem' }}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-danger flex-1 flex items-center justify-center gap-2"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        style={{ padding: '0.875rem', fontSize: '1rem' }}
                    >
                        {isDeleting ? (
                            <span
                                className="loader-spinner"
                                style={{ width: '20px', height: '20px', borderWidth: '2.5px', borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
                            ></span>
                        ) : null}
                        {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
});

DeleteModal.displayName = DeleteModal
export default DeleteModal;
