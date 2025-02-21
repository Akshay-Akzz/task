import React from 'react';

const DeleteModal = ({ confirm, setConfirm, onDelete }) => {

    return (
        <div className={`modal ${confirm ? 'show' : 'fade'}`} id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden={!confirm} style={{ display: confirm ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setConfirm(false)}></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this item?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setConfirm(false)}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;
