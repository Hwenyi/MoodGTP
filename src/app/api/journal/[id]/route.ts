import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request, {params}) => {

    //请求体的content解析出来
    const {content} = request.body

    const user =  await getUserByClerkID()

    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            },
        },
        data: {
            content,
        }
    })

    return NextResponse.json({data: updatedEntry })
}