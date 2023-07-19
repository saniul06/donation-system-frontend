import React, { useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import DonationList from '../../components/dashboard/DonationList'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { clearMessage, getAllDonations } from '../../redux/actions/donationActions'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const DonationPage = () => {
    const dispatch = useDispatch();
    const { success, error, donationList } = useSelector(store => store.donation)

    useEffect(() => {
        if (!donationList || donationList.length === 0)
            dispatch(getAllDonations())
    }, [])

    useEffect(() => {
        if (success) {
            toast.success(success)
            dispatch(clearMessage())
        }
        if (error) {
            toast.error(error.toString())
            dispatch(clearMessage())
        }
    }, [success, error, dispatch])

    return (
        <Layout title='Donation-list' >
            <DashboardLayout activeMenu='donationList'>
                <DonationList />
            </DashboardLayout>
        </Layout>
    )
}

export default DonationPage