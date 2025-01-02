import React, { useEffect, useState } from 'react';
import api from './axiosInstance'; // Sử dụng axiosInstance thay vì axios
import './css/BookingHistory.css';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const userName = localStorage.getItem('username');
            const token = localStorage.getItem('token');

            if (!userName || !token) {
                alert("Vui lòng đăng nhập để xem lịch sử đặt lịch.");
                window.location.href = '/login'; // Điều hướng đến trang đăng nhập
                return;
            }

            try {
                const response = await api.get(`/Bookings/user/${userName}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching booking history:", error);
                alert("Unable to load booking history.");
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="booking-history">
            <h2 className="booking-history-title">Booking History</h2>
            <ul className="booking-list">
                {bookings.map((booking, index) => (
                    <li key={index} className="booking-card">
                        <p><strong>Technician:</strong> {booking.technicianName}</p>
                        <p><strong>Service:</strong> {booking.serviceName}</p>
                        <p><strong>Time:</strong> {new Date(booking.startTime).toLocaleString()}</p>
                        <p><strong>Total price:</strong> {booking.duration} phút</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingHistory;
