import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Realizar la solicitud de inicio de sesión a la API
    try {
      const response = await fetch('http://127.0.0.1:3000/usuarios/');
      const usuarios = await response.json();

      const user = usuarios.find((usuario) => usuario.username === username && usuario.pass === password);

      if (user) {
        localStorage.setItem("user", username);
        window.location.href = "/";
      } else {
        // Usuario no válido, mostrar mensaje de error o realizar otra acción
        console.error('Usuario no válido');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de inicio de sesión:', error);
    }
  };

  return (
    <div className="container col-4 bg-white mt-5 pb-5">
      <h2 className="text-center">Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
