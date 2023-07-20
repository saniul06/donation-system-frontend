import React, { useState } from 'react'
import SingleDonation from './SingleDonation'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDonation, updateDonation } from '../../redux/actions/donationActions';
import DonationDelete from '../modals/DonationDelete';
import DonationUpdate from '../modals/DonationUpdate';
import { toast } from 'react-toastify';
import { donationCategories } from '../../constants/constansts';

const DonationList = ({ donationList, activeMenu, loadMore, handleLoadMore, handleCategoryFilter }) => {

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

    const handleUpdate = data => {
        const { amount, category, id } = data;
        const parsedAmount = parseFloat(amount)
        if (isNaN(parsedAmount)) {
            toast.error('Please enter valid amount');
            return;
        }
        dispatch(updateDonation({ id, amount: parsedAmount, category }, setShowUpdateModal))
    }

    const handleFilter = e => {
        console.log('e si: ', e.target.value)
        handleCategoryFilter(e.target.value)
    }

    return (
        <>
            <h2 className='mb-4'>{activeMenu === 'donationList' ? 'All' : 'My'} Donations </h2>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="" className="form-label">Search by Category</label>
                <select onChange={handleFilter} defaultValue={donationCategories[0]} className="form-select" aria-label="Default select example">
                    <option disabled>select category</option>
                    {donationCategories.map((item, index) => <option key={index} value={item}>{item}</option>)}
                </select>
            </div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <td>Serial</td>
                            <td>Category</td>
                            <td>Amount</td>
                            <td>Contact</td>
                            {activeMenu === 'donationList' && <td>Donor</td>}
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
                                setShowUpdateModal={setShowUpdateModal}
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
            {showUpdateModal && <DonationUpdate
                handleUpdate={handleUpdate}
                setShowModal={setShowModal}
                setShowUpdateModal={setShowUpdateModal}
            />}
        </>
    )
}

export default DonationList