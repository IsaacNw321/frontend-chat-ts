import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { loginSchema, type LoginFormFields } from '../validations/loginSchema';
import { loginUser } from '../utils/users';
import { useNavigate } from 'react-router-dom';
import "../styles/sessions.css"; 
import useAuth from '../hooks/useAuth';


export const Login = () => {
  const { setAuth} = useAuth()
  const navigate = useNavigate()
  const {
    register, 
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }, 
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormFields) => loginUser(data),
    onSuccess: (response) => {
      console.log("Login exitoso. Respuesta de la API:", response);
      setAuth(response)
      reset()
      navigate("/dashboard")
    },
    onError: (error) => {
      console.error("Error durante el login:", error);
    },
  });

  const isPending = isSubmitting || loginMutation.isPending;
  const isError = loginMutation.isError;
  const error = loginMutation.error as Error | null;

  const onSubmit = (data: LoginFormFields) => {
    loginMutation.mutate(data);
  };

  return (
    <section className='loginContainer'>
      <div className='formContainer'>
        <form className='authForm' onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className='formTitle'>Iniciar Sesión</h2>
          {isError && (
            <p className='errorText'>
              {error?.message || "Correo o contraseña incorrectos."}
            </p>
          )}
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
            disabled={isPending}
          >
            {isPending ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </section>
  );
}