import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css'; // Đảm bảo bạn đã thêm CSS này để hỗ trợ hiển thị thumbnails
import './css/Gallery.css'; // CSS tuỳ chỉnh của bạn

const images = [
    { src: '/images/image6.png' },
    { src: '/images/image7.png' },
    { src: '/images/image8.png' },
    { src: '/images/image9.png' },
    { src: '/images/image10.png' },
    { src: '/images/image11.png' },
    { src: '/images/image12.png' },
    { src: '/images/image13.png' },
    { src: '/images/image14.png' },
    { src: '/images/image15.png' },
    { src: '/images/image16.png' },
];

const Gallery = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <div className="gallery-section">
            <div className="gallery-grid">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt=""
                        onClick={() => {
                            setPhotoIndex(index);
                            setIsOpen(true);
                        }}
                        className="gallery-item"
                    />
                ))}
            </div>

            {isOpen && (
                <Lightbox
                    slides={images}
                    open={isOpen}
                    index={photoIndex}
                    close={() => setIsOpen(false)}
                    on={{ slideChange: setPhotoIndex }}
                    plugins={[Zoom, Thumbnails]}
                    thumbnails={{
                        width: 100, // Điều chỉnh kích thước thumbnails phù hợp
                        height: 100, // Có thể tùy chỉnh chiều cao ở đây
                        borderRadius: 5, // Bo góc thumbnails nếu cần
                        objectFit: 'cover',
                    }}
                />
            )}
        </div>


    );
};

export default Gallery;
