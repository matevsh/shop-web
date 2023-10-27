import { z } from "zod";
import { zResponse } from "../response";

export const logSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  error: z.boolean(),
  name: z.string(),
  message: z.string(),
  userId: z.number().nullable(),
});

export const logsResponse = zResponse(z.array(logSchema));
