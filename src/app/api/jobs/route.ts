import prisma from "@/lib/db/prisma";
import {
  createJobSchema,
  deletJobSchema,
  updateJobSchema,
} from "@/lib/validation/jobs";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = createJobSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, companyname, country, companylogo, description, site } =
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
        site,
        country,
        userId,
      },
    });

    return Response.json({ job }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const parseResult = updateJobSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id, title, companyname, country, companylogo, description, site } =
      parseResult.data;

    const job = await prisma.jobs.findUnique({ where: { id } });

    if (!job) {
      return Response.json({ error: "Job not found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId !== job.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedJob = await prisma.jobs.update({
      where: { id },
      data: {
        title,
        companyname,
        country,
        companylogo,
        description,
        site,
      },
    });

    return Response.json({ updatedJob }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const parseResult = deletJobSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id } = parseResult.data;

    const job = await prisma.jobs.findUnique({ where: { id } });

    if (!job) {
      return Response.json({ error: "Job not found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId !== job.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.jobs.delete({ where: { id } });

    return Response.json({ message: "Job Deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
