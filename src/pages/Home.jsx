import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="container hero">
      <span className="badge">Para equipos amateur de League of Legends</span>
      <h1>
        Organiza a tu equipo.<br />
        <span className="gold">Entrena cuando todos pueden.</span>
      </h1>
      <p className="muted hero-text">
        Registra a tus jugadores, coordina sus horarios y programa entrenamientos
        desde un solo lugar.
      </p>
      <div className="hero-actions">
        <Link to="/registro" className="btn btn-gold">Registrarme como jugador</Link>
        <Link to="/login" className="btn btn-outline">Ya tengo cuenta</Link>
      </div>
    </section>
  )
}

export default Home