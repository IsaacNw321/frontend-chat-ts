import "../styles/Landing.css"
import Logo from "../assets/images/jose-r.jpg"
import supportChat from "../assets/images/supportChat.png"
import { Register } from "../sessions/Register";
import { Masters } from "../components/Masters";
export default function LandingPage() {
   const year = new Date().getFullYear();
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo-container">
          <img
            src={Logo}
            alt="School Logo"
            width={100}
            height={100}
            className="logo"
          />
          <h1 className="school-name">Jose Ricardo Guillen</h1>
        </div>
      </header>

      <main>
  <section className="hero">
    <div className="hero-content">
      <h2>Espacio Seguro para Compartir, Crecer y Conectar</h2>
      <p>
        Exprésate libremente a través de conversaciones anónimas con nuestro 
        psicólogo escolar. Tu voz importa, tu identidad permanece privada.
      </p>
    </div>
    <div className="hero-image">
      <img
        src={supportChat}
        alt="Ilustración de Chat de Apoyo"
        width={260}
        height={260}
        className="hero-image"
      />
    </div>
  </section>

  <section className="benefits">
    <h2>Por Qué el Apoyo Anónimo Funciona</h2>
    <div className="benefits-grid">
      <div className="benefit-card">
        <h3>Reducción de la Ansiedad Social</h3>
        <p>
          Hablar de forma anónima ayuda a reducir el miedo al juicio, permitiendo 
          una comunicación más honesta y abierta.
        </p>
      </div>
      <div className="benefit-card">
        <h3>Expresión Verdadera</h3>
        <p>
          Sin la presión de la identidad, los estudiantes se sienten más cómodos 
          compartiendo sus pensamientos y sentimientos genuinos.
        </p>
      </div>
      <div className="benefit-card">
        <h3>Entorno Seguro</h3>
        <p>
          La anonimidad crea un espacio protector donde los estudiantes pueden 
          discutir temas sensibles sin temor al estigma.
        </p>
      </div>
    </div>
  </section>
  <section style={{marginTop: '20px', marginBottom : '20px', textAlign: 'center'}}>
    <h3 className="masters-title" style={{marginTop: '20px', marginBottom : '20px', textAlign: 'center'}}>
      Nuestro equipo Orientador
    </h3>
    <Masters/>
 </section>
  <section className="join-section">
    <Register/>
  </section>
</main>
<footer className="footer">
  <p>© {year} Apoyo de Jose Ricardo Guillen. Todas las conversaciones son confidenciales.</p>
</footer>

    </div>
  )
}
