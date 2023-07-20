import React, { useState } from 'react'
import { UserRole } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { selectDonation } from '../../redux/actions/donationActions'

const SingleDonation = ({ donation, serial, setShowUpdateModal, handleDonationDelete, activeMenu }) => {
    const dispatch = useDispatch();
    return (
        <tr>
            <td>{serial}</td>

            <td>{donation?.category}</td>

            <td>   {donation?.amount && Number(donation?.amount).toFixed(2)}   </td>

            <td> {donation?.contact}</td>

            {activeMenu === 'donationList' && <td> {donation?.user?.username || 'Anonymous'}</td>}

            <td>{new Date(donation?.createdAt).toLocaleString()}</td>

            {activeMenu === 'donationList' && <td>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => { setShowUpdateModal(true); dispatch(selectDonation(donation)) }}>
                    Edit
                </button>
                <button onClick={() => handleDonationDelete(donation.id)}
                    className="btn btn-sm btn-danger">
                    Delete
                </button>
            </td>}
        </tr >
    )
}

export default SingleDonation