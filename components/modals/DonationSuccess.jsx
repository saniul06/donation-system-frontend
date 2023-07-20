import React from 'react'

const DonationSuccess = ({ createdDonation, setShowModal }) => {
  return (
    <div className="modal fade show donation-success" id="staticBackdrop"
      data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-success" id="staticBackdropLabel">Donation created succssfully</h1>
            <button onClick={() => setShowModal(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {createdDonation?.user && <p> Donor: <span> {createdDonation?.user?.username}</span> </p>}
            <p> Category: <span> {createdDonation?.category}</span> </p>
            <p> Amount: <span> {createdDonation?.amount} BDT</span> </p>
            <p> Contact: <span> {createdDonation?.contact}</span> </p>
          </div>
          <div className="modal-footer">
            <button onClick={() => setShowModal(false)} type="button" className="btn btn-primary">Ok</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default DonationSuccess