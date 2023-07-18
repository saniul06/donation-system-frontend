import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import {getAllUser, getCurrentUser} from '../../../redux/actions/authActions'

const Sidebar = ({ dashboard, employeesList, createTicket, ticketsList }) => {
    const dispatch = useDispatch();

    const ggg = () => {
        dispatch(getAllUser())
    }
    return (
        <ul className="nav flex-column text-center text-sm-start">
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
            <p onClick={ggg} >get all</p>
        </ul>

    )
}

export default Sidebar
