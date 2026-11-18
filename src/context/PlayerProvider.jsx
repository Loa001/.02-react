import { useState } from 'react'
import { PlayerContext } from './PlayerContext.js'
import { api } from '../services/api.js'

const CLAVE_SESION = 'riftschedule.sesion'

function leerSesionGuardada() {
  try {
    const texto = localStorage.getItem(CLAVE_SESION)
    return texto ? JSON.parse(texto) : null
  } catch {
    return null
  }
}

function guardarSesion(jugador) {
  try {
    if (jugador) {
      localStorage.setItem(CLAVE_SESION, JSON.stringify(jugador))
    } else {
      localStorage.removeItem(CLAVE_SESION)
    }
  } catch {
    // Si el navegador bloquea el almacenamiento, la sesión dura hasta recargar la página.
  }
}

function PlayerProvider({ children }) {
  const [jugador, setJugador] = useState(leerSesionGuardada)

  function registrarJugador(datos) {
    return api.jugadores.crear(datos)
  }

  async function iniciarSesion(riotId) {
    const encontrado = await api.jugadores.iniciarSesion(riotId)
    setJugador(encontrado)
    guardarSesion(encontrado)
    return encontrado
  }

  function actualizarSesion(datos) {
    setJugador(datos)
    guardarSesion(datos)
  }

  function cerrarSesion() {
    setJugador(null)
    guardarSesion(null)
  }

  return (
    <PlayerContext.Provider
      value={{
        jugador,
        sesionActiva: jugador !== null,
        registrarJugador,
        iniciarSesion,
        actualizarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider