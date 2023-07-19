import React, { useState } from 'react'
import { UserRole } from '../../utils/constants';

const SingleDonation = ({ donation, serial, handleDonationDelete, activeMenu }) => {

    return (
        <tr>
            <td>{serial}</td>

            <td>{donation?.category}</td>

            <td>   {donation?.amount}   </td>

            <td> {donation?.contact}</td>

            <td>{new Date(donation?.createdAt).toLocaleString()}</td>

            {activeMenu === 'donationList' && <td>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => { }}>
                    Details
                </button>
                <button onClick={() => handleDonationDelete(donation.id)}
                    className="btn btn-sm btn-danger">
                    Delete
                </button>
            </td>}
        </tr>
    )
}

export default SingleDonation