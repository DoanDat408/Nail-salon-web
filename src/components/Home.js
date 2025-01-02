import React from 'react';
import CustomCarousel from './CustomCarousel';
import '../CustomCarousel.css';
import { Element } from 'react-scroll';
import { FaMapMarkerAlt, FaInstagram, FaFacebookF, FaGoogle } from 'react-icons/fa';



const Home = () => {
    return (
        <div className="container mx-auto py-4">
            <CustomCarousel />
            {/* Phần Why Clients Choose Us */}
                <section id="why-clients-choose-us" className="my-12 mx-auto max-w-7xl px-6">
                    <h2 className="text-4xl font-bold mb-4 text-center">Why Clients Choose Us</h2>

                <div className="flex flex-wrap justify-between items-start mt-8">
                    <div className="w-full md:w-1/2 pr-8">
                        <p className="text-lg leading-relaxed mb-6">
                            Our salon is staffed with highly skilled and experienced nail technicians who are passionate about delivering top-notch service. Whether you're looking for a classic manicure, gel nails, or intricate nail art, our technicians have the expertise to bring your vision to life.
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            At Mickey Nails, your health and safety are our top priorities. We adhere to strict cleanliness and sanitation protocols, ensuring that all tools and equipment are thoroughly sterilized between each client. You can relax and enjoy your nail service knowing that you're in a clean and hygienic environment.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Convenience is key, and that's why we offer online booking, allowing you to schedule your appointments with ease and flexibility. Say goodbye to waiting on hold or trying to coordinate your busy schedule - just book online, and we'll take care of the rest.
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
                        <img
                            src="/images/image6.png"
                            alt="Salon"
                            className="rounded-lg shadow-lg object-cover"
                            style={{ width: '500px', height: '500px' }}
                        />
                    </div>
                </div>
                </section>

            {/* Phần Our Services */}
            <section className="my-16 text-center">
                <h2 className="text-4xl font-bold mb-8">Our Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"> {/* Tăng khoảng cách giữa các ô */}
                    <div className="service-item p-8 shadow-lg rounded-lg"> {/* Tăng padding cho thẻ */}
                        <img src="/images/manicure.png" alt="Manicure Service" className="w-40 h-40 object-cover rounded-full mx-auto mb-6" /> {/* Điều chỉnh kích thước hình ảnh và làm tròn các góc */}
                        <h3 className="text-2xl font-bold mb-4">Manicure</h3> {/* Điều chỉnh khoảng cách giữa tiêu đề và nội dung */}
                        <p className="text-gray-600">Manicures are a great way to pamper yourself and keep your nails looking neat and stylish.</p>
                    </div>
                    <div className="service-item p-8 shadow-lg rounded-lg">
                        <img src="/images/artificial nails.png" alt="Artificial Nails Service" className="w-40 h-40 object-cover rounded-full mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Artificial Nails</h3>
                        <p className="text-gray-600">Our experienced staff are masters of their craft, delivering impeccable results every time.</p>
                    </div>
                    <div className="service-item p-8 shadow-lg rounded-lg">
                        <img src="/images/eyelash extensions.png" alt="Eyelash Extensions Service" className="w-40 h-40 object-cover rounded-full mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Eyelash Extensions</h3>
                        <p className="text-gray-600">Eyelash extensions are a popular cosmetic procedure used to enhance your eyelashes!</p>
                    </div>
                    <div className="service-item p-8 shadow-lg rounded-lg">
                        <img src="/images/pedicure.png" alt="Pedicure Service" className="w-40 h-40 object-cover rounded-full mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Pedicure</h3>
                        <p className="text-gray-600">Pedicure is a cosmetic treatment for the feet and toenails, which involves various steps to clean, shape, and care for your nails.</p>
                    </div>
                    <div className="service-item p-8 shadow-lg rounded-lg">
                        <img src="/images/waxing.png" alt="Waxing Service" className="w-40 h-40 object-cover rounded-full mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Waxing</h3>
                        <p className="text-gray-600">Waxing is a convenient and effective hair removal option for those looking for longer-lasting results.</p>
                    </div>
                    <div className="service-item p-8 shadow-lg rounded-lg">
                        <img src="/images/princess care.png" alt="Princess Care Service" className="w-40 h-40 object-cover rounded-full mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Princess Care</h3>
                        <p className="text-gray-600">Our Princess Care services can help children feel pampered and confident while also fostering a sense of self-care.</p>
                    </div>
                </div>
            </section>


            {/* Phần Our Promise */}
            <section className="my-16 mx-auto max-w-7xl px-6">
                <div className="flex flex-wrap justify-between items-start">
                    {/* Hình ảnh bên trái */}
                    <div className="w-full md:w-1/2 mb-8 md:mb-0">
                        <img
                            src="/images/nail.png"
                            alt="Our Promise"
                            className="rounded-lg shadow-lg object-cover w-full h-full"
                            style={{ width: '500px', height: '700px' }}
                        />
                    </div>

            {/* Nội dung bên phải */}
            <div className="w-full md:w-1/2 pl-8">
                <h2 className="text-4xl font-bold mb-4">Our Promise</h2>
                <p className="text-lg leading-relaxed mb-3">
                    When you step into our salon, you’ll be welcomed by a team of expert nail technicians devoted to achieving stunning results. Whether you’re after a timeless manicure or intricate nail art, every service is customized to suit your individual taste, ensuring your nails truly represent your style.
                </p>
                <p className="text-lg leading-relaxed mb-3">
                    Professional Skill: Our technicians bring years of experience and stay up-to-date with the latest trends and techniques in nail care.
                </p>
                <p className="text-lg leading-relaxed mb-3">
                    Cleanliness: We maintain rigorous standards of hygiene and sanitation, providing a clean and safe environment for all our clients.
                </p>
                <p className="text-lg leading-relaxed mb-3">
                    Customer Care: Your satisfaction is our main focus, and we strive to exceed your expectations every time you visit.
                </p>
                <p className="text-lg leading-relaxed">
                    Our ultimate aim is your complete satisfaction. Our warm and attentive staff take the time to understand your personal needs and preferences, customizing each service to your liking. Whether you lean toward a natural finish or something bold and artistic, we’ll collaborate with you to create the perfect outcome.
                </p>
            </div>
        </div>
            </section>

            {/* Phần Gallery */}
            <section className="my-12 mx-auto max-w-7xl px-6">
                <h2 className="text-4xl font-bold mb-4 text-center">Portfolio</h2>
                <p className="text-center mb-8">
                    Explore our complete collection of work, featuring manicures, pedicures, unique nail designs, custom art, and more. Every design showcased here has been carefully crafted by our talented nail technicians.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative group">
                        <img src="/images/image7.png" alt="Beautiful nail design" className="custom-gallery-img" />
                    </div>

                    <div className="relative group">
                        <img src="/images/image8.png" alt="Beautiful nail design" className="custom-gallery-img" />
                    </div>

                    <div className="relative group">
                        <img src="/images/image10.png" alt="Beautiful nail design" className="custom-gallery-img" />
                    </div>

                    <div className="relative group">
                        <img src="/images/image11.png" alt="Beautiful nail design" className="custom-gallery-img" />
                    </div>

                    <div className="relative group">
                        <img src="/images/image12.png" alt="Beautiful nail design" className="custom-gallery-img" />
                    </div>

                    <div className="relative group">
                        <img src="/images/image13.png" alt="Beautiful nail design" className="custom-gallery-img" />
                    </div>

                    <div className="relative group">
                        <img src="/images/image14.png" alt="Beautiful nail design" className="custom-gallery-img" />
                    </div>

                    <div className="relative group">
                        <img src="/images/image15.png" alt="Beautiful nail design" className="custom-gallery-img" />
                    </div>

                    <div className="relative group">
                        <img src="/images/image16.png" alt="Beautiful nail design" className="custom-gallery-img" />
                    </div>
                </div>
            </section>
            {/* Phần Contacts */}
            <section id="contacts" className="my-16 mx-auto max-w-7xl px-6">
                <h2 className="text-4xl font-bold mb-8 text-center">Contacts</h2>
                <div className="flex flex-wrap">
                    {/* Khung bên Hour */}
                    <div className="w-full md:w-2/3 bg-white p-6 rounded-l-lg shadow-lg">
                        <h3 className="text-3xl font-bold mb-4">Hour</h3>
                        <ul>
                            <li className="mb-2"><strong>SUNDAY:</strong>&nbsp;&nbsp;&nbsp;&nbsp; 10:00am - 5:00pm</li>
                            <li className="mb-2"><strong>MONDAY:</strong>&nbsp;&nbsp;&nbsp;&nbsp; 9:30am - 7:00pm</li>
                            <li className="mb-2"><strong>TUESDAY:</strong>&nbsp;&nbsp;&nbsp;&nbsp; 9:30am - 7:00pm</li>
                            <li className="mb-2"><strong>WEDNESDAY:</strong>&nbsp;&nbsp;&nbsp;&nbsp; 9:30am - 7:00pm</li>
                            <li className="mb-2"><strong>THURSDAY:</strong>&nbsp;&nbsp;&nbsp;&nbsp; 9:30am - 7:00pm</li>
                            <li className="mb-2"><strong>FRIDAY:</strong>&nbsp;&nbsp;&nbsp;&nbsp; 9:30am - 7:00pm</li>
                            <li className="mb-2"><strong>SATURDAY:</strong>&nbsp;&nbsp;&nbsp;&nbsp; 9:30am - 6:00pm</li>
                        </ul>
                    </div>

                    {/* Khung bên Address */}
                    <div className="w-full md:w-1/3 bg-blue-800 text-white p-6 rounded-r-lg shadow-lg flex flex-col justify-between">
                        <div>
                            <h3 className="text-3xl font-bold mb-4">Address</h3>
                            <p>292 Stone Rd W Unit 7A,<br />Guelph, ON N1G 3C4, Canada</p>
                            <h4 className="text-2xl font-bold mt-6 mb-2">Phone</h4>
                            <p className="text-lg">+1 519-829-3007</p>
                        </div>
                        <div className="mt-6">
                            <div className="flex space-x-4 mb-4">
                                <a href="https://www.google.com/maps/place/LT+Nails+Guelph/@43.5191762,-80.236093,17z/data=!3m1!4b1!4m6!3m5!1s0x882b851e1a06a1b5:0x8f3b75f7c765d575!8m2!3d43.5191762!4d-80.2335181!16s%2Fg%2F11pd_m9nhh?hl=vi-VN&entry=ttu" target="_blank" rel="noopener noreferrer">
                                    <FaGoogle size={30} />
                                </a>
                                <a href="https://www.instagram.com/ltnailsguelph/" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram size={30} />
                                </a>
                                <a href="https://www.facebook.com/ltnailsguelph/" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF size={30} />
                                </a>
                            </div>
                            <p className="text-center text-lg">We look forward to welcoming you to our salon at any time.</p>
                        </div>
                    </div>
                </div>
            </section>





        </div>
    );
};

export default Home;
