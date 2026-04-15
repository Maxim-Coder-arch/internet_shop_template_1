'use client';

import { motion, AnimatePresence } from 'framer-motion';
import "../styles/share/modalFullDescriptionProduct.scss";

interface IModalDescriptionProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const ModalDescription = ({ 
  isOpen, 
  onClose, 
  title, 
  description
 }: IModalDescriptionProps) => {
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
          <motion.div
            className="modal-description"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <button className="modal-close" onClick={onClose}>×</button>
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalDescription;