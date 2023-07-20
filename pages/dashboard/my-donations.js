import React, { useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import DonationList from '../../components/dashboard/DonationList'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { clearMessage as clearDonationMessage, myDonations, myDonationCategoryFilter } from '../../redux/actions/donationActions'
import { clearMessage } from '../../redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const MyDonationPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { success: donationSuccess, error: donationError, myDonationList, myDonationListLength } = useSelector(store => store.donation)
    const { success, error, isAuthenticated } = useSelector(store => store.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, router])

    useEffect(() => {
        if (!myDonationList || myDonationList.length === 0)
            dispatch(myDonations({}))
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
        if (donationSuccess) {
            toast.success(donationSuccess)
            dispatch(clearDonationMessage())
        }
        if (donationError) {
            toast.error(donationError.toString())
            dispatch(clearDonationMessage())
        }
    }, [success, error, donationSuccess, donationError, dispatch])

    const handleLoadMore = () => {
        dispatch(myDonations(true))
    }

    const selectCategory = (category) => {
        // dispatch(myDonations({ category }))
        dispatch(myDonationCategoryFilter(category))
    }

    const handleCategoryFilter = () => {
        dispatch(myDonations())
    }

    return (
        <Layout title='Donation-list' >
            <DashboardLayout activeMenu='myDonationList'>
                <DonationList
                    donationList={myDonationList}
                    activeMenu='myDonationList'
                    loadMore={myDonationListLength}
                    handleLoadMore={handleLoadMore}
                    selectCategory={selectCategory}
                    handleCategoryFilter={handleCategoryFilter}
                />
            </DashboardLayout>
        </Layout>
    )
}

export default MyDonationPage