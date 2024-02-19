import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import ProductMod from "./ProductMod/ProductMod";


function ProductList() {
  const [productos, setProductos] = useState([]);
  const [ordenColumna, setOrdenColumna] = useState('');
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const snapshot = await db.collection('products').get();
        const listaProductos = snapshot.docs.map((doc) => doc.data());
        setProductos(listaProductos);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    loadProducts();
  }, []);
  const OrdenarColumna = (columna) => {
    if (columna === ordenColumna) {
      setOrdenAscendente(!ordenAscendente);
    } else {
      setOrdenColumna(columna);
      setOrdenAscendente(true);
    }
  };

  const SubcatNormalized = (categoria) => {
    const { subcat } = categoria;

    if (!Array.isArray(subcat)) {
      return '';
    }

    return subcat
      .map((subcategoria) => {
        const normalizedSubcat = subcategoria.replace(/-/g, ' ').charAt(0).toUpperCase() + subcategoria.slice(1);
        return normalizedSubcat;
      })
      .join(', ');
  };

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  const ordenarProductos = (a, b) => {
    const columnaA = ordenColumna === 'id' || ordenColumna === 'cost' ? parseInt(a[ordenColumna]) : a[ordenColumna];
    const columnaB = ordenColumna === 'id' || ordenColumna === 'cost' ? parseInt(b[ordenColumna]) : b[ordenColumna];

    if (columnaA < columnaB) {
      return ordenAscendente ? -1 : 1;
    }
    if (columnaA > columnaB) {
      return ordenAscendente ? 1 : -1;
    }
    return 0;
  };

  const productosOrdenados = productos.slice().sort(ordenarProductos);

  return (
    <div className="table-responsive d-flex align-items-center justify-content-center">
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th onClick={() => OrdenarColumna('id')}>
              ID
            </th>
            <th onClick={() => OrdenarColumna('name')} className={ordenColumna === 'name' ? 'active' : ''}>
              Nombre
            </th>
            <th onClick={() => OrdenarColumna('brand')} className={ordenColumna === 'brand' ? 'active' : ''} >
              Marca
            </th>
            <th onClick={() => OrdenarColumna('cost')} className={ordenColumna === 'cost' ? 'active' : ''}>
              Precio
            </th>
            <th onClick={() => OrdenarColumna('categoria')} className={ordenColumna === 'categoria' ? 'active' : ''}>
              Categoría
            </th>
            <th>Sub-Categoría</th>
            <th onClick={() => OrdenarColumna('stock')} className={ordenColumna === 'stock' ? 'active' : ''}>
              Stock
            </th>
            <th>URL IMAGEN</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {productosOrdenados.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.name}</td>
              <td>{producto.brand}</td>
              <td>$ {producto.cost}</td>
              <td>{producto.categoria.id}</td>
              <td>{SubcatNormalized(producto.categoria)}</td>
              <td>{producto.stock}</td>
              <td>
                {isValidUrl(producto.image) ? (
                  <Link to={producto.image} target="_blank">
                    FOTO
                  </Link>
                ) : (
                  "Sin Foto"
                )}
              </td>
              <td>
                <ProductMod prodID={producto.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;