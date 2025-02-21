import React from 'react'
import { Link } from 'react-router-dom'

const DashBoardSideBar = () => {
    return (
        <div className="bg-light border-end p-3" style={{ width: '250px' }}>
            <nav className="nav flex-column">
                <Link to='/dashboard/list'>List</Link>
            </nav>
        </div>
    )
}

export default DashBoardSideBar