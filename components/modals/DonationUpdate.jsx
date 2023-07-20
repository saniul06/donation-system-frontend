import { useSelector } from 'react-redux'
import { donationCategories } from '../../constants/constansts'
import React, { useState } from 'react'

const DonationUpdate = ({ setShowUpdateModal, handleUpdate }) => {
    const { selectedDonation } = useSelector(state => state.donation);
    const [category, setCategory] = useState(selectedDonation?.category);
    const [amount, setAmount] = useState(selectedDonation?.amount);

    return (
        <div className="modal fade show donation-success" id="staticBackdrop"
            data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button onClick={() => setShowUpdateModal(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Category</label>
                                <select value={category} onChange={e => setCategory(e.target.value)} className="form-select" aria-label="Default select example">
                                    {donationCategories.map((item, index) => <option key={index} value={item}>{item}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Amount</label>
                                <input value={amount} onChange={e => setAmount(e.target.value)} type="number" className="form-control" id="exampleInputPassword1" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => handleUpdate({ category, amount, id: selectedDonation?.id })} type="button" className="btn btn-info">Update</button>
                        <button onClick={() => setShowUpdateModal(false)} type="button" className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DonationUpdate