import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CustomCarousel.css';

const images = [
    '/images/image1.png',
    '/images/image2.png',
    '/images/image3.png'
];

const CustomCarousel = () => {

    const navigate = useNavigate(); 
    const handleBookingClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); 
        } else {
            navigate('/services'); 
        }
    };

    return (
        <div className="custom-carousel-container">
            <Carousel indicators={true} controls={true} interval={3000} pause={false}>
                {images.map((src, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100 custom-carousel-img"
                            src={src}
                            alt={`Slide ${index + 1}`}
                        />
                        <div className="carousel-caption text-center">
                            <h2 className="caption-small">W E L C O M E</h2>                       
                            <h1 className="caption-medium">T O
                                <span className="spaced"> </span> S A L O N </h1>
                            <h1 className="caption-large">M I C K E Y</h1>
                            <h3 className="caption-medium">N A I L S<span className="spaced"> </span> &<span className="spaced"> </span> S P A</h3>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="fixed-buttons-container">
                <a href="tel:+1234567890" className="custom-button">
                    <i className="fas fa-phone-alt"></i> CALL US
                </a>
                <button onClick={handleBookingClick} className="custom-button">
                    <i className="fas fa-calendar-alt"></i> BOOK NOW
                </button>
            </div>
        </div>
    );
};

export default CustomCarousel;
