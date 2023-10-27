import { z } from "zod";

export const sessionResponseSchema = z
  .object({
    httpStatus: z.number(),
    success: z.literal(true),
    message: z.string(),
    data: z.object({
      id: z.string(),
      name: z.string(),
      isAdmin: z.boolean(),
    }),
  })
  .or(
    z.object({
      httpStatus: z.number(),
      success: z.literal(false),
      message: z.string(),
    }),
  );
