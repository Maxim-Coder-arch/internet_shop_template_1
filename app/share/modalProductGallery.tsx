'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import '../styles/share/modalGalleryProduct.scss';

interface IModalGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: (string | undefined)[];
  initialIndex: number;
  title: string;
}

const ModalGallery = ({ 
  isOpen, 
  onClose, 
  images, 
  initialIndex, 
  title
}: IModalGalleryProps) => {

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, prevImage, nextImage, onClose]);

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
                <Image src="/icons/left-pointer.png" alt="Предыдущая" width={50} height={50} />
              </button>
              <div className="image-container">
                <Image 
                  src={images[currentIndex] || ""} 
                  alt={`${title} - фото ${currentIndex + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <button className="nav next" onClick={nextImage}>
                <Image src="/icons/right-pointer.png" alt="Следующая" width={50} height={50} />
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
                    <Image src={img || ""} alt="" width={60} height={60} />
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