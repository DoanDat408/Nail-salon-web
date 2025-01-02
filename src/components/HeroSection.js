import React from 'react';

const HeroSection = () => {
    return (
        <div className="relative">
            <img src="https://placehold.co/1600x600" alt="Nail design background" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-8 space-y-4 container mx-auto">
                <h2 className="text-5xl font-bold text-white text-center">Be Different with Our Nail Design</h2>
                <p className="text-lg text-white max-w-lg text-center">
                    Our qualified team provides a full range of nail design services to satisfy even the most demanding clients. With our help, you can easily acquire a new look for your nails to stand out from the crowd.
                </p>
                <div className="flex space-x-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Call Us</button>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700">Book Now</button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
