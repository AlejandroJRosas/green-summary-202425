import { z } from 'zod'

export const createUserSchema = z
  .object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    password: z.string({ required_error: 'Password is required' })
  })
  .required()

export type CreateUserDto = z.infer<typeof createUserSchema>
