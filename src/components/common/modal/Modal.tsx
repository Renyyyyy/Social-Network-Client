import React from "react";
import "./Modal.css";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  actions: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose, actions }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">{actions}</div>
      </div>
    </div>
  );
};

export default Modal;
