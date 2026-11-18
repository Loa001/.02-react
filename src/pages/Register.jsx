import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext.js'
import { esRiotIdValido } from '../utils/validaciones.js'

const POSICIONES = ['Top', 'Jungla', 'Mid', 'ADC', 'Support']
const SERVIDORES = ['LAN', 'LAS']
const FORMULARIO_VACIO = { nombre: '', riotId: '', posicion: '', servidor: '' }

function validar(datos) {
  const errores = {}
  const nombre = datos.nombre.trim()

  if (nombre.length < 3 || nombre.length > 30) {
    errores.nombre = 'El nombre debe tener entre 3 y 30 caracteres.'
  }
  if (!esRiotIdValido(datos.riotId)) {
    errores.riotId = 'Usa el formato Nombre#TAG, por ejemplo Kairo#LAN1.'
  }
  if (!datos.posicion) {
    errores.posicion = 'Selecciona tu posición principal.'
  }
  if (!datos.servidor) {
    errores.servidor = 'Selecciona tu servidor.'
  }

  return errores
}

function Register() {
  const { registrarJugador } = usePlayer()
  const [datos, setDatos] = useState(FORMULARIO_VACIO)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [registrado, setRegistrado] = useState(null)

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setErrorGeneral('')

    const nuevosErrores = validar(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    setEnviando(true)
    try {
      const jugador = await registrarJugador({
        ...datos,
        nombre: datos.nombre.trim(),
        riotId: datos.riotId.trim(),
      })
      setRegistrado(jugador)
    } catch (error) {
      if (error.errores) {
        setErrores(error.errores)
      } else if (error.estado === 409) {
        setErrores({ riotId: error.message })
      } else {
        setErrorGeneral(error.message)
      }
    } finally {
      setEnviando(false)
    }
  }

  if (registrado) {
    return (
      <section className="container page">
        <div className="card form-card success-card">
          <div className="success-icon">✓</div>
          <h2>¡Registro exitoso!</h2>
          <p className="muted">
            Tu perfil de jugador <b>{registrado.riotId}</b> fue guardado. Inicia sesión para ver tu panel.
          </p>
          <Link to="/login" state={{ riotId: registrado.riotId }} className="btn btn-gold">
            Iniciar sesión
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="container page">
      <div className="card form-card">
        <h2>Registro de jugador</h2>
        <p className="muted form-subtitle">Completa tus datos para crear tu perfil en RiftSchedule.</p>

        {errorGeneral && <div className="alert alert-error">{errorGeneral}</div>}

        <form onSubmit={manejarEnvio} noValidate>
          <div className="field">
            <label htmlFor="nombre">Nombre del jugador</label>
            <input id="nombre" name="nombre" value={datos.nombre} onChange={manejarCambio} placeholder="Ej.: Fernando" maxLength={30} />
            {errores.nombre && <span className="error">{errores.nombre}</span>}
          </div>

          <div className="field">
            <label htmlFor="riotId">Riot ID</label>
            <input id="riotId" name="riotId" value={datos.riotId} onChange={manejarCambio} placeholder="Nombre#TAG" />
            {errores.riotId && <span className="error">{errores.riotId}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="posicion">Posición principal</label>
              <select id="posicion" name="posicion" value={datos.posicion} onChange={manejarCambio}>
                <option value="">Selecciona…</option>
                {POSICIONES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              {errores.posicion && <span className="error">{errores.posicion}</span>}
            </div>

            <div className="field">
              <label htmlFor="servidor">Servidor</label>
              <select id="servidor" name="servidor" value={datos.servidor} onChange={manejarCambio}>
                <option value="">Selecciona…</option>
                {SERVIDORES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errores.servidor && <span className="error">{errores.servidor}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-gold btn-full" disabled={enviando}>
            {enviando ? 'Registrando…' : 'Registrarme'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Register