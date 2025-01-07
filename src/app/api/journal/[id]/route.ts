import { analyze } from "@/utils/ai"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, {params}) => {

    //请求体的content解析出来
    const {content} = await request.json()

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
        },
    })
    
    const analysis = await analyze(updatedEntry.content)

    // 使用 upsert 时，需要分别写 create 与 update，而非 data
    await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id
        },
        create: {
            entryId: updatedEntry.id,
            ...analysis
        },
        update: {
            ...analysis
        }
    })

    return NextResponse.json({data: updatedEntry })

}