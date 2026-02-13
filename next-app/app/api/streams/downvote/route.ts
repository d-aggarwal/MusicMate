import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { prismaClient } from '../../../lib/db';

const DownvoteStreamSchema = z.object({
    streamId: z.string(),
});


export async function POST(request: NextRequest) {
    const sessoion = await getServerSession();

    const user = await prismaClient.user.findFirst({
    where: {
        email: sessoion?.user?.email || undefined
    }
    });

    if (!user) {
        return NextResponse.json({
            message: 'Unauthorized'
        }, {
            status: 403
        })
    }

    try {
        const data = DownvoteStreamSchema.parse(await request.json());
        await prismaClient.upvote.delete({
            where :{
                userId_streamId: {
                    streamId: data.streamId,
                    userId: user.id
                }
            }
        })
    } catch (error) {
        return NextResponse.json({
            message: 'Invalid request body'
        }, {
            status: 411
        })
    }
}