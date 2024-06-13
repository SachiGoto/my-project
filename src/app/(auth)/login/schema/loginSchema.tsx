import { z } from 'zod';

export const LoginSchema = z.object({
    password: z.string().min(10, { message: "Password must be at least 10 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
  });

export type LoginSchemaType = z.infer<typeof LoginSchema>;