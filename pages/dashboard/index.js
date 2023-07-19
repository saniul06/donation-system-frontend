import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Dashboard from '../../components/dashboard/Dashboard'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-toastify';
import { clearMessage } from '../../redux/actions/authActions';
import { clearMessage as clearDonationMessage, getDonationSummary } from '../../redux/actions/donationActions';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { UserRole } from '../../utils/constants';


export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter()
  const { isAuthenticated, success, error, user } = useSelector(store => store.auth)
  const { success: donationSuccess, error: donationError, donationSummary } = useSelector(store => store.donation)

  useEffect(() => {
    if (!donationSummary) {
      dispatch(getDonationSummary())
    }
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

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
    if (isAuthenticated && user?.role === UserRole.user) {
      router.push('/dashboard/my-donations')
    }
  }, [isAuthenticated, router])
  return (
    <Layout title='Dashboard' >
      <DashboardLayout activeMenu='dashboard'>
        <Dashboard />
      </DashboardLayout>
    </Layout>
  )
}