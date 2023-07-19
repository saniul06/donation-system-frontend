import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../../utils/helper';
import { signup, clearMessage } from '../../redux/actions/authActions';

const Register = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, isAuthenticated, success } = useSelector(store => store.auth)

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    useEffect(() => {
        if (success) {
            toast.success(success.toString())
            dispatch(clearMessage())
        }
        if (error) {
            toast.error(error.toString())
            dispatch(clearMessage())
        }
        if (isAuthenticated) {
            router.back()
        }
    }, [success, error, isAuthenticated, dispatch, router])

    const handleRegister = async (e) => {
        e.preventDefault();
        let invalidCredentials = false;
        if (!username) {
            setInvalidUsername(true)
            invalidCredentials = true;
        }
        if (!validateEmail(email)) {
            setInvalidEmail(true)
            invalidCredentials = true;
        }
        if (!validatePassword(password)) {
            setInvalidPassword(true);
            invalidCredentials = true;
        }

        if (invalidCredentials) return;
        dispatch(signup({ username, email, password }, router))
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="login-box">
                            <h2 className="text-center">Register</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Username</label>
                                    <input onChange={(e) => { setUsername(e.target.value); setInvalidUsername(false) }} type="text" className="form-control" placeholder="Enter your username" />
                                    {invalidUsername && <p className='text-danger'>Please enter a username</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email</label>
                                    <input onChange={(e) => { setEmail(e.target.value); setInvalidEmail(false) }} type="email" className="form-control" id="inputEmail" placeholder="Enter your email" />
                                    {invalidEmail && <p className='text-danger'>Please enter a valid email</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword" className="form-label">Password</label>
                                    <input onChange={(e) => { setPassword(e.target.value); setInvalidPassword(false) }} type="password" className="form-control" id="inputPassword"
                                        placeholder="Enter your password" />
                                    {invalidPassword && <p className='text-danger'>Password can only contain alphanumeric characters, space, !, @, -, and _</p>}
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button disabled={loading ? true : false} onClick={handleRegister} type="submit" className="btn btn-primary">Register</button>
                                    <Link className="ms-auto" href="/login">Already have an account? Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register