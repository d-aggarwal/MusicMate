import { url } from 'inspector';
import { NextRequest, NextResponse } from 'next/server';
import {z} from 'zod';
import { prismaClient } from '../../lib/db';
const YT_URL_REGEX = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
});

export async function POST(request: NextRequest) {
    try {
    const data = CreateStreamSchema.parse(await request.json());
    const isValidUrl = YT_URL_REGEX.test(data.url);
    if (!isValidUrl) {
        return NextResponse.json({
            message: 'Invalid YouTube URL'
        }, {
            status: 411
        })
    }

    console.log(data);

    const extractedId = data.url.split('v=')[1]?.split('&')[0];

    prismaClient.stream.create({
        data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube"
            }
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Invalid request body'
        }, {
            status: 411
        })
    }
}

