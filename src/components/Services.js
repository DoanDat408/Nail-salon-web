import React, { useState, useEffect } from 'react';
import api from './axiosInstance';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronRight, FaUser } from 'react-icons/fa';
import { GiNails } from 'react-icons/gi';
import './css/Services.css';



const Services = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedServices = [], totalPayment = 0 } = location.state || {};

    const [showTechnician, setShowTechnician] = useState(false);
    const [selectedTechnician, setSelectedTechnician] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dates, setDates] = useState([]);
    const [showDates, setShowDates] = useState(false);
    const [error, setError] = useState({ service: false, technician: false, date: false, time: false });
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);

    const technicians = [
        { id: 1, name: "Wendy", image: '/images/people.png', availability: [0, 1, 2, 3, 4, 5, 6] },
        { id: 2, name: "Trung", image: '/images/people.png', availability: [0, 1, 2, 3, 4, 5] },
        { id: 3, name: "Kelly", image: '/images/people.png', availability: [0, 1, 2, 3, 4, 5] },
        { id: 4, name: "Ken", image: '/images/people.png', availability: [0, 1, 2, 3, 4, 5] },
        { id: 5, name: "Tina", image: '/images/people.png', availability: [0, 1, 2, 3, 4, 5, 6] }
    ];

    const formatDate = (date) => {
        const options = { weekday: 'short', day: 'numeric', month: 'numeric' };
        return date.toLocaleDateString('en-CA', options);
    };

    const getDayStatus = (date) => {
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
            return { label: "Today", className: "today-status" };
        } else if (date.getDay() === 0 || date.getDay() === 6) {
            return { label: "Weekend", className: "weekend-status" };
        }
        return { label: "Weekday", className: "weekday-status" };
    };

    useEffect(() => {
        const generateDates = () => {
            const currentDate = new Date();
            const newDates = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() + i);
                newDates.push(date);
            }
            setDates(newDates);
        };

        generateDates();
    }, []);

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            if (selectedDate && selectedTechnician) {
                const token = localStorage.getItem('token');

                try {
                    const response = await api.get(`/Bookings/technicians/${selectedTechnician.id}/availability`, {
                        params: { date: selectedDate.toISOString().slice(0, 10) },
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log(response.data); // Kiểm tra dữ liệu từ API
                    if (response.data) {
                        // Kết hợp ngày và thời gian thành đối tượng Date hợp lệ
                        const slots = response.data.map(slot => {
                            const [hours, minutes] = slot.time.split(':');
                            const dateWithTime = new Date(selectedDate);
                            dateWithTime.setHours(parseInt(hours));
                            dateWithTime.setMinutes(parseInt(minutes));
                            dateWithTime.setSeconds(0);
                            dateWithTime.setMilliseconds(0);
                            return dateWithTime;
                        });
                        setTimeSlots(slots);
                    }
                } catch (error) {
                    console.error('Error fetching available slots:', error);
                }
            }
        };
        fetchAvailableSlots();
    }, [selectedDate, selectedTechnician]);


    const handleViewAllServices = () => {
        navigate('/all-services', { state: { selectedServices } });
    };

    const toggleTechnicianDropdown = () => {
        setShowTechnician(!showTechnician);
    };

    const handleTechnicianSelect = (technician) => {
        setSelectedTechnician(technician);
        setShowTechnician(false);
    };

    const toggleDateDropdown = () => {
        setShowDates(!showDates);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setShowDates(false);
        setSelectedTime(null); // Reset the selected time when a new date is picked
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(new Date(time));
    };

    const isTimeSlotAvailable = (time) => {
        const now = new Date();
        return new Date(time) > now; // Kiểm tra nếu thời gian đã qua chưa
    };


    const handleConfirmBooking = async () => {
        const errors = {
            service: selectedServices.length === 0,
            technician: !selectedTechnician,
            date: !selectedDate,
            time: !selectedTime,
        };

        setError(errors);

        if (!errors.service && !errors.technician && !errors.date && !errors.time) {
            const customerName = localStorage.getItem('username') || 'Anonymous'; // Lấy tên người dùng từ localStorage hoặc mặc định 'Anonymous'
            const bookingData = {
                technicianId: selectedTechnician.id,
                serviceIds: selectedServices.map(service => service.id), // Kiểm tra nếu serviceId không undefined
                startTime: selectedDate.toISOString().slice(0, 10) + 'T' + selectedTime.toLocaleTimeString([], { hour12: false }).slice(0, 5) + ':00',
                duration: 20, // Thời gian mặc định hoặc lấy từ dịch vụ
                customerName: customerName
            };

            console.log('Booking Data:', bookingData); // Log dữ liệu trước khi gửi đi

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('Vui lòng đăng nhập để tiếp tục.');
                    navigate('/login');
                    return;
                }

                const response = await api.post('/Bookings', bookingData, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Gửi token đúng định dạng
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    console.log('Booking Success:', response.data);
                    navigate('/thank-you', {
                        state: {
                            selectedServices,
                            totalPayment: selectedServices.reduce((total, service) => total + parseFloat(service.price), 0),
                            selectedTechnician,
                            selectedDate,
                            selectedTime
                        }
                    });
                } else {
                    console.error('Booking Error:', response.data);
                    alert(response.data.message || 'Đã xảy ra lỗi khi đặt lịch.');
                }
            } catch (error) {
                console.error('Error creating booking:', error.response ? error.response.data : error.message);
                alert('Đã xảy ra lỗi khi đặt lịch.');
            }

        } else {
            alert('Vui lòng hoàn tất tất cả các trường bắt buộc.');
        }
    };




    return (
        <div className="booking-container">
            <h1 className="booking-header">Booking Appointment</h1>

            {/* Step 1: Select Salon */}
            <div className="step-container">
                <div className="step-title">
                    <div className="step-number">1</div>
                    <h2>Salon</h2>
                </div>
                <div className="step-content">
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-pink-500" />
                        <span>292 Stone Rd W Unit 7A, Guelph, ON N1G 3C4, Canada</span>
                    </div>
                </div>
            </div>

            {/* Step 2: Choose Service */}
            <div className={`step-container ${error.service ? 'error-border' : ''}`} onClick={handleViewAllServices}>
                <div className="step-title">
                    <div className="step-number">2</div>
                    <h2>Choose Service</h2>
                </div>
                <div className="step-content">
                    <div className="flex items-center">
                        <GiNails className="mr-2" />
                        {selectedServices.length === 0 ? (
                            <span>View All Services</span>
                        ) : (
                            <span>Selected {selectedServices.length} Services</span>
                        )}
                    </div>
                    <FaChevronRight />
                </div>
            </div>

            {/* Hiển thị các dịch vụ đã chọn */}
            {selectedServices.length > 0 && (
                <div className="selected-services-list">
                    {selectedServices.map((service, index) => (
                        <div key={index} className="selected-service-item">
                            {service.name}
                        </div>
                    ))}
                    <div className="total-payment">
                        Total Payment: ${totalPayment.toFixed(2)}
                    </div>
                </div>
            )}

            {/* Step 3: Choose Date, Time & Stylist */}
            <div className={`step-container ${error.technician ? 'error-border' : ''}`}>
                <div className="step-title">
                    <div className="step-number">3</div>
                    <h2>Choose Date, Time & Stylist</h2>
                </div>

                {/* Technician Selection */}
                <div className="step-content technician-dropdown" onClick={toggleTechnicianDropdown}>
                    <div className="flex items-center">
                        <FaUser className="mr-2" />
                        <span>{selectedTechnician ? selectedTechnician.name : "Nail Technician"}</span>
                        <FaChevronRight className={`ml-auto technician-arrow ${showTechnician ? "rotate-down" : "rotate-right"}`} />
                    </div>
                </div>
                {showTechnician && (
                    <div className="technician-carousel">
                        {technicians.map((tech, index) => (
                            <div
                                key={index}
                                className={`technician-option ${selectedTechnician?.name === tech.name ? "selected" : ""}`}
                                onClick={() => handleTechnicianSelect(tech)}
                            >
                                <img src={tech.image} alt={tech.name} className="technician-image" />
                                <span>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Date Selection */}
                <div className={`step-content date-dropdown ${error.date ? 'error-border' : ''}`} onClick={toggleDateDropdown}>
                    <div className="flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        <span>{selectedDate ? formatDate(selectedDate) : "Select a Date"}</span>
                        <FaChevronRight className={`ml-auto date-arrow ${showDates ? "rotate-down" : "rotate-right"}`} />
                    </div>
                </div>
                {showDates && (
                    <div className="date-list">
                        {dates.map((date, index) => {
                            const { label, className } = getDayStatus(date);
                            return (
                                <div
                                    key={index}
                                    className={`date-item ${selectedDate?.toDateString() === date.toDateString() ? "selected" : ""}`}
                                    onClick={() => handleDateSelect(date)}
                                >
                                    <span>{formatDate(date)}</span>
                                    <span className={className}>{label}</span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Time Selection */}
                {selectedDate && selectedTechnician && (
                    <div className="time-selection">
                        <h3>Select a Time</h3>
                        <div className="time-slots">
                            {timeSlots.map((time, index) => (
                                <div
                                    key={index}
                                    className={`time-slot ${selectedTime?.getTime() === time.getTime() ? "selected" : ""} ${!isTimeSlotAvailable(time) ? "unavailable" : ""}`}
                                    onClick={() => isTimeSlotAvailable(time) && handleTimeSelect(time)}
                                >
                                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Confirm Button */}
            <button className="confirm-button enabled" onClick={handleConfirmBooking}>
                Confirm Booking
            </button>
            <p className="note-text">You can cancel or reschedule without any fee.</p>
        </div>
    );
};

export default Services;
