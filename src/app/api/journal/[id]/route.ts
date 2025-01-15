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

    const processedAnalysis = {
        ...analysis,
        negative: analysis.negative === 'true', // or !!analysis.negative
        sentimentScore: parseFloat(analysis.sentimentScore),
    }

    // 使用 upsert 时，需要分别写 create 与 update，而非 data
    const  updated = await prisma.analysis.upsert({
        where: {
            userId: user.id,
            entryId: updatedEntry.id
        },
        create: {
            userId: user.id,
            entryId: updatedEntry.id,
            ...processedAnalysis
        },
        update: {
            ...processedAnalysis
        }
    })

    return NextResponse.json({data: {...updatedEntry,analysis: updated}})

}