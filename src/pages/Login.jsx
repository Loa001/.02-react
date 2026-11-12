import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext.js'
import { esRiotIdValido } from '../utils/validaciones.js'

function Login() {
  const { iniciarSesion } = usePlayer()
  const navigate = useNavigate()
  const location = useLocation()
  const [riotId, setRiotId] = useState(location.state?.riotId ?? '')
  const [error, setError] = useState('')

  function manejarEnvio(evento) {
    evento.preventDefault()

    if (!esRiotIdValido(riotId)) {
      setError('Usa el formato Nombre#TAG, por ejemplo Kairo#LAN1.')
      return
    }

    if (!iniciarSesion(riotId)) {
      setError('No hay un jugador registrado con ese Riot ID en esta sesión.')
      return
    }

    navigate('/dashboard')
  }

  return (
    <section className="container page">
      <div className="card form-card">
        <h2>Iniciar sesión</h2>
        <p className="muted form-subtitle">Ingresa con el Riot ID con el que te registraste.</p>

        <form onSubmit={manejarEnvio} noValidate>
          <div className="field">
            <label htmlFor="riotId">Riot ID</label>
            <input
              id="riotId"
              value={riotId}
              onChange={(e) => {
                setRiotId(e.target.value)
                setError('')
              }}
              placeholder="Nombre#TAG"
            />
            {error && <span className="error">{error}</span>}
          </div>

          <button type="submit" className="btn btn-gold btn-full">Ingresar</button>
        </form>

        <p className="form-footer muted">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
        <p className="note">
          Acceso de prueba del Sprint 1: la autenticación con correo y contraseña se implementará en el Sprint 2.
        </p>
      </div>
    </section>
  )
}

export default Login