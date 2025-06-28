// components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-primary-dark-blue-gray p-6 rounded-lg shadow-xl max-w-md w-full text-secondary-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary-gold">{title}</h2>
          <button
            onClick={onClose}
            className="text-secondary-white hover:text-primary-gold text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-secondary-light-blue hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
          >
            Close
          </button>
          {/* You can add more action buttons here, e.g., a confirm button */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
