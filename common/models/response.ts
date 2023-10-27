import { z, ZodType } from "zod";

export function zResponse<T>(schema: ZodType<T>) {
  return z
    .object({
      httpStatus: z.number(),
      success: z.literal(true),
      message: z.string(),
      data: schema,
    })
    .or(
      z.object({
        httpStatus: z.number(),
        success: z.literal(false),
        message: z.string(),
      }),
    );
}
