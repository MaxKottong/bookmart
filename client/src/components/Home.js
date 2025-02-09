import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 custom-home">
        <h1 className="text-center mb-4">Welcome to BookMart</h1>
        <p className="text-center mb-5">Your one-stop solution for book selling and buying.</p>

        <Link to={user ? "/inventory" : "/register"} className="btn btn-primary btn-lg">
        {user ? "Go to Inventory" : "Get Started"}
        </Link>
        </div>
);
};

export default Home;