import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Layout = () => {
    let { pathname } = useLocation();
    let status = pathname.split('/').pop() === 'register';

    return (
        <div className='auth_main'>
            <div className='card rounded-4 p-3 col-lg-4'>
                <h1 className='py-3 text-center'>{status ? "Register" : "Login"}</h1>
                <div className='py-3 w-100'>
                    {status ? <Register /> : <Login />}
                </div>
                <div className="text-center py-2">
                    {status ? <span>You have an account? <Link to='/login'>sign in</Link></span>
                        : <span> You don't have an account? <Link to='/register'>sign up</Link></span>
                    }
                </div>
            </div>
        </div>
    );
}

export default Layout;