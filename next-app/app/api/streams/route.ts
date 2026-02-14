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
    const res = await youtubesearchapi.GetVideoDetails(extractedId);
    const thumbnails = res.thumbnail.thumbnails;
    thumbnails.sort((a: {width: number}, b: {width: number}) => a.width - b.width);

    await prismaClient.stream.create({
        data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: res.title ?? "Can't find video",
                smallImg:
                    (thumbnails.length > 1
                    ? thumbnails[thumbnails.length - 2].url
                    : thumbnails[thumbnails.length - 1].url) ??
                    "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
                bigImg:
                    thumbnails[thumbnails.length - 1].url ??
                    "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
            }
        });
        return NextResponse.json({
            message: 'Stream created successfully'
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'Invalid request body'
        }, {
            status: 411
        })
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
