import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Navbar.css';

const Navbar = ({ isAuthenticated, username, setIsAuthenticated, setUsername }) => {
    const [menuOpen, setMenuOpen] = useState(false); // Quản lý trạng thái mở menu
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        console.log("Token:", token);
        console.log("Stored Username:", storedUsername);
        if (token) {
            setIsAuthenticated(true);
            setUsername(storedUsername || '');
        }
    }, [setIsAuthenticated]);


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const handleAboutClick = (e) => {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
            scroller.scrollTo('why-clients-choose-us', {
                duration: 400,
                delay: 0,
                smooth: 'easeInOutQuart',
                offset: -80,
            });
        }, 50);
    };

    const handleContactsClick = (e) => {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
            scroller.scrollTo('contacts', {
                duration: 400,
                delay: 0,
                smooth: 'easeInOutQuart',
                offset: -80,
            });
        }, 50);
    };

    const handleServicesClick = (e) => {
        e.preventDefault();
        navigate('/services');
    };


    return (
        <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-4xl font-bold text-white">LT Nails Guelph</h1>
                <div className="space-x-8">
                    <Link to="/" className="hover:text-gray-400 text-white">Home</Link>
                    <button
                        onClick={handleAboutClick}
                        className="hover:text-gray-400 text-white"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        About
                    </button>
                    <button
                        onClick={handleServicesClick}
                        className="hover:text-gray-400 text-white"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        Services
                    </button>
                    <Link to="/gallery" className="hover:text-gray-400 text-white">Gallery</Link>
                    <button
                        onClick={handleContactsClick}
                        className="hover:text-gray-400 text-white"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        Contacts
                    </button>
                    {isAuthenticated ? (
                        <div className="relative inline-block text-left navbar-item">
                            <button className="text-white">
                                {username}
                            </button>
                            <div className="navbar-dropdown">
                                <div className="py-1">
                                    <Link
                                        to="/myaccount"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        My Account
                                    </Link>

                                    <Link
                                        to="/booking-history"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Booking History
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="hover:text-gray-400 text-white">Sign In</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
