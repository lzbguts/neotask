import { z } from "zod";

import { TranslationType } from "@/types";

export const LoginSchema = (t: TranslationType) =>
  z.object({
    email: z.string().email({ message: t("errors.invalid-email") }),
    password: z.string(),
  });

export const SignupSchema = (t: TranslationType) =>
  z.object({
    email: z.string().email({ message: t("errors.invalid-email") }),
    password: z
      .string()
      .min(6, { message: t("errors.invalid-password-min", { min: 6 }) })
      .max(50, { message: t("errors.invalid-password-max", { max: 50 }) }),
  });
