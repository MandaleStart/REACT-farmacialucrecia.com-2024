import Logo from "../src/Navbar/Logo/Logo"
function ErrorPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="container text-center alert alert-danger mt-5 mb-5">
      <h1 className="alert-heading mt-5">404 - Página no encontrada</h1>
      <Logo className="mt-5"></Logo>
      <p className="mt-5">Lo sentimos, la página que estás buscando no existe.</p>
      <button className="btn btn-danger mt-5 mb-5" onClick={handleGoHome}>Volver al inicio</button>
    </div>
  );
}

export default ErrorPage;
