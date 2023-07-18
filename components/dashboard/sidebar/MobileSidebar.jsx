import React, { useState } from 'react'
import Link from 'next/link'

const MobileSidebar = ({ dashboard, employeesList, createTicket, ticketsList }) => {

    const [addClass, setAddClass] = useState(true)

    const click = () => {
        setAddClass(prev => !prev)
    }

    return (
        <div>

            <div className="pt-3 mobile-sidebar menu-icon text-center" style={{ left: 0 }}>
                <i className="fas fa-bars text-light" onClick={click}></i>
            </div>

            <div className={addClass ? "p-0 pt-3 mobile-sidebar responsive left" : "p-0 pt-3 mobile-sidebar responsive"}>
                <i className="fas fa-times text-light" style={{ position: 'absolute', right: '13px', cursor: 'pointer' }} onClick={click}></i>

                <ul className=' '>
                    <li className={dashboard ? 'sidebar-active' : ''} > <Link href='/'>Dashboard</Link></li >
                    <li className={employeesList ? 'sidebar-active' : ''}><Link href='/employees-list'>Employees List</Link></li>
                    <li className={ticketsList ? 'sidebar-active' : ''}><Link href='/tickets-list'>Tickets List</Link></li>
                    <li className={createTicket ? 'sidebar-active' : ''}><Link href='/create-ticket'>Create Ticket</Link></li>
                </ul>
            </div>

        </div>
    )
}

export default MobileSidebar
