import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().min(2).max(20, { message: 'First name is required' }).transform(s => s.trim()),
  lastName: z.string().min(2).max(20, { message: 'Last name is required' }).transform(s => s.trim()),
  email: z.email({ message: 'Invalid email' }).transform(s => s.toLowerCase().trim()),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
  .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Must contain at least one digit' })
  .regex(/[^A-Za-z0-9]/, { message: 'Must contain at least one special character' })
  .refine(p => !/\s/.test(p), { message: 'Must not contain spaces' }),
})

export const signinSchema = z.object({
  email: z.email({ message: 'Invalid email' }).transform(s => s.toLowerCase().trim()),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
  .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Must contain at least one digit' })
  .regex(/[^A-Za-z0-9]/, { message: 'Must contain at least one special character' })
  .refine(p => !/\s/.test(p), { message: 'Must not contain spaces' }),
})

