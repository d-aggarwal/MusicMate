import { NextResponse } from "next/server";
import { prismaClient } from "@/app/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const creatorId = searchParams.get("creatorId");

  if (!creatorId) {
    return NextResponse.json({ message: "Missing creatorId" }, { status: 400 });
  }

  const user = await prismaClient.user.findUnique({
    where: { id: creatorId },
    select: {
      activeStreamId: true,
      activeStream: {
        include: {
          _count: { select: { upvotes: true } },
          upvotes: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Creator not found" }, { status: 404 });
  }

  return NextResponse.json({ stream: user.activeStream });
}
