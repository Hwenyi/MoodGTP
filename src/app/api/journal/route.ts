import {prisma} from '@/utils/db'
import { getUserByClerkID } from '@/utils/auth';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const POST = async() => {
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: "write about your day",
        }
    })

    revalidatePath('/journal')

    return NextResponse.json({data: entry})
}