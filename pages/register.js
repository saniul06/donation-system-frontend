import Register from '../components/auth/Register'
import Layout from '../components/layout/Layout'
import React from 'react'
import { wrapper } from '../redux/store';
import Header from '../components/layout/Header';

const RrgisterPage = () => {
    return (
        <Layout title='Register' >
            <Header />
            <Register />
        </Layout>
    )
}

export default RrgisterPage