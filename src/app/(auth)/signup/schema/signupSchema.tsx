import * as z from "zod";

export const SignupSchema = z.object({
    fullName: z.string().min(1, { message: "User name is reuired" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(10, { message: "Password must be at least 10 characters" }).refine(value => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    }).refine(value => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    }).refine(value => /[0-9]/.test(value), {
      message: "Password must contain at least one number",
    }).refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "Password must contain at least one special character",
    }),
    confirm: z.string(),
  }).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], 
  });

  export type SignupSchemaType = z.infer<typeof SignupSchema>;