import React, { useState } from 'react'
import SingleDonation from './SingleDonation'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDonation, updateDonation, getAllDonations } from '../../redux/actions/donationActions';
import DonationDelete from '../modals/DonationDelete';
import DonationUpdate from '../modals/DonationUpdate';
import { toast } from 'react-toastify';
import { donationCategories } from '../../constants/constansts';

const DonationList = ({ donationList, activeMenu, loadMore, handleLoadMore, selectCategory, handleCategoryFilter }) => {

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

    return (
        <>
            <h2 className='mb-4'>{activeMenu === 'donationList' ? 'All' : 'My'} Donations </h2>
            <div style={{ marginBottom: '20px', display: 'inline-block', gap: '10px' }}>
                <label htmlFor="" className="form-label">Filter by Category</label>
                <div style={{ display: 'flex' }}>
                    <select onChange={(e) => selectCategory(e.target.value)} className="form-select" aria-label="Default select example">
                        <option value='all'>All category</option>
                        {donationCategories.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                    <button onClick={handleCategoryFilter} className='btn btn-success'>Filter</button>
                </div>
            </div >
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
                    <button onClick={handleLoadMore} className="btn btn-success">Load More</button>
                </div> : <p className="text-center text-dark">Nothing to show</p>}
            </div>
            {showModal && <DonationDelete handleDelete={handleDelete} setShowModal={setShowModal} />}
            {
                showUpdateModal && <DonationUpdate
                    handleUpdate={handleUpdate}
                    setShowModal={setShowModal}
                    setShowUpdateModal={setShowUpdateModal}
                />
            }
        </>
    )
}

export default DonationList