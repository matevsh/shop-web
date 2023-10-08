import {z} from 'zod';

export const logoutResponseSchema = z.object({
    httpStatus: z.number(),
    success: z.boolean(),
    message: z.string()
})

export type LogoutResponseSchema = z.infer<typeof logoutResponseSchema>