import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddBook from './components/AddBook';
import BookDetail from './components/BookDetail';
import EditBook from './components/EditBook';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className='app-container'>
                <Navbar />
                <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/addbook" element={<PrivateRoute><AddBook /></PrivateRoute>} />
                    <Route path="/bookdetail/:bookId" element={<PrivateRoute><BookDetail /></PrivateRoute>} />
                    <Route path="/editbook/:bookId" element={<PrivateRoute><EditBook /></PrivateRoute>} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
                </main>
                <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;