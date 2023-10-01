import { verifyJwtAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: number } }
) {
    const accessToken = request.headers.get("authorization");

    if (!accessToken || !verifyJwtAccessToken(accessToken)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userPosts = await prisma.post.findMany({
        where: {
            authorId: +params.id,
        },
        include: {
            author: {
                select: {
                    email: true,
                    username: true,
                },
            },
        },
    });

    return NextResponse.json(userPosts);
}
