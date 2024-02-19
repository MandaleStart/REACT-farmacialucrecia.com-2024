import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa/index.esm';
import { db } from '../../firebase'; 

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showDelivered, setShowDelivered] = useState(true);
  const [showCancelled, setShowCancelled] = useState(true);
  const [showPending, setShowPending] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
          const snapshot = await db.collection('ordenes').get();
          const listaOrdenes = snapshot.docs.map((doc) => doc.data());

        setOrders(listaOrdenes);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    loadOrders();
  }, []);

  const deleteOrder = async (id) => {
    console.log(id)
  };


  const getOrderStatusClass = (status) => {
    if (status === 'entregado') {
      return 'text-success';
    } else if (status === 'cancelado') {
      return 'text-danger';
    } else {
      return 'text-warning';
    }
  };

  const toggleShowDelivered = () => {
    setShowDelivered(!showDelivered);
  };

  const toggleShowCancelled = () => {
    setShowCancelled(!showCancelled);
  };

  const toggleShowPending = () => {
    setShowPending(!showPending);
  };

  const filteredOrders = orders.filter(order => {
    if (order.status === 'entregado' && !showDelivered) {
      return false;
    }
    if (order.status === 'cancelado' && !showCancelled) {
      return false;
    }
    if (order.status !== 'entregado' && order.status !== 'cancelado' && !showPending) {
      return false;
    }
    return true;
  });

  return (
    <div className='bg-white'>
      <div className="d-flex justify-content-between pt-2">
        <h2>Lista de Pedidos</h2>
        <div>
          <button className='btn btn-success' onClick={toggleShowDelivered}>
            {showDelivered ? 'Ocultar Entregados' : 'Mostrar Entregados'}
          </button>
          <button className='btn btn-danger' onClick={toggleShowCancelled}>
            {showCancelled ? 'Ocultar Cancelados' : 'Mostrar Cancelados'}
          </button>
          <button className='btn btn-warning' onClick={toggleShowPending}>
            {showPending ? 'Ocultar Pendientes' : 'Mostrar Pendientes'}
          </button>
        </div>
      </div>
      {filteredOrders.length === 0 ? (
        <p>No hay pedidos para mostrar.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Fecha de Creación</th>
              <th>Fecha de Entrega</th>
              <th>Status</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.usuario}</td>
                <td>{order.fecha_creacion}</td>
                <td>{order.fecha_entrega ? order.fecha_entrega : '-'}</td>
                <td className={`text-capitalize ${getOrderStatusClass(order.status)}`}>{order.status}</td>
                <td>
                  <button className='btn btn-primary'>
                    <Link to={`/pedidos/${order.id}`} className='text-white'>
                      <FaSearch></FaSearch>Ver Pedido
                    </Link>
                  </button>
                  <button className='btn btn-danger' onClick={() => deleteOrder(order.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;