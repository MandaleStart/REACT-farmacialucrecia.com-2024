import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';


const DelProductForm = ({ show, handleClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica eliminación
    // 
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className='bg-danger'>
        <Modal.Title >Eliminar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}><label >ID:</label>
        <input type="text" id="findDeleteId"/>
        <button className='btn'><FaSearch></FaSearch> Buscar Producto </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DelProductForm;
