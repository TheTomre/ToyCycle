import React from "react";
import PropTypes from "prop-types";

interface SliderProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Slider({ isOpen, onClose, children }: SliderProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            onClose();
          }
        }}
        aria-label="Close slider"
      />
      <div className="fixed right-0 top-0 bottom-0 w-3/4 sm:w-1/3 bg-white shadow-xl overflow-y-auto">
        <div className="p-4">
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Close"
          >
            Close
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

Slider.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Slider;
