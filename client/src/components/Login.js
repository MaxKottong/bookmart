import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message || "";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "test@example.com" && password === "password") {
            setError("");
            navigate("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="container mt-5">
        <h2>Login</h2>
        {message && <p className="alert alert-success">{message}</p>}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
