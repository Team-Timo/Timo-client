import { z } from "zod";

export const termsTypeSchema = z.enum(["SERVICE", "PRIVACY"]);

export const termsItemSchema = z.object({
  termsId: z.number(),
  type: termsTypeSchema,
  title: z.string(),
  content: z.string(),
});

export const termsListSchema = z.object({
  terms: z.array(termsItemSchema),
});

export type TermsType = z.infer<typeof termsTypeSchema>;
export type TermsItem = z.infer<typeof termsItemSchema>;
