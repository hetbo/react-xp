import { createPortal } from 'react-dom';
import { useEffect } from 'react';

// Get a reference to our portal root in the DOM
const modalRoot = document.getElementById('modal-root');

function Modal({ children, onClose }) {
    // Use an effect to add a class to the body to prevent scrolling when the modal is open
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    // Use createPortal to render the modal JSX into the modalRoot element
    return createPortal(
        // The dark overlay
        <div
            onClick={onClose} // Close the modal when clicking the overlay
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
        >
            {/* The modal content box */}
            <div
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
                className="bg-gray-800 text-white rounded-lg shadow-xl p-6 w-full max-w-md"
            >
                {children}
            </div>
        </div>,
        modalRoot // The DOM element to render into
    );
}

export default Modal;