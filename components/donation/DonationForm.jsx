import React, { useEffect, useState, useRef } from 'react'
import { donationCategories } from '../../constants/constansts'
import { useDispatch, useSelector } from 'react-redux'
import { validateEmail, validatePhoneNumber } from '../../utils/helper'
import { toast } from 'react-toastify'
import { clearMessage, createDonation } from '../../redux/actions/donationActions'
import DonationSuccess from '../modals/DonationSuccess'

const DonationForm = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [contact, setContact] = useState('');
    const [invalidContact, setInvalideContact] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef(null);

    const { isAuthenticated, user } = useSelector(store => store.auth);
    const { loading, success, error, createdDonation } = useSelector(state => state.donation);

    useEffect(() => {
        if (success) {
            toast.success(success)
            setShowModal(true)
            setCategory('');
            setAmount(0);
            setContact('');
            dispatch(clearMessage());
        }
        if (error) {
            toast.error(error.toString())
            dispatch(clearMessage());
        }
    }, [success, error])

    useEffect(() => {
        if (invalidContact) {
            toast.error('Please enter valid email/password for contact info');
        }
    }, [invalidContact])

    const handleDonation = (e) => {
        e.preventDefault();
        console.log('here')
        if (!category || !amount || !contact) {
            toast.warning('Please fill all fields');
            return;
        }

        if (!validateEmail(contact) && !validatePhoneNumber(contact)) {
            setInvalideContact(true);
            return;
        }

        const parsedAmount = parseFloat(amount)

        if (isNaN(parsedAmount)) {
            toast.error('Please enter valid amount');
            return;
        }

        const payload = { category, amount: parsedAmount, contact };

        if (isAuthenticated & user?.id) {
            payload.userId = user.id;
        }

        dispatch(createDonation(payload))
    }

    const handleInputClick = () => {
        inputRef.current.select();
    };

    return (
        <>
            <div className="col-lg-12">
                <form id="search-form" name="gs" method="submit" role="search" action="#">
                    <div className="row">
                        <div className="col-lg-3 align-self-center">
                            <fieldset>
                                <select value={category} className="form-select" aria-label="Area"
                                    onChange={e => setCategory(e.target.value)} required>
                                    <option>All Categories</option>
                                    {donationCategories.map((item, index) => <option key={index} value={item}>{item}</option>)}
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-lg-3 align-self-center">
                            <fieldset>
                                <input value={contact} onChange={e => { setContact(e.target.value); setInvalideContact(false) }} type="address" className={`searchText ${invalidContact && 'text-danger'}`}
                                    placeholder="Enter email/password" autoComplete="on" required />
                            </fieldset>
                        </div>
                        <div className="col-lg-3 align-self-center">
                            <fieldset>
                                <input value={amount} onChange={e => setAmount(e.target.value)} type="number" className="searchText" onClick={handleInputClick} ref={inputRef}
                                    placeholder="Enter amount" autoComplete="on" required />
                            </fieldset>
                        </div>
                        <div className="col-lg-3">
                            <button disabled={loading ? true : false} onClick={handleDonation}>Donate Now</button>
                        </div>
                    </div>
                </form>
            </div>
            {showModal && <DonationSuccess setShowModal={setShowModal} createdDonation={createdDonation} />}
        </>
    )
}

export default DonationForm