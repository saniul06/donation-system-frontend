import React from 'react'
import DonationForm from '../components/donation/DonationForm'

const Home = () => {
    return (
        <div className="donation-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="top-text header-text">
                            <h2>Donate</h2>
                        </div>
                    </div>
                    <DonationForm />
                </div>
            </div>
        </div>
    )

}

export default Home