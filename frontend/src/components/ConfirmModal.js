import React from 'react';

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div style={{ backgroundColor: '#00000088', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        maxWidth: '300px',
        margin: '20% auto',
        borderRadius: '10px'
      }}>
        <p>{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
