import { z } from "zod";

export const termsTypeSchema = z.enum(["SERVICE", "PRIVACY"]);

export const termsDetailSchema = z.object({
  type: termsTypeSchema,
  language: z.string(),
  version: z.string(),
  title: z.string(),
  content: z.string(),
});

export type TermsType = z.infer<typeof termsTypeSchema>;
export type TermsDetail = z.infer<typeof termsDetailSchema>;
