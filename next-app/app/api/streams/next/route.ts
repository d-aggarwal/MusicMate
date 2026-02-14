import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prismaClient } from "@/app/lib/db";
import { authOptions } from "@/app/lib/auth-options";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const user = await prismaClient.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    const { streamId } = await req.json();

    if (!streamId) {
      return NextResponse.json({ message: "Missing streamId" }, { status: 400 });
    }

    // Verify the stream belongs to this creator
    const stream = await prismaClient.stream.findFirst({
      where: { id: streamId, userId: user.id },
    });

    if (!stream) {
      return NextResponse.json({ message: "Stream not found" }, { status: 404 });
    }

    await prismaClient.user.update({
      where: { id: user.id },
      data: { activeStreamId: streamId },
    });

    return NextResponse.json({ message: "Active stream updated" });
  } catch (e) {
    console.error("Error updating active stream:", e);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
