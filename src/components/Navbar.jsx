import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          Rift<span className="gold">Schedule</span>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/login">Iniciar sesión</NavLink>
          <NavLink to="/registro" className="btn btn-gold">Crear cuenta</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar