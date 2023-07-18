import { useRouter } from 'next/router';
import Dashboard from '../../components/dashboard/Dashboard'
import Heaser from '../../components/layout/Header'
import Layout from '../../components/layout/Layout'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector(store => store.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated])

  return (
    <Layout title='Dashboard' >
      <Heaser dashboard={true} />
      <Dashboard />
    </Layout>
  )
}