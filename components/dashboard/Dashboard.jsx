import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDonationSummary } from '../../redux/actions/donationActions'
import Filter from '../donation/Filter';

const Dashboard = () => {
    const dispatch = useDispatch();

    const fetchLatestData = () => {
        dispatch(getDonationSummary())
    }

    const handleFilter = () => { }

    const { donationSummary, loading } = useSelector(state => state.donation);
    return (
        <>
            <h1>Donation Summary</h1>
            <hr />
            <button onClick={fetchLatestData} id="loadingButton" type="button" class="btn btn-primary">
                Fetch Latest Data
            </button>

            <Filter />

            <div className="container">
                <div className="row mt-3">

                    <div className="col-md-3 h-100" style={{ height: '250px' }}>
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-header">Today</div>
                            <div className="card-body">
                                <h5 className="card-title">{donationSummary?.todayAmount} BDT</h5>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-3 h-100" style={{ height: '250px' }}>
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header">This Week</div>
                            <div className="card-body">
                                <h5 className="card-title">{donationSummary?.weeklyAmount} BDT</h5>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-3 h-100" style={{ height: '250px' }}>
                        <div className="card text-white bg-danger mb-3">
                            <div className="card-header">This Month</div>
                            <div className="card-body">
                                <h5 className="card-title">{donationSummary?.monthlyAmount} BDT</h5>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-3 h-100" style={{ height: '250px' }}>
                        <div className="card text-white bg-danger mb-3">
                            <div className="card-header">This year </div>
                            <div className="card-body">
                                <h5 className="card-title">{donationSummary?.yearlyAmount} BDT</h5>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-3 h-100" style={{ height: '250px' }}>
                        <div className="card text-white bg-danger mb-3">
                            <div className="card-header">Total </div>
                            <div className="card-body">
                                <h5 className="card-title">{donationSummary?.totalAmount} BDT</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Dashboard
