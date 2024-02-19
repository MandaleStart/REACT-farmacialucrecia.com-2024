import { Link } from 'react-router-dom';
import './logo.css'
const Logo = () => {
    return (
      <Link to="/" className="logo">
        <div className='admin-logo d-inline'>Admin.</div> 
        Farmacia
        <img src="https://i.ibb.co/MkP0dd0/logo.png" alt="logo" className="img-logo" />
        LUCRECIA
      </Link>
    );
  };
  
  export default Logo;