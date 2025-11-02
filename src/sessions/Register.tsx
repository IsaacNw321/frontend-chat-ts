import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "../styles/sessions.css";
import { registerSchema, type RegisterFormValues } from "../validations/registerSchema";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("register submit", data);
    reset();
  };

  return (
    <section className='loginContainer'>
      <div className='formContainer'>
        <form className='authForm' onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className='formTitle'>Unete a nuestra comunidad de apoyo</h2>

          <div className='formField'>
            <label htmlFor="name">Nombre</label>
            <input id="name" type="text" {...register("name")} />
            {errors.name && (
              <span className='errorMessage'>{errors.name.message}</span>
            )}
          </div>

          <div className='formField'>
            <label htmlFor="lastName">Apellido</label>
            <input id="lastName" type="text" {...register("lastName")} />
            {errors.lastName && (
              <span className='errorMessage'>{errors.lastName.message}</span>
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

          <button className='authButton' type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </section>
  );
};