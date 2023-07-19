import React from 'react'
import { donationCategories } from '../../constants/constansts'
import { useDispatch } from 'react-redux'
import { getDonationSummary } from '../../redux/actions/donationActions'

const Filter = () => {
    const dispatch = useDispatch();

    const handleFilter = (e) => {
        if (e.target.value === 'all') {
            dispatch(getDonationSummary())
        } else {
            dispatch(getDonationSummary({ category: e.target.value }))
        }
    }
    return (
        <div style={{ marginBottom: '20px', marginTop: '20px' }}>
            <label htmlFor="" className="form-label"><h3>Filter by Category</h3></label>
            <select onChange={handleFilter} className="form-select" aria-label="Default select example">
                <option value='all'>All Category</option>
                {donationCategories.map((item, index) => <option key={index} value={item}>{item}</option>)}
            </select>
        </div>
    )
}

export default Filter