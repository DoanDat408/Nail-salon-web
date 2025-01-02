import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/MyAccount.css';

const MyAccount = () => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        phoneNumber: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:5118/api/Auth/userinfo', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserInfo({
                        username: data.userName,
                        email: data.email,
                        phoneNumber: data.phoneNumber
                    });
                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Do you agree to delete your account?");

        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5118/api/Auth/delete-account', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    alert("Your account has been deleted.");
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('email');
                    localStorage.removeItem('phoneNumber');
                    navigate('/login'); // Chuyển đến trang login sau khi xóa thành công
                } else {
                    alert("Failed to delete account. Please try again.");
                }
            } catch (error) {
                console.error('Error during account deletion:', error);
                alert("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="my-account-container">
            <h2>Welcome, {userInfo.username}</h2>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Phone Number:</strong> {userInfo.phoneNumber}</p>
            <div className="account-actions">
                <button className="edit-account-button">Edit Account Details</button>
                <button onClick={handleDeleteAccount} className="delete-account-button">Delete Account</button>
                {/* Thêm các tùy chọn khác như "Change Password" nếu cần */}
            </div>
        </div>
    );
};

export default MyAccount;
