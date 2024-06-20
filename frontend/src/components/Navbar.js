import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';

const Navbar = () => {
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        window.location = '/login';
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {user ? (
                    <>
                        <li>
                            <Link to="/admin">Admin Dashboard</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        {/* <li>
                            <Link to="/signup">Signup</Link>
                        </li> */}
                    </>
                )}
                <li>
                    <Link to="/scan">Scan QR Code</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
