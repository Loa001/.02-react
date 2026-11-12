import { useState } from 'react'
import { PlayerContext } from './PlayerContext.js'

function PlayerProvider({ children }) {
  const [jugador, setJugador] = useState(null)
  const [sesionActiva, setSesionActiva] = useState(false)

  function registrarJugador(datos) {
    setJugador(datos)
  }

  function iniciarSesion(riotId) {
    const coincide =
      jugador !== null &&
      jugador.riotId.toLowerCase() === riotId.trim().toLowerCase()

    if (coincide) {
      setSesionActiva(true)
    }
    return coincide
  }

  function cerrarSesion() {
    setSesionActiva(false)
  }

  return (
    <PlayerContext.Provider
      value={{ jugador, sesionActiva, registrarJugador, iniciarSesion, cerrarSesion }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider