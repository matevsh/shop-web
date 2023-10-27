import { z } from "zod";
import { zResponse } from "~/common/models/response";

export const shopSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  imageBase64: z.string().nullable(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

export const getShopsResponse = zResponse(z.array(shopSchema));

export type GetShopsResponse = z.infer<typeof shopSchema>;
