import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signout } from '../../../redux/actions/authActions'

const Sidebar = ({ dashboard, employeesList, createTicket, ticketsList }) => {
    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(signout())
    }
    return (
        <ul className="nav flex-column text-center text-sm-start">
            {/* <li className="nav-item">
                <Link href='/' className="nav-link" aria-current="page">Donate now</Link>
            </li> */}
            <Link href='/' style={{ textDecoration: 'none', textAlign: 'center', color: '#fff' }}><span style={{ background: 'radial-gradient(black, transparent)', display: 'inline-block', padding: '20px' }}>Donate now</span></Link>
            <li className="nav-item">
                <Link href='/' className={dashboard ? "nav-link sidebar-active" : "nav-link"} aria-current="page">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link href='' className={employeesList ? "nav-link sidebar-active" : "nav-link"}>Employees List</Link>
            </li>
            <li className="nav-item">
                <Link href='/tickets-list' className={ticketsList ? "nav-link sidebar-active" : "nav-link"} >Tickets List</Link>
            </li>
            <li className="nav-item">
                <Link href='/create-ticket' className={createTicket ? "nav-link sidebar-active" : "nav-link"} >Create Ticket</Link>
            </li>
            <li className="nav-item" onClick={handleSignout} >
                <a href='' className="nav-link" >Logout</a>
            </li>
        </ul>

    )
}

export default Sidebar
