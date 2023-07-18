import React, { useEffect, useState } from 'react'
import { donationCategories } from '../constants/constansts'
import { useDispatch } from 'react-redux'
import { validateEmail, validatePassword, validatePhoneNumber } from '../utils/helper'
import { toast } from 'react-toastify'

const Home = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [contact, setContact] = useState('');
    const [invalidContact, setInvalideContact] = useState(false);

    useEffect(() => {
        if (invalidContact) {
            toast.error('Please enter valid email/password for contact info');
        }
    }, [invalidContact])

    const handleDonation = (e) => {
        e.preventDefault();
        if (!category || !amount || !contact) {
            toast.warning('Please fill all fields');
            return;
        }

        if (!validateEmail(contact) && !validatePhoneNumber(contact)) {
            setInvalideContact(true);
            return;
        }
    }

    return (
        <div className="donation-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="top-text header-text">
                            <h6>Over 36,500+ Active Listings</h6>
                            <h2>Find Nearby Places &amp; Things</h2>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <form id="search-form" name="gs" method="submit" role="search" action="#">
                            <div className="row">
                                <div className="col-lg-3 align-self-center">
                                    <fieldset>
                                        <select className="form-select" aria-label="Area"
                                            onChange={e => setCategory(e.target.value)} required>
                                            <option>All Categories</option>
                                            {donationCategories.map((item, index) => <option key={index} value={item}>item</option>)}
                                        </select>
                                    </fieldset>
                                </div>
                                <div className="col-lg-3 align-self-center">
                                    <fieldset>
                                        <input onChange={e => { setContact(e.target.value); setInvalideContact(false) }} type="address" className={`searchText ${invalidContact && 'text-danger'}`}
                                            placeholder="Enter email/password" autoComplete="on" required />
                                    </fieldset>
                                </div>
                                <div className="col-lg-3 align-self-center">
                                    <fieldset>
                                        <input onChange={e => setAmount(e.target.value)} type="number" className="searchText"
                                            placeholder="Enter amount" autoComplete="on" required />
                                    </fieldset>
                                </div>
                                <div className="col-lg-3">
                                    <button onClick={handleDonation}>Donate Now</button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Home