import "../styles/sessions.css"
export const Login = () =>{
  return (
    <section className='loginContainer'>
    <div className='formContainer'>
      <form className='authForm'>
        <h2 className='formTitle'>Iniciar Sesión</h2>
        <div className='formField'>
          <label htmlFor="email">Correo</label>
          <input id="email" type="email"/>
        </div>
        <div className='formField'>
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password"  />
        </div>
        <button className='authButton' type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
    </section>
  );  
}