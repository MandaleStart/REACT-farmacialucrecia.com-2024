
import { Modal } from 'react-bootstrap';
import { db } from '../../../firebase';

const AddProductForm = ({ show, handleClose }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtén los valores del formulario
    const name = event.target.elements.name.value;
    const cost = event.target.elements.cost.value;
    const brand = event.target.elements.brand.value;
    const stock = event.target.elements.stock.value;
    const subcat = event.target.elements['categoria.subcat'].value;
    const categoriaId = event.target.elements['categoria.id'].value;

    const producto = {
      name,
      cost: parseInt(cost),
      brand,
      stock: parseInt(stock),
      categoria: {
        subcat,
        id: categoriaId,
      },
    };

    try {
      const productosRef = db.collection('products');
      await productosRef.add(producto);
      console.log('Producto agregado:', producto);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <div className="col">
              <label htmlFor="stock">Stock:</label>
              <input type="number" className="form-control" id="stock" name="stock" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input type="text" className="form-control" id="name" name="name" />
          </div>
          <div className="form-group row">
            <div className="col">
              <label htmlFor="categoria">Categoria:</label>
              <select className="form-control" id="categoria" name="categoria.id">
                <option value="categoria1">Categoría 1</option>
                <option value="categoria2">Categoría 2</option>
                <option value="categoria3">Categoría 3</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="subcategoria">Subcategoria:</label>
              <input type="text" className="form-control" id="subcategoria" name="categoria.subcat" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="brand">Marca:</label>
            <input type="text" className="form-control" id="brand" name="brand" />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="image">Imagen:</label>
            <input type="text" className="form-control" id="image" name="image" />
          </div>
          <div className="form-group row">
            <div className="col">
              <label htmlFor="cost">Costo:</label>
              <input type="number" className="form-control" id="cost" name="cost" />
            </div>
            <div className="col">
              <label htmlFor="costM">Costo al por mayor:</label>
              <input type="number" className="form-control" id="costM" name="costM" />
            </div>
          </div>
          <button type="submit" className="btn btn-success">Agregar producto</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductForm;
/*
//para borrar , carga de API a Firebase, adaptar a carga de producto individual
import { db } from '../firebase';
import productosData from '../../APi/usuarios.json';
<button className='btn btn-danger' onClick={() => loadProdsMasive()}>Carga Masiva</button>
const loadProdsMasive = async () => {
        const productosRef = db.collection('usuarios');

        try {
          for (const producto of productosData) {
            await productosRef.add(producto);
            console.log('Producto agregado:', producto.id);
          }
        } catch (error) {
          console.error('Error al agregar los productos:', error);
        }
      }; 

const productoPrueba =
{
  "id": 1,
  "name": "prueba",
  "cant": "9999",
  "cant_type": "ml",
  "cost": 999999,
  "image": "test.jpg",
  "brand": "brandtest",
  "stock": 1,
  "categoria": {
    "id": "cattest",
    "subcat": [
      "subcatdeprueba1","subcatdeprueba2"
    ]
  }
}

const loadProdsMasive = async () => {
  const productosRef = db.collection('products');
try { 
await productosRef.add(productoPrueba);
console.log('Producto agregado:', productoPrueba.id);

} catch (error) {
console.error('Error al agregar los productos:', error);
}}*/
