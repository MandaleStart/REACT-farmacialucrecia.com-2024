import Logo from './Logo/Logo';
import Usuarios from './Usuarios/Usuarios';
import Productos from './Productos/Productos';
import Pedidos from './Pedidos/Pedidos';

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Logo />
        <Usuarios />
        <Productos />
        <Pedidos />
      </div>
    </nav>
  );
};

export default Navbar;