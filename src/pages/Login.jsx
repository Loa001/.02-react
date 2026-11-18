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
  const [enviando, setEnviando] = useState(false)

  async function manejarEnvio(evento) {
    evento.preventDefault()

    if (!esRiotIdValido(riotId)) {
      setError('Usa el formato Nombre#TAG, por ejemplo Kairo#LAN1.')
      return
    }

    setEnviando(true)
    try {
      await iniciarSesion(riotId.trim())
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
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

          <button type="submit" className="btn btn-gold btn-full" disabled={enviando}>
            {enviando ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <p className="form-footer muted">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
        <p className="note">
          Acceso de prueba: el jugador se busca en la base de datos por su Riot ID. La autenticación con contraseña se implementará en el Sprint 3.
        </p>
      </div>
    </section>
  )
}

export default Login