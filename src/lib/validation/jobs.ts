import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1, { message: "Title required" }),
  companyname: z.string().min(1, { message: "Company name required" }),
  country: z.string().min(1, { message: "Country required" }),
  companylogo: z.string().min(1, { message: "Company logo required" }),
  description: z.string().min(1, { message: "Job description required" }),
  site: z.string().min(1, { message: "Source site required" }),
});

export type CreateJobSchema = z.infer<typeof createJobSchema>;

export const updateJobSchema = createJobSchema.extend({
  id: z.string().min(1, { message: "Id required" }),
});

export const deletJobSchema = z.object({
  id: z.string().min(1, { message: "Id required" }),
});
