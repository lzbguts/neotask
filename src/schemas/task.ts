import { z } from "zod";

import { TranslationType } from "@/types";

export const TaskSchema = (t: TranslationType) =>
  z.object({
    title: z
      .string()
      .min(1, { message: t("errors.invalid-title-min", { min: 1 }) })
      .max(50, { message: t("errors.invalid-title-max", { max: 50 }) }),
  });
