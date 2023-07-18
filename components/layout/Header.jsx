import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {signout} from '../../redux/actions/authActions'

const Header = ({dashboard}) => {
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector(state => state.auth);
    const handleSignout = () => {
        dispatch(signout())
    }
  return (
    <div className={dashboard ? "container-fluid" : "container"}>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <Link className="navbar-brand" href="/">As-Sunnah Foundation</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                {isAuthenticated ? 
                   <>
                   <li className="nav-item">
                       <Link className="nav-link" href="/dashboard">Dashboard</Link>
                   </li>
                   <li className="nav-item">
                       <Link className="nav-link" href="" onClick={handleSignout}>Logout</Link>
                   </li>
                   </>
                : 
                <>
                <li className="nav-item">
                <Link className="nav-link" href="/register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="/login">Login</Link>
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