import React from 'react';
import { useLocation } from 'react-router-dom';
import './css/ThankYouPage.css';

const ThankYouPage = () => {
    const location = useLocation();
    const { selectedServices, totalPayment, selectedTechnician, selectedDate } = location.state || {};

    return (
        <div className="thank-you-container">
            <h1>Thank You for Your Booking!</h1>
            <p>Your appointment has been successfully booked.</p>

            <div className="booking-details">
                <h2>Booking Details:</h2>
                <p><strong>Services:</strong> {selectedServices.map(service => service.name).join(', ')}</p>
                <p><strong>Technician:</strong> {selectedTechnician.name}</p>
                <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
                <p><strong>Total Payment:</strong> ${totalPayment.toFixed(2)}</p>
            </div>

            <button onClick={() => window.location.href = '/'}>Back to Home</button>
        </div>
    );
};

export default ThankYouPage;
