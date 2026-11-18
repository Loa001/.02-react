const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export class ApiError extends Error {
  constructor(mensaje, estado, errores = null) {
    super(mensaje)
    this.estado = estado
    this.errores = errores
  }
}

async function solicitar(ruta, { metodo = 'GET', datos } = {}) {
  let respuesta

  try {
    respuesta = await fetch(`${API_URL}/api${ruta}`, {
      method: metodo,
      headers: datos ? { 'Content-Type': 'application/json' } : undefined,
      body: datos ? JSON.stringify(datos) : undefined,
    })
  } catch {
    throw new ApiError('No se pudo conectar con el servidor. Verifica que la API esté en ejecución.', 0)
  }

  if (respuesta.status === 204) return null

  const cuerpo = await respuesta.json().catch(() => null)

  if (!respuesta.ok) {
    throw new ApiError(cuerpo?.mensaje ?? 'Ocurrió un error inesperado.', respuesta.status, cuerpo?.errores)
  }

  return cuerpo
}

export const api = {
  jugadores: {
    listar: () => solicitar('/jugadores'),
    obtener: (id) => solicitar(`/jugadores/${id}`),
    crear: (datos) => solicitar('/jugadores', { metodo: 'POST', datos }),
    actualizar: (id, datos) => solicitar(`/jugadores/${id}`, { metodo: 'PUT', datos }),
    eliminar: (id) => solicitar(`/jugadores/${id}`, { metodo: 'DELETE' }),
    iniciarSesion: (riotId) => solicitar('/jugadores/sesion', { metodo: 'POST', datos: { riotId } }),
  },
  equipos: {
    listar: () => solicitar('/equipos'),
    obtener: (id) => solicitar(`/equipos/${id}`),
    crear: (datos) => solicitar('/equipos', { metodo: 'POST', datos }),
    actualizar: (id, datos) => solicitar(`/equipos/${id}`, { metodo: 'PUT', datos }),
    eliminar: (id) => solicitar(`/equipos/${id}`, { metodo: 'DELETE' }),
    asignarJugador: (id, datos) => solicitar(`/equipos/${id}/integrantes`, { metodo: 'POST', datos }),
    quitarJugador: (id, jugadorId) =>
      solicitar(`/equipos/${id}/integrantes/${jugadorId}`, { metodo: 'DELETE' }),
  },
}