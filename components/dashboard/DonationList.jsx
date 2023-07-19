import React, { useState } from 'react'
import SingleDonation from './SingleDonation'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDonation } from '../../redux/actions/donationActions';
import DonationDelete from '../modals/DonationDelete';
import DonationUpdate from '../modals/DonationUpdate';

const DonationList = () => {
    const dispatch = useDispatch();
    const { donationList } = useSelector(state => state.donation)
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [donationId, setDonationId] = useState();

    const handleDonationDelete = (id) => {
        setShowModal(true);
        setDonationId(id);
    }

    const handleDelete = () => {
        console.log('dddddddddd: ', donationId)
        dispatch(deleteDonation(donationId, setShowModal));
    }
    return (
        <>
            <h2 className='mb-4'>All Donations </h2>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <td>Serial</td>
                            <td>Category</td>
                            <td>Amount</td>
                            <td>Contact</td>
                            <td>Created Date</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {donationList && donationList.map((item, index) =>
                            <SingleDonation
                                key={index}
                                donation={item}
                                serial={index + 1}
                                handleDonationDelete={handleDonationDelete}
                            />)}
                    </tbody>
                </table>
            </div>
            {showModal && <DonationDelete handleDelete={handleDelete} setShowModal={setShowModal} />}
            {showUpdateModal && <DonationUpdate handleDelete={handleDelete} setShowModal={setShowModal} />}
        </>
    )
}

export default DonationList