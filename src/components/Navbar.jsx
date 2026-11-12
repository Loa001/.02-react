import { Link, NavLink, useNavigate } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext.js'

function Navbar() {
  const { sesionActiva, cerrarSesion } = usePlayer()
  const navigate = useNavigate()

  function salir() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to={sesionActiva ? '/dashboard' : '/'} className="logo">
          Rift<span className="gold">Schedule</span>
        </Link>

        <nav className="navbar-links">
          {sesionActiva ? (
            <>
              <NavLink to="/dashboard">Mi panel</NavLink>
              <button type="button" className="btn btn-outline" onClick={salir}>Salir</button>
            </>
          ) : (
            <>
              <NavLink to="/" end>Inicio</NavLink>
              <NavLink to="/login">Iniciar sesión</NavLink>
              <NavLink to="/registro" className="btn btn-gold">Crear cuenta</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar