import { Link } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext.js'

const MODULOS = [
  { titulo: 'Mi equipo', descripcion: 'Crea tu equipo e invita a tus compañeros.' },
  { titulo: 'Disponibilidad', descripcion: 'Marca los horarios en los que puedes entrenar.' },
  { titulo: 'Entrenamientos', descripcion: 'Programa sesiones y confirma tu asistencia.' },
]

function Dashboard() {
  const { jugador, sesionActiva } = usePlayer()

  if (!jugador || !sesionActiva) {
    return (
      <section className="container page">
        <div className="card form-card success-card">
          <h2>No has iniciado sesión</h2>
          <p className="muted">Inicia sesión o regístrate para ver tu panel.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-outline">Iniciar sesión</Link>
            <Link to="/registro" className="btn btn-gold">Registrarme</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container page">
      <p className="muted">Panel principal</p>
      <h2 className="dashboard-title">
        ¡Bienvenido, <span className="gold">{jugador.nombre}</span>!
      </h2>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Mi perfil</h3>
          <dl className="profile-data">
            <div><dt>Riot ID</dt><dd>{jugador.riotId}</dd></div>
            <div><dt>Posición</dt><dd>{jugador.posicion}</dd></div>
            <div><dt>Servidor</dt><dd>{jugador.servidor}</dd></div>
          </dl>
          <p className="note">Datos guardados temporalmente durante esta sesión.</p>
        </div>

        <div className="modules">
          {MODULOS.map((modulo) => (
            <div key={modulo.titulo} className="card module-card">
              <span className="tag-soon">Próximamente</span>
              <h3>{modulo.titulo}</h3>
              <p className="muted">{modulo.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Dashboard