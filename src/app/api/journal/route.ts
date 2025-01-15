import { prisma } from '@/utils/db'
import { getUserByClerkID } from '@/utils/auth';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { analyze } from '@/utils/ai';

export const POST = async() => {

    const user = await getUserByClerkID()

    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: "今天是开心的一天",
        }
    })

    const analysis = await analyze(entry.content)
    //更新数据库后，补充后端创建时戴上userid
    await prisma.analysis.create({

        data: {
            userId: user.id,
            entryId: entry.id,
            ...analysis
        }

    })

    revalidatePath('/journal')

    return NextResponse.json({data: entry})
}