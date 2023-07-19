import React, { useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import DonationList from '../../components/dashboard/DonationList'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { clearMessage, myDonations } from '../../redux/actions/donationActions'
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
        dispatch(myDonations({ lastId: myDonationList[myDonationList.length - 1].id }))
    }

    const handleCategoryFilter = (category) => {
        dispatch(myDonations({ category }))
    }

    return (
        <Layout title='Donation-list' >
            <DashboardLayout activeMenu='myDonationList'>
                <DonationList
                    donationList={myDonationList}
                    activeMenu='myDonationList'
                    loadMore={myDonationListLength}
                    handleLoadMore={handleLoadMore}
                    handleCategoryFilter={handleCategoryFilter}
                />
            </DashboardLayout>
        </Layout>
    )
}

export default MyDonationPage