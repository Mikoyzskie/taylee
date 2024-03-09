import prisma from "@/lib/db/prisma";
import { createJobSchema } from "@/lib/validation/jobs";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = createJobSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, companyname, country, companylogo, description } =
      parseResult.data;

    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const job = await prisma.jobs.create({
      data: {
        title,
        description,
        companyname,
        companylogo,
        country,
      },
    });

    return Response.json({ job }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
