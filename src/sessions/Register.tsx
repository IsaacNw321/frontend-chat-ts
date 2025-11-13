import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query"; 
import "../styles/sessions.css";
import { registerSchema, type RegisterFormValues } from "../validations/registerSchema";
import { createUser } from "../utils/users";
import { useNavigate } from "react-router-dom";


export const Register = () => {
   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });
  
  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormValues) => createUser(data),
    
    onSuccess: (user, variables) => {
      console.log("Registro exitoso. Respuesta de la API:", user, variables);
      reset(); 
      navigate("/login"); 
    },
    onError: (error) => {
      console.error("Error durante el registro:", error);
    },
  });
  const isPending = isSubmitting || registerMutation.isPending;
  const isError = registerMutation.isError;
  const error = registerMutation.error;

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <section className='loginContainer'>
      <div className='formContainer'>
        <form className='authForm' onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className='formTitle'>Unete a nuestra comunidad de apoyo</h2>
          {isError && (
            <span className='errorMessage'>
              Error al registrar: {error?.message || "Algo salió mal."}
            </span>
          )}

          <div className='formField'>
            <label htmlFor="userName">Nombre</label>
            <input id="userName" type="text" {...register("userName")} />
            {errors.userName && (
              <span className='errorMessage'>{errors.userName.message}</span>
            )}
          </div>
          <div className='formField'>
            <label htmlFor="email">Correo</label>
            <input id="email" type="email" {...register("email")} />
            {errors.email && (
              <span className='errorMessage'>{errors.email.message}</span>
            )}
          </div>
          <div className='formField'>
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" {...register("password")} />
            {errors.password && (
              <span className='errorMessage'>{errors.password.message}</span>
            )}
          </div>


          <button className='authButton' type="submit" disabled={isPending}>
            {isPending ? "Enviando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </section>
  );
};