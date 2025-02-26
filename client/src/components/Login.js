import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const message = location.state?.message || "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            setError(data.message);

            if (response.ok) {
                login(username);

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Login failed');
        }
    };

    return (
        <div className="container mt-5">
        <h2>Login</h2>
        {message && <p className="alert alert-success">{message}</p>}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
        </div>
    );
};

export default Login;
