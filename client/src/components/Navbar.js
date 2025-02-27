import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-0">
            <div className="container-fluid">
                <Link className="navbar-brand text-black" to="/">BookMart</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto flex-row align-items-center gap-3">
                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-primary text-black" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-secondary text-black" to="/about">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-secondary text-black" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-secondary text-black" to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <span className="navbar-text welcome-user">Welcome, {user}</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-secondary text-black" to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-logout" onClick={logout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
