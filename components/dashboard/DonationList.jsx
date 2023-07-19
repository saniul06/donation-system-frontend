import React, { useState } from 'react'
import SingleDonation from './SingleDonation'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDonation } from '../../redux/actions/donationActions';
import DonationDelete from '../modals/DonationDelete';
import DonationUpdate from '../modals/DonationUpdate';

const DonationList = ({ donationList, activeMenu, loadMore, handleLoadMore }) => {
    console.log('loadmore: ', loadMore)
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [donationId, setDonationId] = useState();

    const handleDonationDelete = (id) => {
        setShowModal(true);
        setDonationId(id);
    }

    const handleDelete = () => {
        dispatch(deleteDonation(donationId, setShowModal));
    }
    return (
        <>
            <h2 className='mb-4'>{activeMenu === 'donationList' ? 'All' : 'My'} Donations </h2>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <td>Serial</td>
                            <td>Category</td>
                            <td>Amount</td>
                            <td>Contact</td>
                            <td>Created Date</td>
                            {activeMenu === 'donationList' && <td>Actions</td>}
                        </tr>
                    </thead>
                    <tbody>
                        {donationList && donationList.map((item, index) =>
                            <SingleDonation
                                key={index}
                                donation={item}
                                serial={index + 1}
                                handleDonationDelete={handleDonationDelete}
                                activeMenu={activeMenu}
                            />)}
                    </tbody>

                </table>
                {loadMore ? <div style={{ textAlign: 'center' }}>
                    <button onClick={handleLoadMore} className="btn btn-primary">Load More</button>
                </div> : <p className="text-center text-dark">Nothing to show</p>}
            </div>
            {showModal && <DonationDelete handleDelete={handleDelete} setShowModal={setShowModal} />}
            {showUpdateModal && <DonationUpdate handleDelete={handleDelete} setShowModal={setShowModal} />}
        </>
    )
}

export default DonationList