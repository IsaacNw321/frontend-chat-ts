import "../styles/sessions.css"
export const Register = () =>{
  return (
    <section className='loginContainer'>
    <div className='formContainer'>
      <form className='authForm'>
        <h2 className='formTitle'>Unete a nuestra comunidad de apoyo</h2>
          <div className='formField'>
          <label htmlFor="name">Nombre</label>
          <input id="text" type="text"/>
        </div>
          <div className='formField'>
          <label htmlFor="lastName">Apellido</label>
          <input id="text" type="text"/>
        </div>
        <div className='formField'>
          <label htmlFor="email">Correo</label>
          <input id="email" type="email"/>
        </div>
        <div className='formField'>
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password"  />
        </div>
        <button className='authButton' type="submit">
          Registrarse
        </button>
      </form>
    </div>
    </section>
  );  
}