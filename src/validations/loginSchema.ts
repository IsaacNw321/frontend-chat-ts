import { z } from 'zod';

export const loginSchema = z.object({
 email: z.string().pipe(
    z.email({ message: "Formato de correo inválido." })
  ),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export type LoginFormFields = z.infer<typeof loginSchema>;