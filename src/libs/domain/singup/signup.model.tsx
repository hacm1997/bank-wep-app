import { zfd } from "zod-form-data";
import { z } from "zod";

export const validateSignupSchema = zfd.formData({
  userNameEmail: zfd.text(z.string()),
  password: zfd.text(
    z
      .string({
        errorMap: () => ({
          message: 'contraseña requerida',
        }),
      })
      .min(8, { message: "" }) // Minimum 8 characters
      .regex(/[A-Z]/, { message: "" }) // At least one uppercase
      .regex(/[a-z]/, { message: "" }) // At least one lowercase
  ),
  confirmPassword: zfd.text(
    z
      .string({
        errorMap: () => ({
          message: 'campo requeriido',
        }),
      })
      .min(8, { message: "" }) // Minimum 8 characters
      .regex(/[A-Z]/, { message: "" }) // At least one uppercase
      .regex(/[a-z]/, { message: "" }) // At least one lowercase
  ),
  // confirmPassword: zfd.text(passwordZod),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      // if password is valid, return true
      return (
        data.password.length >= 8 &&
        /[A-Z]/.test(data.password) &&
        /[a-z]/.test(data.password)
      );
    },
    {
      message: "La contraseña es válida", // validate message
      path: ["password"],
    })

export type SingupFormModel = z.infer<typeof validateSignupSchema>;