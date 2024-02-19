import { Link } from 'react-router-dom';
const Main = () => {
  return (
    <main className="container">
      <div className="row justify-content-center mt-5 mb-5">
        <div className="col-md-4">
          <Link to="/productos" className="card">
            <img src="https://i.ibb.co/JkRN1GM/productos.webp" alt="productos" />
            <div className="card-body">
              <h5 className="card-title">Productos</h5>
              <p className="card-text">Aquí puedes administrar los productos.</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/usuarios" className="card">
            <img src="https://i.ibb.co/T2FCG94/usuarios.png" alt="usuarios" />
            <div className="card-body">
              <h5 className="card-title">Usuarios</h5>
              <p className="card-text">Aquí puedes administrar los usuarios.</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/pedidos" className="card">
            <img src="https://i.ibb.co/6rpv7zJ/pedidos.png" alt="pedidos" />
            <div className="card-body">
              <h5 className="card-title">Pedidos</h5>
              <p className="card-text">Aquí puedes administrar los pedidos.</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Main;
