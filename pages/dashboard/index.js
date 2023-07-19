import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Dashboard from '../../components/dashboard/Dashboard'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-toastify';
import { clearMessage } from '../../redux/actions/authActions';
import { clearMessage as clearDonationMessage } from '../../redux/actions/donationActions';
import DashboardLayout from '../../components/layout/DashboardLayout';


export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter()
  const { isAuthenticated, success, error } = useSelector(store => store.auth)
  const { success: donationSuccess, error: donationError, } = useSelector(store => store.donation)

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
      toast.success(success)
      dispatch(clearDonationMessage())
    }
    if (donationError) {
      toast.error(error.toString())
      dispatch(clearDonationMessage())
    }
  }, [success, error, donationSuccess, donationError, dispatch])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
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