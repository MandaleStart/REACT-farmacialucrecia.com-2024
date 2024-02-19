import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { db } from '../../firebase';


const PedidoDetalle = () => {
    const location = useLocation();
    const pedidoId = location.pathname.split('/').pop();

    const [pedido, setPedido] = useState(null);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const loadOrder = async () => {
          try {
            const pedidoRef = db.collection('ordenes').where('id', '==', Number(pedidoId));
            const querySnapshot = await pedidoRef.get();
        
            if (!querySnapshot.empty) {
              const data = querySnapshot.docs[0].data();
              setPedido(data);
            } else {
              console.log('El pedido no existe');
            }
          } catch (error) {
            console.error('Error al obtener el pedido:', error);
          }
        };
        
        loadOrder();
      }, [pedidoId]);
    
    

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

    const getNombreProducto = (productoId) => {
        const productId = Number(productoId.replace(/\(.*\)/g, ''));
        const producto = productos.find((producto) => producto.id === productId);
        return producto ? producto.name : 'Nombre no disponible';
      };
      
      const getCantidadProducto = (productoId) => {
        const startIndex = productoId.indexOf('(') + 1;
        const endIndex = productoId.indexOf(')'); 
        const cantidad = Number(productoId.substring(startIndex, endIndex));
        return cantidad;
      };

      const getIdProducto = (productoId) => {
        const startIndex = productoId.indexOf('('); 
        const productId = Number(productoId.substring(0, startIndex));
        return productId;
      };
      
    return (
        <div>
            <h2>Detalles del Pedido N°{pedidoId}</h2>
            {pedido ? (
                <div className='row '>
                    <table className="table table-striped  col box">
                        <tbody>
                            <tr>
                                <th>ID:</th>
                                <td>{pedido.id}</td>
                            </tr>
                            <tr>
                                <th>Usuario:</th>
                                <td>{pedido.usuario}</td>
                            </tr>
                            <tr>
                                <th>Direccion:</th>
                                <td>{pedido.direccion}</td>
                            </tr>
                            <tr>
                                <th>Localidad:</th>
                                <td>{pedido.localidad}</td>
                            </tr>
                            <tr>
                                <th>Fecha de Creación:</th>
                                <td>{pedido.fecha_creacion}</td>
                            </tr>
                            <tr>
                                <th>Fecha de Entrega:</th>
                                <td>{pedido.fecha_entrega}</td>
                            </tr>
                            <tr>
                                <th>Estado:</th>
                                <td>{pedido.status}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='col-8 box'>
                        <h3>Productos Adquiridos:</h3>
                        {pedido.productos.length === 0 ? (
                            <p>No hay productos registrados.</p>
                        ) : (
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th className='col-2'>ID</th>
                                        <th className='col-6'>Nombre</th>
                                        <th className='col-2'>Cantidad:</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {pedido.productos.map((productoId) => (
                                        <tr key={productoId}>
                                            <td><Link to={'/productos/' + getIdProducto(productoId)}>{getIdProducto(productoId)}</Link></td>
                                            <td><Link to={'/productos/' + getIdProducto(productoId)}>{getNombreProducto(productoId)}</Link></td>
                                            <td><Link to={'/productos/' + getIdProducto(productoId)}>{getCantidadProducto(productoId)}</Link></td>
                                        </tr>
                                        
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            ) : (
                <p>Cargando el pedido...</p>
            )}
        </div>
    );
};
export default PedidoDetalle;