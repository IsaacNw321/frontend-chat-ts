import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormFields } from '../validations/loginSchema';
import "../styles/sessions.css"; 

export const Login = () => {
  const {
    register, 
    handleSubmit,
    formState: { errors, isSubmitting }, 
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormFields) => {
    console.log("Formulario válido. Datos a enviar:", data);
    
  };

  return (
    <section className='loginContainer'>
      <div className='formContainer'>
        <form className='authForm' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='formTitle'>Iniciar Sesión</h2>
          <div className='formField'>
            <label htmlFor="email">Correo</label>
            <input 
              id="email" 
              type="email" 
              {...register("email")} 
            />
            {errors.email && <p className='errorText'>{errors.email.message}</p>}
          </div>

          <div className='formField'>
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password" 
              type="password"
              {...register("password")} 
            />
            {errors.password && <p className='errorText'>{errors.password.message}</p>}
          </div>

          <button 
            className='authButton' 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </section>
  );  
}