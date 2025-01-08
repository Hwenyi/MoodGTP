import { qa } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {

    const {question} = await request.json();

    const user = await getUserByClerkID()

    //找到该用户所有的entry作为输入
    const entries = await prisma.journalEntry.findMany({
        where:{
            userId: user.id,
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
        }
    })

    //该用户所有的日记和本次问题作为qa的输入，返回结果
    const answer = await qa(question, entries);

    return NextResponse.json({data: answer})
}