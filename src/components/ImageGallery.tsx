import React from "react";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="animate-fade-in overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative bg-white p-2 rounded-lg border border-golden/20">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;