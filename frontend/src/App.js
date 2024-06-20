import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ItemForm from './components/ItemForm';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import QRScanner from './components/QRScanner';
import Navbar from './components/Navbar';
import { getCurrentUser } from './services/authService';
import './App.css';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const user = getCurrentUser();
    return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<ItemForm />} />
                <Route path="/admin" element={<PrivateRoute element={AdminDashboard} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/scan" element={<QRScanner />} />
            </Routes>
        </Router>
    );
};

export default App;
