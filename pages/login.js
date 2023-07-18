import Header from '../components/layout/Header'
import Login from '../components/auth/Login'
import Layout from '../components/layout/Layout'

export default function LoginPage() {
    return (
        <Layout title='Login' >
            <Header />
            <Login />
        </Layout>
    )
}