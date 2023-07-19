import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const SingleDonation = ({ donation, serial, handleDonationDelete }) => {

    return (
        <tr>
            <td>{serial}</td>

            <td>{donation?.category}</td>

            <td>   {donation?.amount}   </td>

            <td> {donation?.contact}</td>

            <td>{donation?.createdAt}</td>

            <td>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => { }}>
                    Details
                </button>
                <button onClick={() => handleDonationDelete(donation.id)}
                    className="btn btn-sm btn-danger">
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default SingleDonation