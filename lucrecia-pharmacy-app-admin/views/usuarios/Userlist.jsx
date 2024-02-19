import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { FaTrash } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa/index.esm';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [orderColumn, setOrderColumn] = useState('');
  const [orderAscending, setOrderAscending] = useState(true);
 
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const snapshot = await db.collection('usuarios').get();
            const listaUsuarios = snapshot.docs.map((doc) => doc.data());
        setUsers(listaUsuarios);
        setLoadingUsers(false);
        
      } catch (error) {
        console.log(error);
      }
    }

    loadUsers();
  }, []);

  if (loadingUsers) {
    return <div>Cargando usuarios...</div>;
  }

  const ViewUser = (userId) => {
    console.log(`Usuario seleccionado: ${userId}`);
    // Realiza las acciones cuando se hace clic en un usuario
    // sin desarrollar
  };

  const SortColumn = (column) => {
    if (column === orderColumn) {
      setOrderAscending(!orderAscending);
    } else {
      setOrderColumn(column);
      setOrderAscending(true);
    }
  };

  const orderUsers = (a, b) => {
    const columnA = a[orderColumn];
    const columnB = b[orderColumn];

    if (columnA < columnB) {
      return orderAscending ? -1 : 1;
    }
    if (columnA > columnB) {
      return orderAscending ? 1 : -1;
    }
    return 0;
  };

  const formattedDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleString();
  };

  const sortedUsers = users.slice().sort(orderUsers);

  return (
    <div className="col col-order-2 table-responsive">
      <table className="table table-striped">
        <thead className='table-dark'>
          <tr>
            <th onClick={() => SortColumn('id')}>
              ID
            </th>
            <th onClick={() => SortColumn('rol')}>
              ROL
            </th>
            <th onClick={() => SortColumn('username')} className={orderColumn === 'username' ? 'active' : ''} >
              Usuario
            </th>
            <th onClick={() => SortColumn('firstName')} className={orderColumn === 'firstName' ? 'active' : ''}>
              Nombres
            </th>
            <th onClick={() => SortColumn('lastName')} className={orderColumn === 'lastName' ? 'active' : ''}>
              Apellidos
            </th>
            <th onClick={() => SortColumn('address')} className={orderColumn === 'address' ? 'active' : ''}>
              Dirección
            </th>
            <th onClick={() => SortColumn('birthDate')} className={orderColumn === 'birthDate' ? 'active' : ''}>
              Fecha de Nacimiento
            </th>
            <th onClick={() => SortColumn('creationDate')} className={orderColumn === 'creationDate' ? 'active' : ''}>
              Fecha de Creación
            </th>
            <th onClick={() => SortColumn('telefono')} className={orderColumn === 'telefono' ? 'active' : ''}>
              Telefono
            </th>
            <th>
              ACCION
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} onClick={() => ViewUser(user.id)}>
              <td>{user.id}</td>
              <td>{user.rol}</td>
              <td>{user.username}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.address}</td>
              <td>{formattedDate(user.birthDate)}</td>
              <td>{formattedDate(user.createdDate)}</td>
              <td>{user.tel}</td>
              <td><button className='btn btn-primary'><FaSearch/></button> <button className='btn btn-danger'><FaTrash /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
