import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const DashBoardHeader = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate('/login')
    }

    return (
        <div className=''>
            <nav className="navbar navbar-expand-lg navbar-light bg-light border text-info container-fluid">
                <Link className="navbar-brand" to='/dashboard'>Task Management</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse me-auto" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default DashBoardHeader