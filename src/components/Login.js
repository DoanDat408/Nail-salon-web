import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import { FaGoogle } from 'react-icons/fa'; // Import icon Google

const Login = ({ setIsAuthenticated, setUsername }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            phoneNumber,
            password,
        };

        try {
            const response = await fetch('http://localhost:5118/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const loginData = await response.json();

                // Lưu accessToken và refreshToken vào localStorage
                localStorage.setItem('token', loginData.accessToken);
                localStorage.setItem('refreshToken', loginData.refreshToken);

                // Gọi hàm để lấy thông tin người dùng
                await fetchUserInfo();
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    const fetchUserInfo = async () => {
        const token = localStorage.getItem('token');

        try {
            const userInfoResponse = await fetch('http://localhost:5118/api/Auth/userinfo', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (userInfoResponse.ok) {
                const userInfo = await userInfoResponse.json();
                localStorage.setItem('username', userInfo.userName);
                setUsername(userInfo.userName); // Cập nhật state với username
                setIsAuthenticated(true);
                navigate('/'); // Chuyển hướng sau khi đăng nhập thành công
            } else if (userInfoResponse.status === 401) {
                // Nếu nhận được lỗi 401, token có thể đã hết hạn
                await handleRefreshToken();
                // Sau khi làm mới token, thử lại yêu cầu lấy thông tin người dùng
                await fetchUserInfo();
            } else {
                alert('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const handleRefreshToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            alert('Session expired. Please log in again.');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:5118/api/Auth/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.accessToken); // Cập nhật accessToken mới
                if (data.refreshToken) {
                    localStorage.setItem('refreshToken', data.refreshToken); // Cập nhật refreshToken nếu có
                }
            } else {
                alert('Failed to refresh token. Please log in again.');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            alert('An error occurred. Please log in again.');
            navigate('/login');
        }
    };

    const handleGoogleLogin = () => {
        // Thêm logic đăng nhập bằng Google
        alert('Google login functionality here');
    };

    const handleRegister = () => {
        navigate('/register'); // Chuyển hướng tới trang đăng ký
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="separator">or</div>
                <button className="google-button" onClick={handleGoogleLogin}>
                    <FaGoogle className="google-icon" /> Sign in with Google
                </button>
                <div className="login-register-container">
                    <p>Don't have an account?</p>
                    <button className="register-button" onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
