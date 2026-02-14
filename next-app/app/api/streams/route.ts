import { url } from 'inspector';
import { NextRequest, NextResponse } from 'next/server';
import {z} from 'zod';
import { prismaClient } from '../../lib/db';
import youtubesearchapi from 'youtube-search-api';


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
    if (!extractedId) {
        return NextResponse.json({
            message: 'Could not extract video ID from URL'
        }, {
            status: 411
        });
    }

    let title = "Unknown Title";
    let smallImg = `https://img.youtube.com/vi/${extractedId}/mqdefault.jpg`;
    let bigImg = `https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`;

    try {
        const res = await youtubesearchapi.GetVideoDetails(extractedId);
        if (res?.title) {
            title = res.title;
        }
        if (res?.thumbnail?.thumbnails?.length > 0) {
            const thumbnails = res.thumbnail.thumbnails;
            thumbnails.sort((a: {width: number}, b: {width: number}) => a.width - b.width);
            smallImg = thumbnails.length > 1
                ? thumbnails[thumbnails.length - 2].url
                : thumbnails[thumbnails.length - 1].url;
            bigImg = thumbnails[thumbnails.length - 1].url;
        }
    } catch (ytError) {
        console.error("YouTube API error, using fallback thumbnails:", ytError);
    }

    await prismaClient.stream.create({
        data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title,
                smallImg,
                bigImg,
            }
        });
        return NextResponse.json({
            message: 'Stream created successfully'
        }, {
            status: 200
        })
    } catch (error) {
        console.error("Error creating stream:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                message: 'Invalid request body',
                errors: error.issues
            }, {
                status: 411
            });
        }
        return NextResponse.json({
            message: error instanceof Error ? error.message : 'Something went wrong'
        }, {
            status: 500
        });
    }
}

export async function GET(request: NextRequest) {
    const creatorId = request.nextUrl.searchParams.get('creatorId');
    const streams = await prismaClient.stream.findMany({
        where: {
            userId: creatorId ?? ""
        },
        include: {
            _count: {
                select: { upvotes: true }
            },
            upvotes: true
        }
    })

    return NextResponse.json(streams);
}
