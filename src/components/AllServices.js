import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/AllServices.css';

const AllServices = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Lấy danh sách dịch vụ từ API
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:5118/api/Services');
                const data = await response.json();

                // Tách các dịch vụ theo category
                const categorizedServices = data.reduce((acc, service) => {
                    const { category } = service;
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(service);
                    return acc;
                }, {});

                setCategories(Object.keys(categorizedServices));
                setServices(categorizedServices);

                // Chọn category đầu tiên làm mặc định
                setSelectedCategory(Object.keys(categorizedServices)[0]);

            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    const handleServiceChange = (service, checked) => {
        if (checked) {
            setSelectedServices([...selectedServices, service]);
        } else {
            setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
        }
    };

    const isServiceSelected = (service) => {
        return selectedServices.some((s) => s.id === service.id);
    };

    const handleFinished = () => {
        if (selectedServices.length > 0) {
            const totalPayment = selectedServices.reduce((total, service) => total + parseFloat(service.price), 0);
            navigate('/services', { state: { selectedServices, totalPayment } });
        }
    };

    const totalPayment = selectedServices.reduce((total, service) => total + parseFloat(service.price), 0);

    return (
        <div className="all-services-page">
            <div className="services-container">
                <div className="services-sidebar">
                    <h2 className="services-heading">SERVICES</h2>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-button ${category === selectedCategory ? "active" : ""}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="services-list">
                    <h2>{selectedCategory}</h2>
                    <ul>
                        {services[selectedCategory]?.map((service, index) => (
                            <li key={index} className="service-item">
                                <div className="service-details">
                                    <div className="service-header">
                                        <span className="service-name">{service.name}</span>
                                        <span className="service-price">${service.price}</span>
                                    </div>
                                    <div className="service-info">
                                        <span>{service.duration || ""}</span>
                                        <span>Fixed</span>
                                    </div>
                                    <p className="service-description">{service.description}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="service-checkbox"
                                    checked={isServiceSelected(service)}
                                    onChange={(e) => handleServiceChange(service, e.target.checked)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="fixed-footer">
                <div className="footer-selected">
                    <span className="footer-link">Selected {selectedServices.length} Services</span>
                </div>
                <div className="footer-total-payment">
                    <span>Total Payment: ${totalPayment.toFixed(2)}</span>
                </div>
                <button
                    className={`footer-button ${selectedServices.length === 0 ? "disabled" : "enabled"}`}
                    disabled={selectedServices.length === 0}
                    onClick={handleFinished}
                >
                    Finished
                </button>
            </div>
        </div>
    );
};

export default AllServices;
