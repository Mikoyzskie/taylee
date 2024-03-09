import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1, { message: "Title required" }),
  companyname: z.string().min(1, { message: "Company name required" }),
  country: z.string().min(1, { message: "Country required" }),
  companylogo: z.string().optional(),
  description: z.string().min(1, { message: "Company name required" }),
});

export type CreateJobSchema = z.infer<typeof createJobSchema>;
