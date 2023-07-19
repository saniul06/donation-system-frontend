import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signout } from '../../../redux/actions/authActions'

const Sidebar = ({ dashboard, activeMenu, employeesList, createTicket, ticketsList }) => {
    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(signout())
    }
    return (
        <ul className="nav flex-column text-center text-sm-start">
            <Link href='/' style={{ textDecoration: 'none', textAlign: 'center', color: '#fff', marginBottom: '20px' }}><button className="btn btn-secondary btn-lg">Donate</button></Link>
            {/* <Link href='/' style={{ textDecoration: 'none', textAlign: 'center', color: '#fff' }}><span style={{ background: 'radial-gradient(black, transparent)', display: 'inline-block', padding: '20px' }}>Donate</span></Link> */}
            <li className="nav-item">
                <Link href='/dashboard' className={activeMenu === 'dashboard' ? "nav-link sidebar-active" : "nav-link"} aria-current="page">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link href='/dashboard/donation-list' className={activeMenu === 'donationList' ? "nav-link sidebar-active" : "nav-link"}>Donation List</Link>
            </li>
            <li className="nav-item">
                <Link href='/tickets-list' className={ticketsList ? "nav-link sidebar-active" : "nav-link"} >Tickets List</Link>
            </li>
            <li className="nav-item">
                <Link href='/create-ticket' className={createTicket ? "nav-link sidebar-active" : "nav-link"} >Create Ticket</Link>
            </li>
            <li className="nav-item" onClick={handleSignout} >
                <Link href="" className="nav-link" >Logout</Link>
            </li>
        </ul>

    )
}

export default Sidebar
