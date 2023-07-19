import React from 'react'
import Sidebar from '../dashboard/sidebar/Sidebar'

const DashboardLayout = ({ children, activeMenu }) => {
    return (
        <div className="container-fluid">
            <div className="row" style={{ position: 'relative' }}>

                <div className="p-0 col-sm-3 col-md-2 pt-3 sidebar">
                    <Sidebar activeMenu={activeMenu} />
                </div>

                <div className="col-sm-9 col-md-10 pt-3">
                    <div className="dashboard">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout