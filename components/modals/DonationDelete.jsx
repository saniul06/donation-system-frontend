import React from 'react'

const DonationDelete = ({ setShowModal, handleDelete }) => {
    return (
        <div className="modal fade show donation-success" id="staticBackdrop"
            data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button onClick={() => setShowModal(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p> Are you sure to delete? </p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleDelete} type="button" className="btn btn-danger">Delete</button>
                        <button onClick={() => setShowModal(false)} type="button" className="btn btn-primary">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DonationDelete