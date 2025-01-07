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
    
    await prisma.analysis.create({
        data: {
            entryId: entry.id,
            mood: analysis.mood,
            summary: analysis.summary,
            color: analysis.color,
            negative: analysis.negative,
            subject: analysis.subject,
            sentimentScore: analysis.sentimentScore
        }
    })

    revalidatePath('/journal')

    return NextResponse.json({data: entry})
}