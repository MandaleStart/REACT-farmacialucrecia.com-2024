import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const EditProductForm = ({ show, handleClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica edición
    // 
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className='bg-primary'>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <label >ID:</label>
          <input type="number" id="findEditId" />

          <button className='btn'><FaSearch></FaSearch>Buscar Producto </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductForm;