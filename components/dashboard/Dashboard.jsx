import React, {useEffect} from 'react'
import Sidebar from './sidebar/Sidebar'
import MobileSidebar from './sidebar/MobileSidebar'

const Dashboard = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row" style={{ position: 'relative' }}>

                    <MobileSidebar dashboard={true} />

                    <div className="p-0 col-sm-3 col-md-2 pt-3 sidebar">
                        <Sidebar dashboard={true} />
                    </div>

                    <div className="col-sm-9 col-md-10 pt-3">
                        <div className="dashboard">
                            <h1>Dashboard</h1>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard
