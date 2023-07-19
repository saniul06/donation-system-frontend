import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../redux/actions/authActions'

const Header = ({ dashboard }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    const handleSignout = () => {
        dispatch(signout())
    }
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <Link className="navbar-brand text-white" href="/"><h4>As-Sunnah Foundation</h4></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {isAuthenticated ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/dashboard"><button className="btn btn-secondary">Dashboard</button></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="" onClick={handleSignout}><button className="btn btn-secondary">Logout</button></Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/register"><button className="btn btn-secondary">Register</button></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/login"><button className="btn btn-secondary">Login</button></Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header