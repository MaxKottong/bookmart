import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddBook from './components/AddBook';
import BookDetail from './components/BookDetail';
import EditBook from './components/EditBook';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/addbook" element={<AddBook/>}/>
                    <Route path="/bookdetail" element={<BookDetail/>}/>
                    <Route Path="/editbook" elememt={<EditBook/>}/>
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;

