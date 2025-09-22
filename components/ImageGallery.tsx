import React, { useState } from 'react';

interface ImageGalleryProps {
  images: { src: string; alt: string; }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative">
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200">
        {images.map((image, index) => (
             <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-cover transition-opacity duration-300 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
                loading="lazy"
             />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
          <div role="group" aria-label="Bildergalerie" className="flex justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={`thumb-${index}`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`Zeige Bild ${index + 1} von ${images.length}`}
                aria-current={index === activeIndex ? 'true' : 'false'}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-[var(--color-gold)] ${
                  index === activeIndex ? 'border-[var(--color-gold)] scale-110' : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img src={image.src} alt={`Vorschaubild ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
      </div>
    </div>
  );
};

export default ImageGallery;
