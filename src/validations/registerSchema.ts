import { z } from "zod";

export const registerSchema = z.object({
  userName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre es demasiado largo"),
  email: z
    .string()
    .email("Correo inválido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(128, "La contraseña es demasiado larga"),
  confirmpassword: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(128, "La contraseña es demasiado larga"),
}) 
.refine((data) => data.password === data.confirmpassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmpassword"],
});

export type RegisterFormValues = z.input<typeof registerSchema>;