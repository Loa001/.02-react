import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="container page">
      <h2>Página no encontrada</h2>
      <p className="muted">La dirección que buscas no existe.</p>
      <Link to="/" className="btn btn-outline" style={{ marginTop: 16 }}>Volver al inicio</Link>
    </section>
  )
}

export default NotFound