'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import '../styles/share/modalGalleryProduct.scss';

const ModalGallery = ({ isOpen, onClose, images, initialIndex, title }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-gallery-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-gallery"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <button className="modal-gallery__close" onClick={onClose}>×</button>
            
            <div className="modal-gallery__main">
              <button className="nav prev" onClick={prevImage}>
                <Image src="/icons/left-pointer.png" alt="Предыдущая фотография" width={50} height={50} />
              </button>
              <div className="image-container">
                <Image 
                  src={images[currentIndex]} 
                  alt={`${title} - фото ${currentIndex + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <button className="nav next" onClick={nextImage}>
                <Image src="/icons/right-pointer.png" alt="Предыдущая фотография" width={50} height={50} />
              </button>
            </div>

            <div className="modal-gallery__footer">
              <div className="counter">
                {currentIndex + 1} / {images.length}
              </div>
              <div className="thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={idx === currentIndex ? 'active' : ''}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    <Image src={img} alt="" width={60} height={60} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalGallery;