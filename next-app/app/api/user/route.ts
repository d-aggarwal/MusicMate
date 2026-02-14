import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prismaClient } from '../../lib/db';
import { authOptions } from '@/app/lib/auth-options';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({
            message: 'Unauthorized'
        }, {
            status: 403
        });
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: session.user.email
        }
    });

    if (!user) {
        return NextResponse.json({
            message: 'User not found'
        }, {
            status: 404
        });
    }

    return NextResponse.json({ id: user.id, email: user.email});
}
