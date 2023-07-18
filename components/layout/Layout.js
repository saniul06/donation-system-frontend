import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from '../../redux/actions/authActions';
import { useRouter } from 'next/router';

const Layout = ({ children, title = 'As-Sunnah Foundation' }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector(store => store.auth);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        if (!user && token) {
            dispatch(getCurrentUser());
        }
    }, [])

    return (
        <div>
            <Head>
                <meta charSet="UTF-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>{title}</title>
            </Head>

            <ToastContainer autoClose={2000} />
            {children}

        </div>
    )
}

export default Layout