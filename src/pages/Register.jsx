import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext.js'
import { esRiotIdValido } from '../utils/validaciones.js'

const POSICIONES = ['Top', 'Jungla', 'Mid', 'ADC', 'Support']
const SERVIDORES = ['LAN', 'LAS']
const FORMULARIO_VACIO = { nombre: '', riotId: '', posicion: '', servidor: '' }

function validar(datos) {
  const errores = {}

  if (datos.nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.'
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
  const [registrado, setRegistrado] = useState(false)

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
  }

  function manejarEnvio(evento) {
    evento.preventDefault()

    const nuevosErrores = validar(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    registrarJugador({
      ...datos,
      nombre: datos.nombre.trim(),
      riotId: datos.riotId.trim(),
    })
    setRegistrado(true)
  }

    if (registrado) {
    return (
      <section className="container page">
        <div className="card form-card success-card">
          <div className="success-icon">✓</div>
          <h2>¡Registro exitoso!</h2>
          <p className="muted">
            Tu perfil de jugador <b>{datos.riotId}</b> fue creado. Inicia sesión para ver tu panel.
          </p>
          <Link to="/login" state={{ riotId: datos.riotId.trim() }} className="btn btn-gold">
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

        <form onSubmit={manejarEnvio} noValidate>
          <div className="field">
            <label htmlFor="nombre">Nombre del jugador</label>
            <input id="nombre" name="nombre" value={datos.nombre} onChange={manejarCambio} placeholder="Ej.: Fernando" />
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

          <button type="submit" className="btn btn-gold btn-full">Registrarme</button>
        </form>
      </div>
    </section>
  )
}

export default Register