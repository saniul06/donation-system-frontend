import React, { useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import DonationList from '../../components/dashboard/DonationList'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { clearMessage, getAllDonations, allDonationCategoryFilter, allDonationLoadMore } from '../../redux/actions/donationActions'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const DonationPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { success, error, donationList, donationListLength } = useSelector(store => store.donation)
    const { isAuthenticated } = useSelector(store => store.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, router])

    useEffect(() => {
        if (!donationList || donationList.length === 0)
            dispatch(getAllDonations({}))
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

    const handleLoadMore = () => {
        dispatch(getAllDonations(true))
        // dispatch(allDonationLoadMore(true))
    }

    const selectCategory = (category) => {
        // dispatch(getAllDonations({ category }))
        dispatch(allDonationCategoryFilter(category));
    }

    const handleCategoryFilter = () => {
        dispatch(getAllDonations())
    }

    return (
        <Layout title='Donation-list' >
            <DashboardLayout activeMenu='donationList'>
                <DonationList
                    donationList={donationList}
                    activeMenu='donationList'
                    loadMore={donationListLength}
                    handleLoadMore={handleLoadMore}
                    selectCategory={selectCategory}
                    handleCategoryFilter={handleCategoryFilter}
                />
            </DashboardLayout>
        </Layout>
    )
}

export default DonationPage