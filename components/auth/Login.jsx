import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { clearMessage, signin } from '../../redux/actions/authActions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { validateEmail } from '../../utils/helper'
import { UserRole } from '../../utils/constants'

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const { loading, success, signinsuccess, error, isAuthenticated, user, signupSuccess } = useSelector(store => store.auth)

    const handleLogin = (e) => {
        e.preventDefault();
        let invalidCredentials = false;
        if (!validateEmail(email)) {
            setInvalidEmail(true)
            invalidCredentials = true;
        }
        if (!password) {
            setInvalidPassword(true);
            invalidCredentials = true;
        }

        if (invalidCredentials) return;
        dispatch(signin({ email, password }))
    }

    useEffect(() => {
        if (signupSuccess) {
            toast.success(signupSuccess)
            dispatch(clearMessage())
        }
        if (error) {
            toast.error(error.toString())
            dispatch(clearMessage())
        }
        if (isAuthenticated && signinsuccess && user?.role === UserRole.admin) {
            router.push('/dashboard')
        } else if (isAuthenticated && signinsuccess && user?.role === UserRole.user) {
            router.push('/dashboard/my-donations')
        }

        else if (isAuthenticated) {
            router.back()
        }
    }, [success, error, isAuthenticated, signinsuccess, signupSuccess])

    return (
        <div className="login">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="login-box">
                            <h2 className="text-center">Login</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email</label>
                                    <input onChange={(e) => { setEmail(e.target.value); setInvalidEmail(false) }} type="email" className="form-control" placeholder="Enter your email" />
                                    {invalidEmail && <p className='text-danger'>Please enter a valid email</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword" className="form-label">Password</label>
                                    <input onChange={(e) => { setPassword(e.target.value); setInvalidPassword(false) }} type="password" className="form-control" placeholder="Enter your password" />
                                    {invalidPassword && <p className='text-danger'>Please enter password</p>}
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button disabled={loading ? true : false} type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
                                    <Link className="ms-auto" href="/register">Already have an account? Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login