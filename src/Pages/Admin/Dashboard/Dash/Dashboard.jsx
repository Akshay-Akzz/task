import React from 'react'
import DashBoardHeader from './DashboardHeader'
import DashBoardSideBar from './DashboardSideBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className="d-flex flex-column vh-100">
            <DashBoardHeader />
            <div className="d-flex flex-grow-1">
                <DashBoardSideBar />
                <main className="flex-grow-1 p-3 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Dashboard
