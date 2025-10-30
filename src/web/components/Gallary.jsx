import React from 'react';

// Reusable Image Card Component
const ImageCard = ({ image, onClick }) => {
    return (
        <div
            className="relative overflow-hidden rounded-xl group shadow-lg cursor-pointer"
            onClick={onClick}
        >
            <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm p-4 font-semibold">{image.alt}</p>
            </div>
        </div>
    );
};

// Reusable Image Gallery Component
const ImageGallery = ({ images }) => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className="p-4 sm:p-8 bg-gray-50 rounded-xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <ImageCard key={index} image={image} onClick={() => openModal(image)} />
                ))}
            </div>

            {/* Modal */}
            {modalOpen && selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white rounded-lg overflow-hidden max-w-4xl max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded-full z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-[80vh] object-contain"
                        />
                        <div className="p-4">
                            <p className="text-lg font-semibold text-gray-800">{selectedImage.alt}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;