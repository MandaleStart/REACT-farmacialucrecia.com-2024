import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import ErrorPage from '../views/ErrorPage';
import Userlist from '../views/usuarios/Userlist';
import Productlist from '../views/productos/ProductList';
import ProductDetalle from '../views/productos/ProductDetalle';
import Pedidos from '../views/Pedidos/Pedidos';
import PedidoDetalle from '../views/Pedidos/PedidoDetalle';
import Login from '../views/Login';
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/usuarios" element={<Userlist />} />
        <Route path="/productos" element={<Productlist />} />
        <Route path="/productos/:id" element={<ProductDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/pedidos/:id" element={<PedidoDetalle />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes> 
      <Footer />
    </BrowserRouter>
  );
};

export default App;
