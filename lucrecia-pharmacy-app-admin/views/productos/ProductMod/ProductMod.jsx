// import { useState } from 'react';
import {FaTrash, FaPen } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const ProductMod = ({ prodID }) => {
  console.log(prodID) 
  return (
    <div className="row">
      <button className="col btn btn-primary" type="button" >
        <FaPen />
      </button>
      <button className="col btn btn-danger" type="button" >
        <FaTrash />
      </button>
    </div>
  );
};

export default ProductMod;