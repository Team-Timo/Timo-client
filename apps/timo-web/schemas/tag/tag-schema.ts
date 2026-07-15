import { z } from "zod";

export const tagSchema = z.object({
  tagId: z.number(),
  name: z.string(),
  isDefault: z.boolean(),
});

export const tagListDataSchema = z.object({
  tags: z.array(tagSchema),
});

export const tagCreateDataSchema = z.object({
  tagId: z.number(),
  name: z.string(),
  isDefault: z.boolean(),
});

export type Tag = z.infer<typeof tagSchema>;
export type TagListData = z.infer<typeof tagListDataSchema>;
export type TagCreateData = z.infer<typeof tagCreateDataSchema>;
